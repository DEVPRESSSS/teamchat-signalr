using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;
using team_chat.Server.Repositories.Interfaces;
using team_chat.Server.Utilities;

namespace team_chat.Server.Hubs
{
    public class ChatHub : Hub<IChatClient>
    {
        public async Task JoinConversation(Guid conversationId)
        {
            var userId = Context.User?.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
            {
                throw new ExceptionHandler(500, "User not found!!!!");
            }

            await Groups.AddToGroupAsync(
                Context.ConnectionId,
                conversationId.ToString()
            );
        }

        public async Task SendMessage(Guid conversationId, string message)
        {
            var userId = Context.User?.FindFirstValue(
                ClaimTypes.NameIdentifier
            );

            if (userId == null)
            {
                throw new ExceptionHandler(500, "User not found!!!!");
            }

            if (string.IsNullOrWhiteSpace(message))
            {
                return;
            }

            await Clients
                .Group(conversationId.ToString())
                .ReceiveMessage(
                    conversationId,
                    userId,
                    message
                );
        }
    }
}