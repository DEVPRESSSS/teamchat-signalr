import useRecentChats from "../hooks/useRecentChats";


function ChatList() {
    const { recentChats } = useRecentChats();

    return (
        <div className="flex flex-col">
            {recentChats.map((rc) => (
                <div
                    key={rc.conversationId}
                    className="flex flex-row items-center gap-3 px-2 py-2 hover:bg-gray-50 rounded-lg"
                >
                    {/* Avatar */}
                    <div className="shrink-0">
                        <img
                            src={`https://i.pravatar.cc/150?u=${encodeURIComponent(
                                    rc.receiverName
                            )}`}
                            alt={rc.receieverName}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    </div>

                    {/* Name + Last message */}
                    <div className="flex-1 min-w-0">
                        <h6 className="text-sm font-semibold truncate">
                            {rc.receieverName}
                        </h6>

                        <p className="text-gray-500 text-xs truncate">
                            {rc.lastMessage}
                        </p>
                    </div>

                    {/* Time */}
                    <div className="shrink-0 self-start pt-0.5">
                        <p className="text-xs text-gray-400">
                            {rc.lastMessageAt}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ChatList;

