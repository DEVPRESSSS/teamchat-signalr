using team_chat.Server.DTO;

namespace team_chat.Server.Services.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponseDTO> LoginAsync(LoginDTO dto);
        Task LogoutAsync();
    }
}
