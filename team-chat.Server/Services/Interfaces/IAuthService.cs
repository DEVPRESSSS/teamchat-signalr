using team_chat.Server.DTO;
using team_chat.Server.Model;

namespace team_chat.Server.Services.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponseDTO> LoginAsync(LoginDTO dto);
        Task RegisterAsync(CreateUserDto dto);
        Task<AuthResponseDTO> RefreshTokenAsync(string token);
        Task LogoutAsync();
    }
}
