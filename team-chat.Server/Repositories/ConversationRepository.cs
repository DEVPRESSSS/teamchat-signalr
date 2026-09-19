using team_chat.Server.Data;
using team_chat.Server.Model;
using team_chat.Server.Repositories.Interfaces;

namespace team_chat.Server.Repositories
{
    public class ConversationRepository:Repository<Conversation>, IConversationRepository
    {
        public ConversationRepository(ApplicationDbContext db)
           : base(db)
        {

        }
    }
}
