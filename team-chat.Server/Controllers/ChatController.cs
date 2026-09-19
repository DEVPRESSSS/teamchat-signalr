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
    [Route("api/conversations")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IConversationService _conversationService;
        public ChatController(IConversationService conversationService)
        {
            _conversationService = conversationService;
        }

        [HttpPost]
        public async Task<ActionResult> StartConversation(ConversationDto dto)
        {
            if (dto is null) return BadRequest("No receiver id found!!");
            var userId = User?.FindFirstValue(ClaimTypes.NameIdentifier);
            
            var conversationId = Guid.NewGuid().ToString().Substring(0,20).ToLowerInvariant();
            if (userId == null) return BadRequest("Failed to created conversation id");

            return Ok(conversationId);
        }

        [HttpGet]
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
                return Ok(listOfContacts);
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
    }
}
