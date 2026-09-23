using team_chat.Server.DTO;
using team_chat.Server.Model;

namespace team_chat.Server.Services.Interfaces
{
    public interface IConversationService
    {
        Task<List<ContactsDto>> GetAllContacts(Guid userId);
        Task<List<ContactsDto>> GetAllActiveUsers(Guid userId);
        Task<Guid> GetOrCreateConversationAsync(Guid receiverId, Guid conversationId);
        Task<ContactsDto> GetUser(Guid userId);
    }
}
