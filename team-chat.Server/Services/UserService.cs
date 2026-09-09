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
        if(userDto is null)
            throw new ExceptionHandler(400, "Invalid payload");

        if (!userDto.Email.EndsWith("@gmail.com")) throw new ExceptionHandler(400,"Invalid email format");
        if (string.IsNullOrEmpty(userDto.RawPassword)) throw new ExceptionHandler(400,"Password is required");

        var hashPassword = EncryptPassword.GenerateHashPassword(userDto.RawPassword);
        var user = new ApplicationUser
        {
            Id = Guid.NewGuid(),
            Email = userDto.Email,
            Description = userDto.Description,
            PasswordHash = hashPassword,
            RoleId = userDto.RoleId,
            Name = userDto.Name,
            ProfilePath = userDto.ProfilePath,
        };

        var isExist = await _userRepository.GetAsync(x=>x.Email == userDto.Email);
        if (isExist != null) throw new ExceptionHandler(404,"Email already taken!!");

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
        if(users is null)  throw new ExceptionHandler(404,"User not found");

        return users;
    }

    public async Task UpdateUser(Guid id , UpdateUserDto updateUserDto)
    {
        if(updateUserDto is null)
            throw new ExceptionHandler(400, "Invalid payload");

        var user = await _userRepository.GetAsync(x=>x.Id==id);
        if (user is null) throw new ExceptionHandler(404,"User not found");

        var isEmailExist = await _userRepository.GetAsync(x=>x.Email==updateUserDto.Email && x.Id !=id);
        if (isEmailExist is not null) throw new ExceptionHandler(409,"Email already taken");

        user.Email = updateUserDto.Email;
        user.Description = updateUserDto.Description;
        user.ProfilePath = updateUserDto.ProfilePath;
        user.Name = updateUserDto.Name;
     
        await _userRepository.UpdateAsync(user);
        await _userRepository.Save();   
    }
}