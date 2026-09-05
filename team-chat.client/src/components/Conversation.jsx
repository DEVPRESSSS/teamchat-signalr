import ChatThread from "./ChatThread";

function Conversation({ messages }) {
    return (
        <div className="flex-1 overflow-y-auto bg-gray-100">
            <ChatThread messages={messages} />
        </div>
    );
}

export default Conversation;