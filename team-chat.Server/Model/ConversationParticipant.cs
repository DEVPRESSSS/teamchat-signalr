namespace team_chat.Server.Model
{
    public class ConversationParticipant
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public ApplicationUser? User { get; set; }
        public Guid ConversationId { get; set; }
        public Conversation? Conversation { get; set; }
        public DateTime LastReadAt { get; set; }

    }
}
