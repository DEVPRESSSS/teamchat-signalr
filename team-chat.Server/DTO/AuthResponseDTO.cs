namespace team_chat.Server.DTO
{
    public class AuthResponseDTO
    {
        public string Email { get; set; } = null!;
        public string AccessToken { get; set; } = null!;
        public string RefreshToken { get; set; } = string.Empty;
        public DateTime Expiration { get; set; }
        public string RoleName { get; set; } = null!;
        public List<string>? Permissions { get; set; }
        public List<string> Roles { get; set; } = new();

    }
}
