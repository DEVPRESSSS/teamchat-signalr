using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using team_chat.Server.Data;
using team_chat.Server.DTO;
using team_chat.Server.Model;
using team_chat.Server.Services.Interfaces;
using team_chat.Server.Utilities;

namespace team_chat.Server.Controllers
{
    [Route("api/v1/users")]
    [ApiController]
    public class ApplicationUserController : ControllerBase
    {
        private readonly IUserService _userService;
        public ApplicationUserController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetAllUser()
        {

            try
            {
                var users = await _userService.GetAllUsersAsync();

                if (!users.Any())
                {
                    return NotFound(new { message = "No users found" });
                }

                return Ok(users);
            }
            catch (ExceptionHandler ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        
      
        }

        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] CreateUserDto userDto)
        {
            try
            {
                if (userDto == null) return BadRequest(new { message = "Invalid payload" });

                var user = await _userService.AddUser(userDto);
                if (user == null) return BadRequest(new { message = "Failed to create user" });

                return Ok(new { message = user });
            }
            catch (ExceptionHandler ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
