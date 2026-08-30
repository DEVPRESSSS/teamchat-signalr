using team_chat.Server.Data;
using team_chat.Server.Model;
using team_chat.Server.Repositories.Interfaces;

namespace team_chat.Server.Repositories
{
    public class UserRepository : Repository<ApplicationUser>, IUserRepository
    {
        public UserRepository(ApplicationDbContext db)
            : base(db)
        {
        }
    }
}