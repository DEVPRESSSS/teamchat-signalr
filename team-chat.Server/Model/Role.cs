namespace team_chat.Server.Model
{
    public class Role
    {
        public Guid RoleId { get; set; }
        public string? RoleName { get; set; }
        public DateOnly CreatedAt { get; set; }
        public DateOnly UpdatedAt { get; set; }

        //Navigation property 
        public List<ApplicationUser>? ApplicationUsers { get; set; }

    }
}
