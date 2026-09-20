using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;
using team_chat.Server.DTO;
using team_chat.Server.Repositories.Interfaces;
using team_chat.Server.Services.Interfaces;
using team_chat.Server.Utilities;

namespace team_chat.Server.Controllers
{
    [Route("api/v1/conversations")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IConversationService _conversationService;
        public ChatController(IConversationService conversationService)
        {
            _conversationService = conversationService;
        }

        [HttpPost("create-convo")]
        public async Task<ActionResult> StartConversation(ConversationDto dto)
        {
            if (dto is null) return BadRequest("No receiver id found!!");

            var userIdClaim = User?.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!Guid.TryParse(userIdClaim, out var userId))
                return Unauthorized();

            var conversationId = await _conversationService.GetOrCreateConversationAsync(userId, dto.ReceiverId);

            return Ok(conversationId);
        }

        [HttpGet("recents")]
        public async Task<ActionResult> GetAllTheConversationsOfTheUser()
        {
            try
            {
                var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (!Guid.TryParse(userIdClaim, out var userId))
                {
                    throw new HubException("User not authenticated."); 
                }
                userId = Guid.Parse(userIdClaim);

                var listOfContacts = await _conversationService.GetAllContacts(userId);
                return Ok(new { users = listOfContacts });
            }
            catch (ExceptionHandler ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex) 
            { 
                Console.WriteLine(ex);
            }

            return BadRequest("No conversations list");
        }
        [HttpGet("active-users")]
        public async Task<ActionResult> GetAllUsers()
        {
            try
            {
                var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (!Guid.TryParse(userIdClaim, out var userId))
                {
                    throw new HubException("User not authenticated.");
                }
                userId = Guid.Parse(userIdClaim);

                var listOfActiveUsers = await _conversationService.GetAllActiveUsers();
                return Ok(new { users = listOfActiveUsers });
            }
            catch (ExceptionHandler ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }

            return BadRequest("No active users yet!!");
        }

        [HttpGet("user/{userId:guid}")]
        public async Task<ActionResult> GetUser(Guid userId)
        {
            try
            {
                var selectedUser = await _conversationService.GetUser(userId);
                return Ok(new { user = selectedUser });
            }
            catch (ExceptionHandler ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }

            return BadRequest("No active users yet!!");
        }
    }
}
