namespace team_chat.Server.Model
{
    public class ApplicationUser
    {
        public Guid Id { get; set; }
        public string Email { get; set; } = null!;
        public string? Description { get; set; }
        public string PasswordHash { get; set; } = null!;
        public string? ProfilePath { get; set; }
        public DateOnly CreatedAt { get; set; }
        public DateOnly UpdatedAt { get; set; }
    }
}
