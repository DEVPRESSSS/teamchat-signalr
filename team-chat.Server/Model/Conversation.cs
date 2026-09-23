using team_chat.Server.Utilities.Enums;

namespace team_chat.Server.Model
{
    public class Conversation
    {
        public Guid ConversationId { get; set; }
        public ConversationTypeEnum Type { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<ConversationParticipant> Participants { get; set; } = new();
        public List<Message> Messages { get; set; } = new();

    }
}
