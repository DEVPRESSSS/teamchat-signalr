using team_chat.Server.DTO;
using team_chat.Server.Model;

namespace team_chat.Server.Services.Interfaces
{
    public interface IUserService
    {    
        Task<IEnumerable<ApplicationUser>> GetAllUsersAsync();
        Task<ApplicationUser> AddUser(CreateUserDto user);
    }
}
