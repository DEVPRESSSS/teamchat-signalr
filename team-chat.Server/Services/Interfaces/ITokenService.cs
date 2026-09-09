using System.Security.Claims;
using team_chat.Server.Model;

namespace team_chat.Server.Services.Interfaces
{
    public interface ITokenService
    {
        Task<string> GenerateAccessToken(IEnumerable<Claim> claims);
        Task<string> GenerateRefreshToken();
        Task<ApplicationUser> ValidateRefreshToken(ApplicationUser user, string token);
        Task<string> SaveRefreshTokenToDb(ApplicationUser user);
    }
}
