using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using team_chat.Server.DTO;
using team_chat.Server.Services.Interfaces;
using team_chat.Server.Utilities;

namespace team_chat.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        public async Task<ActionResult> Login(LoginDTO dto)
        {
            try
            {
                if (dto is null) return StatusCode(400, "Invalid payload");

                var result = await _authService.LoginAsync(dto);
                if (result is null)
                    return Unauthorized("Invalid email or password!!!");

                return StatusCode(200, result.Email);
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
