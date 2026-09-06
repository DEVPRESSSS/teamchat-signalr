namespace team_chat.Server.Utilities
{
    public static class EncryptPassword
    {
        public static string GenerateHashPassword(string rawPassword)
        {
            var hashPassword = BCrypt.Net.BCrypt.HashPassword(rawPassword);

            return hashPassword;
        }
    }
}
