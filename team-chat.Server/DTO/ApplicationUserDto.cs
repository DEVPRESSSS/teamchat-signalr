using team_chat.Server.Model;

namespace team_chat.Server.DTO
{
    public class ApplicationUserDto
    {
        public Guid Id { get; set; }
        public string Email { get; set; } = null!;
        public string? Description { get; set; }
        public string? ProfilePath { get; set; }
        public DateOnly CreatedAt { get; set; }
        public DateOnly UpdatedAt { get; set; }
       
    }
}
