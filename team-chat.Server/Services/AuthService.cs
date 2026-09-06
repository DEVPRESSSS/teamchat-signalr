using team_chat.Server.DTO;
using team_chat.Server.Repositories.Interfaces;
using team_chat.Server.Services.Interfaces;
using team_chat.Server.Utilities;

namespace team_chat.Server.Services
{
    public class AuthService:IAuthService
    {
        private readonly IUserRepository _userRepository;
        public AuthService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<AuthResponseDTO> LoginAsync(LoginDTO dto)
        {
            if (dto == null) throw new ExceptionHandler(400, "Invalid payload!!");

            var user = await _userRepository.GetAsync(u => u.Email == dto.Email);
            if (user is null) throw new ExceptionHandler(401, "Invalid email or password");

            var verifyPassword = BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash);
            if (!verifyPassword)
                throw new ExceptionHandler(401, "Invalid email or password");

            return new AuthResponseDTO { Email = user.Email };
        }

        public Task LogoutAsync()
        {
            throw new NotImplementedException();
        }
    }
}
