using team_chat.Server.DTO;
using team_chat.Server.Model;

namespace team_chat.Server.Repositories.Interfaces
{
    public interface IConversationParticipantRepostitory: IRepository<ConversationParticipant>
    {
        Task<Guid?> FindSharedConversationIdAsync(Guid userId, Guid receiverId);
        Task<List<RecentsDto>> GetAllRecentConversation(Guid userId);
    }
}
