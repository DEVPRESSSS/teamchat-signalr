using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Security.Claims;
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
                RegisterTokensDuration(result);
           
                return Ok(new {message = result.Email});
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

                RegisterTokensDuration(result);

                return Ok();
           
            }
            catch (Exception ex)
            {
                return Unauthorized($"Refresh failed: {ex.Message}");
            }

        }
        [HttpPost("logout")]
        [Authorize]
        public async Task<ActionResult> Logout()
        {
            var refreshToken = Request.Cookies["JWT_REFRESH_TOKEN"];

            if (!string.IsNullOrEmpty(refreshToken))
            {
                await _authService.LogoutAsync(refreshToken);
            }

            var options = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None
            };

            Response.Cookies.Delete("JWT_ACCESS_TOKEN", options);
            Response.Cookies.Delete("JWT_REFRESH_TOKEN", options);

            return Ok(new {message = "You have been logout"});
        }
        [HttpGet("me")]
        [Authorize]
        public async Task<ActionResult> GetCurrentUser()
        {
            var isAuthenticated = User?.Identity?.IsAuthenticated;
            if(isAuthenticated == true)
            {
                var email = User?.FindFirstValue(ClaimTypes.Email);
                var userId = User?.FindFirstValue(ClaimTypes.NameIdentifier);
                var allClaims = User?.Claims.Select(c => new { c.Type, c.Value });

                return Ok(new {email});
            }
            

            return Unauthorized();
        }

        private void RegisterTokensDuration(AuthResponseDTO result)
        {

            var accessCookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddMinutes(1)
            };

            var refreshCookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddDays(7)
            };

            Response.Cookies.Append("JWT_ACCESS_TOKEN", result.AccessToken, accessCookieOptions);
            Response.Cookies.Append("JWT_REFRESH_TOKEN", result.RefreshToken, refreshCookieOptions);

        }
    }
}
