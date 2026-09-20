import ChatThread from "./ChatThread";

function Conversation({ messages }) {
    return (
        <div className="flex-1 overflow-y-auto">
            <ChatThread messages={messages} />
        </div>
    );
}

export default Conversation;