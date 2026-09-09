namespace team_chat.Server.Model
{
    public class ApplicationUser
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public Guid RoleId { get; set; }
        public Role? Role { get; set; }
        public string? Description { get; set; }
        public string PasswordHash { get; set; } = null!;
        public string? ProfilePath { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime Expiration { get; set; }
        public DateOnly CreatedAt { get; set; }
        public DateOnly UpdatedAt { get; set; }

        //Navigation property 
        public List<Message>? Messages { get; set; }
    }
}
