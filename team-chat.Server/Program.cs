using Azure.Core;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Scalar.AspNetCore;
using System.Text;
using team_chat.Server.Data;
using team_chat.Server.Hubs;
using team_chat.Server.Repositories;
using team_chat.Server.Repositories.Interfaces;
using team_chat.Server.Services;
using team_chat.Server.Services.Interfaces;
using team_chat.Server.Utilities;

var builder = WebApplication.CreateBuilder(args);

if (builder.Environment.IsDevelopment())
{
    DotNetEnv.Env.Load();
}
builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

//Services and Repository Injection
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IUserRepository,UserRepository>();
builder.Services.AddScoped<IUserService,UserService>();
builder.Services.AddScoped<IAuthService,AuthService>();

//Register SIGNALR
builder.Services.AddSignalR();
//Register JWT
builder.Services.AddAuthentication()
    .AddJwtBearer(jwtOptions =>
    {
        jwtOptions.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateIssuerSigningKey = true,
            ValidAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE"),
            ValidIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER"),
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("JWT_KEY")!))
        };
        jwtOptions.Events.OnMessageReceived = context =>
        {
            context.Request.Cookies.TryGetValue("JWT_ACCESS_TOKEN", out var accessToken);
            if (!string.IsNullOrEmpty(accessToken))
                context.Token = accessToken;
            return Task.CompletedTask;


        };
    });
//CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactPolicy", policy =>
    {
       policy.WithOrigins("https://localhost:64899")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();

    });

});
var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();
app.MapHub<ChatHub>("/chatHub");

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();

    app.MapGet("/", () => Results.Redirect("/scalar"));
}

app.UseHttpsRedirection();
app.UseCors("ReactPolicy");
app.UseAuthorization();
app.UseAuthentication();
app.MapControllers();
app.MapFallbackToFile("/index.html");

app.Run();
