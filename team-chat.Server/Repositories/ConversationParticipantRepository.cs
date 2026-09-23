using Microsoft.EntityFrameworkCore;
using team_chat.Server.Data;
using team_chat.Server.DTO;
using team_chat.Server.Model;
using team_chat.Server.Repositories.Interfaces;

namespace team_chat.Server.Repositories
{
    public class ConversationParticipantRepository: Repository<ConversationParticipant>, IConversationParticipantRepostitory
    {
        public ConversationParticipantRepository(ApplicationDbContext db)
         : base(db)
        {

        }

        public async Task<Guid?> FindSharedConversationIdAsync(Guid userId, Guid receiverId)
        {
            var sharedParticipant = await _db.ConversationParticipant
                .FromSqlInterpolated($@"
            SELECT cp1.* FROM ConversationParticipant cp1
            INNER JOIN ConversationParticipant cp2 
                ON cp1.ConversationId = cp2.ConversationId
            WHERE cp1.UserId = {userId} AND cp2.UserId = {receiverId}")
                .FirstOrDefaultAsync();

            return sharedParticipant?.ConversationId;
        }

        public async Task<List<RecentsDto>> GetAllRecentConversation(Guid userId)
        {
            var recentChats = await _db.ConversationParticipant
            .Where(cp => cp.UserId == userId)
            .Select(cp => new
            {
                cp.ConversationId,
                OtherUser = _db.ConversationParticipant
                    .Where(other => other.ConversationId == cp.ConversationId
                                  && other.UserId != userId)
                    .Select(other => other.User.Name)
                    .FirstOrDefault(),
                LastMessage = _db.Messages
                    .Where(m => m.ConversationId == cp.ConversationId)
                    .OrderByDescending(m => m.CreatedAt)
                    .Select(m => new { m.Content, m.CreatedAt })
                    .FirstOrDefault()
            })
            .OrderByDescending(x => x.LastMessage != null ? x.LastMessage.CreatedAt : DateTime.MinValue)
            .ToListAsync();

            var recentsDto = recentChats.Select(x=> new RecentsDto
            {
                ConversationId = x.ConversationId,
                ReceieverName = x.OtherUser,
                LastMessage = x.LastMessage?.Content,
                LastMessageAt = x.LastMessage?.CreatedAt
            }).ToList();

            return recentsDto;
        }
    }
}
