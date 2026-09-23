using team_chat.Server.Model;
using team_chat.Server.Repositories.Interfaces;
using team_chat.Server.Services.Interfaces;
using team_chat.Server.Utilities.Enums;

namespace team_chat.Server.Services
{
    public class MessageService(IMessageRepository messageRepository): IMessageService
    {
        private readonly IMessageRepository _messageRepository = messageRepository;
        
        public async Task SaveMessage(Guid userId, Guid ConversationId, string message)
        {
            var messageObj = new Message
            {
                MessageId = Guid.NewGuid(),
                UserId = userId,
                Content = message,
                Status = MessageStatusEnum.Sent,
                ConversationId = ConversationId

            };
            await _messageRepository.AddAsync(messageObj);
            await _messageRepository.Save();
        }
    }
}
