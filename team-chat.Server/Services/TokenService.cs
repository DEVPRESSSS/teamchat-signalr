using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using team_chat.Server.Model;
using team_chat.Server.Repositories.Interfaces;
using team_chat.Server.Services.Interfaces;
using team_chat.Server.Utilities;

namespace team_chat.Server.Services
{
    public class TokenService : ITokenService
    {
        private readonly IUserRepository _userRepository;
        public TokenService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
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

        public async Task<string> SaveRefreshTokenToDb(ApplicationUser user)
        {
            var refreshToken = await GenerateRefreshToken();
            if (refreshToken is null) throw new ExceptionHandler(500,"Failed to create refresh token");

            user.RefreshToken = refreshToken;
            user.Expiration = DateTime.UtcNow.AddDays(7);

            await _userRepository.UpdateAsync(user);
            await _userRepository.Save();

            return refreshToken;
        }

        public async Task<ApplicationUser> ValidateRefreshToken(ApplicationUser user, string refreshToken)
        {
            var tokenOwner = await _userRepository.GetAsync(x => x.RefreshToken == refreshToken && x.Id == user.Id);
            if (tokenOwner is null) throw new ExceptionHandler(404,"User not found!!!");

            if (user.RefreshToken != refreshToken || user.Expiration <= DateTime.UtcNow)
            {
                return null;
            }
            return user;
        }
    }
}
