using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;
using team_chat.Server.Repositories.Interfaces;
using team_chat.Server.Services.Interfaces;
using team_chat.Server.Utilities;

namespace team_chat.Server.Hubs
{
    public class ChatHub(IMessageService messageService) : Hub<IChatClient>
    {
        private readonly IMessageService _messageService = messageService;
        public async Task JoinConversation(Guid conversationId)
        {
            var userId = Context.User?.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
            {
                throw new ExceptionHandler(401, "User not authenticated.");
            }
            Console.WriteLine($"SignalR User: {userId}");
            Console.WriteLine($"Authenticated: {Context.User?.Identity?.IsAuthenticated}");

            await Groups.AddToGroupAsync(
                Context.ConnectionId,
                conversationId.ToString()
            );
        }

        public async Task SendMessage(Guid conversationId, string message)
        {
            var userIdClaim = Context.User?.FindFirstValue(
                ClaimTypes.NameIdentifier
            );

            if (userIdClaim == null)
            {
                throw new ExceptionHandler(401, "User not authenticated.");
            }
            if (!Guid.TryParse(userIdClaim, out var userId)){
                throw new ExceptionHandler(400, "Invalid userId");
            }
          
            if (string.IsNullOrWhiteSpace(message))
            {
                return;
            }

            await Clients
                .Group(conversationId.ToString())
                .ReceiveMessage(
                    conversationId,
                    userIdClaim,
                    message
                );
            //Save the message
            await _messageService.SaveMessage(userId, conversationId, message);
        }
    }
}