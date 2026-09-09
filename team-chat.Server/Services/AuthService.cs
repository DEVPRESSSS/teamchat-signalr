using System.Security.Claims;
using team_chat.Server.DTO;
using team_chat.Server.Model;
using team_chat.Server.Repositories.Interfaces;
using team_chat.Server.Services.Interfaces;
using team_chat.Server.Utilities;

namespace team_chat.Server.Services
{
    public class AuthService:IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly ITokenService _tokenService;
        public AuthService(IUserRepository userRepository, ITokenService tokenService)
        {
            _userRepository = userRepository;
            _tokenService = tokenService;
        }

        public async Task<AuthResponseDTO> LoginAsync(LoginDTO dto)
        {
            if (dto == null) throw new ExceptionHandler(400, "Invalid payload!!");

            var user = await _userRepository.GetAsync(u => u.Email == dto.Email, includeProperties:"Role");
            if (user is null) throw new ExceptionHandler(401, "Invalid email or password");

            var verifyPassword = BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash);
            if (!verifyPassword)
                throw new ExceptionHandler(401, "Invalid email or password");

            var claims = await GetClaims(user);
            var token = await _tokenService.GenerateAccessToken(claims);

            return new AuthResponseDTO { Email = user.Email, Token = token };
        }

        public Task LogoutAsync()
        {
            throw new NotImplementedException();
        }

        public async Task RegisterAsync(CreateUserDto dto)
        {
            if (dto == null) throw new ExceptionHandler(400, "Invalid payload!!");

            if (!dto.Email.EndsWith("@gmail.com")) throw new ExceptionHandler(400, "Invalid email format");
            if (string.IsNullOrEmpty(dto.RawPassword)) throw new ExceptionHandler(400, "Password is required");

            var isEmailExist = await _userRepository.GetAsync(x => x.Email == dto.Email);
            if (isEmailExist is not null) throw new ExceptionHandler(409, "Email already taken");

            var hashPassword = EncryptPassword.GenerateHashPassword(dto.RawPassword);
            var newUser = new ApplicationUser
            {
                Id = Guid.NewGuid(),
                Email = dto.Email,
                PasswordHash = hashPassword,
            };

            await _userRepository.AddAsync(newUser);
            await _userRepository.Save();
        }

        private async Task<IEnumerable<Claim>> GetClaims(ApplicationUser applicationUser)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, applicationUser.Id.ToString()),
                new Claim(ClaimTypes.GivenName, applicationUser.Name),
                new Claim(ClaimTypes.Email, applicationUser.Email.ToLowerInvariant()),
                new Claim(ClaimTypes.Role, applicationUser.Role.RoleName),
            };

            return claims;
        }

        public async Task<string> RefreshTokenAsync(string token)
        {
            var test = "";

            return test;
        }
    }
}
