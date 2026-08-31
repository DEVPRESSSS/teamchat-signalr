using team_chat.Server.DTO;
using team_chat.Server.Model;

namespace team_chat.Server.Services.Interfaces
{
    public interface IUserService
    {    
        Task<IEnumerable<ApplicationUserDto>> GetAllUsersAsync();
        Task<ApplicationUser> AddUser(CreateUserDto createUserDto);
        Task<ApplicationUser> GetUser(Guid id);
        Task UpdateUser(Guid id, UpdateUserDto updateUserDto);
    }
}
