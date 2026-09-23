namespace team_chat.Server.DTO
{
    public class RecentsDto
    {
        public Guid ConversationId { get; set; }

        public string? ReceieverName { get; set; }
        public string? LastMessage { get; set; }
        public DateTime? LastMessageAt { get; set; }
    }
}
