using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using team_chat.Server.Data;
using team_chat.Server.Hubs;
using team_chat.Server.Repositories;
using team_chat.Server.Repositories.Interfaces;
using team_chat.Server.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

//Services and Repository Injection
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IUserRepository,UserRepository>();
builder.Services.AddScoped<IUserService,UserService>();

//Register SIGNALR
builder.Services.AddSignalR();
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
app.UseAuthorization();
app.MapControllers();
app.MapFallbackToFile("/index.html");

app.Run();
