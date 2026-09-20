using Microsoft.EntityFrameworkCore;
using team_chat.Server.Data;
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
    }
}
