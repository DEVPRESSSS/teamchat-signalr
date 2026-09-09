namespace team_chat.Server.DTO
{
    public class CreateUserDto
    {
        public string Email { get; set; } = null!;
        public string? Description { get; set; }
        public string Name { get; set; } = null!;
        public string RawPassword { get; set; } = null!;
        public Guid RoleId { get; set; }
        public string? ProfilePath { get; set; }
    }
}
