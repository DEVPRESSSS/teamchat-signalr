using team_chat.Server.Data;
using team_chat.Server.Model;
using team_chat.Server.Repositories.Interfaces;

namespace team_chat.Server.Repositories
{
    public class MessageRepository: Repository<Message>, IMessageRepository
    {
        public MessageRepository(ApplicationDbContext _db):base(_db)
        {
            
        }
    }
}
