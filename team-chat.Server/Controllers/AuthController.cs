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
        [HttpPost]
        public async Task<ActionResult> Login(LoginDTO dto)
        {
            try
            {
                if (dto is null) return StatusCode(400, "Invalid payload");

                var result = await _authService.LoginAsync(dto);
                if (result is null)
                    return Unauthorized("Invalid email or password!!!");

                return Ok(new {message = $"User {result.Email}login successfully"});
            }
            catch (ExceptionHandler ex)
            {
                return StatusCode(ex.StatusCode, ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
