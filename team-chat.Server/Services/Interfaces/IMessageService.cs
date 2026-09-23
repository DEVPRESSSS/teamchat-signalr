namespace team_chat.Server.Services.Interfaces
{
    public interface IMessageService
    {
        Task SaveMessage(Guid userId, Guid conversationId, string message);
    }
}
