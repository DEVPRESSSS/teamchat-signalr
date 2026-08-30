using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using team_chat.Server.Data;
using team_chat.Server.Model;

namespace team_chat.Server.Controllers
{
    [Route("api/v1/users")]
    [ApiController]
    public class ApplicationUserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public ApplicationUserController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<ApplicationUser>> GetAllUser()
        {
            var users = await _context.Users.ToListAsync();

            return Ok(users);
        }

        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        [HttpPost]
        public void Post([FromBody] string value)
        {
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
