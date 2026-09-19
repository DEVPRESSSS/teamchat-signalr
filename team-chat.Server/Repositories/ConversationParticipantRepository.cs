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
    }
}
