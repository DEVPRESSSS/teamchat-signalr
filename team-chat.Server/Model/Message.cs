using System.Diagnostics.Contracts;
using team_chat.Server.Utilities.Enums;

namespace team_chat.Server.Model
{
    public class Message
    {
        public Guid MessageId { get; set; }
        public Guid UserId { get; set; }
        public ApplicationUser? User { get; set; }
        public string Content { get; set; } = null!;
        public MessageStatusEnum Status{ get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}
