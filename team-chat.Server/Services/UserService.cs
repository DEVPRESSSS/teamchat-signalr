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
        if (isExist != null) throw new ExceptionHandler("Email already taken!!");

        await _userRepository.AddAsync(user);
        await _userRepository.Save();

        return user;
    }

    public async Task<IEnumerable<ApplicationUser>> GetAllUsersAsync()
    {
        var users = await _userRepository.GetAllAsync();
        return users;
    }
}