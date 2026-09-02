import { ChatThreadDemo } from "./ChatThread";

// Conversation.jsx
function Conversation() {
  return (
      <div className="flex-1 overflow-y-auto bg-gray-100">
          <ChatThreadDemo/>
      </div>
  );
}

export default Conversation;