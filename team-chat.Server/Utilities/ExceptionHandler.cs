namespace team_chat.Server.Utilities
{
    public class ExceptionHandler :Exception
    {
        public int StatusCode { get; }

        public ExceptionHandler(int statusCode, string message) :base(message)
        {
            StatusCode = statusCode;
        }
    }
}
