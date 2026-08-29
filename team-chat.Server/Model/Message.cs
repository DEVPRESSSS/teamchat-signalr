using System.Diagnostics.Contracts;

namespace team_chat.Server.Model
{
    public class Message
    {
        public Guid MessageId { get; set; }
        public Guid UserId { get; set; }
        public ApplicationUser? User { get; set; }
        public string Content { get; set; } = null!;
        public DateTime? CreatedAt { get; set; }
    }
}
