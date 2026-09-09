using team_chat.Server.Data;
using team_chat.Server.Model;
using team_chat.Server.Repositories.Interfaces;

namespace team_chat.Server.Repositories
{
    public class RoleRepository : Repository<Role>, IRoleRepository
    {
        public RoleRepository(ApplicationDbContext db)
            : base(db)
        {
        }
    }
}
