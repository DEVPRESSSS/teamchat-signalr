using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using team_chat.Server.DTO;
using team_chat.Server.Services.Interfaces;
using team_chat.Server.Utilities;

namespace team_chat.Server.Controllers
{
    [Route("api/v1/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }
        [HttpPost("login")]
        public async Task<ActionResult> Login(LoginDTO dto)
        {
            try
            {
                var result = await _authService.LoginAsync(dto);
                return Ok(new {message = $"Login successfully {result.Email}"});
            }
            catch (ExceptionHandler ex)
            {
                return Unauthorized(new { errorMessage = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPost("register")]
        public async Task<ActionResult> Register(CreateUserDto dto)
        {
            try
            {

                await _authService.RegisterAsync(dto);
                return Ok(new { message = $"Registered successfully" });
            }
            catch (ExceptionHandler ex)
            {
                return Unauthorized(new { errorMessage = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPost("refresh-token")]
        public async Task<ActionResult> RefreshToken()
        {
            var refreshToken = Request.Cookies["JWT_REFRESH_TOKEN"];
            if (string.IsNullOrEmpty(refreshToken))
                return Unauthorized();

            try
            {
                var result = await _authService.RefreshTokenAsync(refreshToken);

                if (result is null)
                    return Unauthorized("Invalid refresh token.");

                return Ok();
           
            }
            catch (Exception ex)
            {
                return Unauthorized($"Refresh failed: {ex.Message}");
            }

        }
    }
}
