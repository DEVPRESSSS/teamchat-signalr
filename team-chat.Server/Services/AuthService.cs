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
        private readonly IRoleRepository _roleRepository;
        private readonly ITokenService _tokenService;
        public AuthService(
            IUserRepository userRepository, 
            IRoleRepository roleRepository,
            ITokenService tokenService)
        {
            _userRepository = userRepository;
            _roleRepository = roleRepository;
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
            var accessToken = await _tokenService.GenerateAccessToken(claims);

            return await CreateTokenResponse(user, accessToken);
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

            var defaultRole = await _roleRepository.GetAsync(r => r.RoleName == "User");
            if (defaultRole is null) throw new ExceptionHandler(400, "Role not found");

            var newUser = new ApplicationUser
            {
                Id = Guid.NewGuid(),
                Email = dto.Email,
                Name = dto.Name,
                RoleId = defaultRole.RoleId,
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

        public async Task<AuthResponseDTO> RefreshTokenAsync(string token)
        {
            var userTokenOwner = await _userRepository.GetAsync(x=>x.RefreshToken == token, includeProperties:"Role");
            if (userTokenOwner is null)
                throw new ExceptionHandler(401, "Invalid token");

            var user = await _tokenService.ValidateRefreshToken(userTokenOwner, token);
            if(user is null)
                throw new ExceptionHandler(401, "Invalid token");

            var claimsOfTheUser = await GetClaims(user);
            var newAccessToken = await _tokenService.GenerateAccessToken(claimsOfTheUser);

            return await CreateTokenResponse(user, newAccessToken);

        }
        public async Task<AuthResponseDTO> CreateTokenResponse(ApplicationUser user, string accessToken)
        {
            return new AuthResponseDTO
            {
                AccessToken = accessToken,
                RefreshToken = await _tokenService.SaveRefreshTokenToDb(user),
                Expiration = DateTime.UtcNow.AddMinutes(30),
                RoleName = user.Role.RoleName,
                Email = user.Email,
            };
        }

    }
}
