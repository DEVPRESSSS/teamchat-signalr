namespace team_chat.Server.Utilities
{
    public static  class EncryptPassword
    {
        public string GenerateHashPassword(string rawPassword)
        {
            var hashPassword = BCrypt.Net.BCrypt.HashPassword(rawPassword);

            return hashPassword;
        }
    }
}
