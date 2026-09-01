namespace team_chat.Server.DTO
{
    public class UpdateUserDto
    {
        public string Email { get; set; } = null!;
        public string? Description { get; set; }
        public string? ProfilePath { get; set; }
    }
}
