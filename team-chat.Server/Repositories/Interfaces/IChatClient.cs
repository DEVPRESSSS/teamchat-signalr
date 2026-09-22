namespace team_chat.Server.Repositories.Interfaces
{
    public interface IChatClient
    {
        Task ReceiveMessage(
            Guid conversationId,
            string senderId,
            string message
        );
    }
}