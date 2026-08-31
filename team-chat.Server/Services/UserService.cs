using Microsoft.Identity.Client;
using team_chat.Server.DTO;
using team_chat.Server.Model;
using team_chat.Server.Repositories.Interfaces;
using team_chat.Server.Services.Interfaces;
using team_chat.Server.Utilities;

public class UserService: IUserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }
    public async Task<ApplicationUser> AddUser(CreateUserDto userDto)
    {
        if (!userDto.Email.EndsWith("@gmail.com")) throw new ExceptionHandler("Invalid email format");

        var user = new ApplicationUser
        {
            Id = Guid.NewGuid(),
            Email = userDto.Email,
            Description = userDto.Description,
            PasswordHash = userDto.PasswordHash,
            ProfilePath = userDto.ProfilePath,
        };

        var isExist = await _userRepository.GetAsync(x=>x.Email == userDto.Email);
        if (isExist != null) throw new ExceptionHandler("Conflict: Email already taken!!");

        await _userRepository.AddAsync(user);
        await _userRepository.Save();

        return user;
    }

    public async Task<IEnumerable<ApplicationUserDto>> GetAllUsersAsync()
    {
        var users = await _userRepository.GetAllAsync();
        var applicationUserDto =  users.Select(u => new ApplicationUserDto
        {
            Id = u.Id,
            Email = u.Email,
            Description = u.Description,
            ProfilePath = u.ProfilePath,
            CreatedAt = u.CreatedAt,
            UpdatedAt = u.UpdatedAt,
        }).ToList();
        return applicationUserDto;
    }

    public async Task<ApplicationUser> GetUser(Guid id)
    {
        var users = await _userRepository.GetAsync(x=>x.Id == id);
        if(users is null)  throw new ExceptionHandler("Not found: User not found");

        return users;
    }

    public async Task UpdateUser(Guid id , UpdateUserDto updateUserDto)
    {
        var user = await _userRepository.GetAsync(x=>x.Id==id);
        if (user is null) throw new ExceptionHandler("Not found: User not found");

        var mapUser = new ApplicationUser
        {
            Email = updateUserDto.Email,
            Description = updateUserDto.Description,
            ProfilePath = updateUserDto.ProfilePath,
        };

        await _userRepository.UpdateAsync(mapUser);
        await _userRepository.Save();   
    }
}