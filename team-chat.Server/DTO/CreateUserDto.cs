namespace team_chat.Server.DTO
{
    public class CreateUserDto
    {
        public string Email { get; set; } = null!;
        public string? Description { get; set; }
        public string RawPassword { get; set; } = null!;
        public string? ProfilePath { get; set; }
    }
}
