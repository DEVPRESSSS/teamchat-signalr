using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using team_chat.Server.Model;
using team_chat.Server.Services.Interfaces;

namespace team_chat.Server.Services
{
    public class TokenService : ITokenService
    {
        public async Task<string> GenerateAccessToken(IEnumerable<Claim> claims)
        {
            var jwtKey = Environment.GetEnvironmentVariable("JWT_KEY") ?? "";
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: Environment.GetEnvironmentVariable("JWT_ISSUER"),
                audience: Environment.GetEnvironmentVariable("JWT_AUDIENCE"),
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(15),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
           
        }

        public async Task<string> GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rnd = RandomNumberGenerator.Create())
            {
                rnd.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        
    }
}
