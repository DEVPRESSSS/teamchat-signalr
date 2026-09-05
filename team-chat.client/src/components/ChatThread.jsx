
function groupConsecutive(messages) {
    const groups = [];

    for (const msg of messages) {
        const last = groups[groups.length - 1];

        if (last && last.sender === msg.sender) {
            last.messages.push({ ...msg, isFirst: false });
        } else {
            groups.push({
                sender: msg.sender,
                name: msg.name,
                avatar: msg.avatar,
                messages: [{ ...msg, isFirst: true }]
            });
        }
    }

    return groups;
}

function MessageBubble({ text, time, isFirst, isMe, onMenuClick }) {

    const radiusClass = isMe
        ? isFirst
            ? "rounded-2xl rounded-br-md"
            : "rounded-2xl rounded-tr-md rounded-br-md"
        : isFirst
            ? "rounded-2xl rounded-bl-md"
            : "rounded-2xl rounded-tl-md rounded-bl-md";

    const bubbleColor = isMe
        ? "bg-indigo-500 text-white"
        : "bg-white text-gray-800 border border-gray-200";

    const timeColor = isMe
        ? "text-indigo-100/80"
        : "text-gray-400";

    return (
        <div
            className={`group flex items-end gap-1.5 ${isMe ? "justify-end" : "justify-start"
                }`}
        >
            {isMe && (
                <button
                    type="button"
                    onClick={onMenuClick}
                    className="mt-1.5 opacity-0 group-hover:opacity-100"
                >
                    More
                </button>
            )}

            <div
                className={`px-3.5 py-2 max-w-[240px] ${radiusClass} ${bubbleColor}`}
            >
                <p className="text-sm leading-snug">
                    {text}
                </p>

                <span
                    className={`block text-[11px] text-right mt-1 ${timeColor}`}
                >
                    {time}
                </span>
            </div>

            {!isMe && (
                <button
                    type="button"
                    onClick={onMenuClick}
                    className="mt-1.5 opacity-0 group-hover:opacity-100"
                >
                    More
                </button>
            )}
        </div>
    );
}

function MessageGroup({ group }) {

    const isMe = group.sender === "me";

    return (
        <div className="flex flex-col gap-1 mb-4">

            {group.messages.map((msg) => (
                <MessageBubble
                    key={msg.id}
                    text={msg.text}
                    time={msg.time}
                    isFirst={msg.isFirst}
                    isMe={isMe}
                    onMenuClick={() =>
                        console.log("Message:", msg.id)
                    }
                />
            ))}

            <div
                className={`flex items-center gap-2 mt-1 ${isMe ? "justify-end" : "justify-start"
                    }`}
            >
                {!isMe && (
                    <img
                        src={group.avatar}
                        alt={group.name}
                        className="w-7 h-7 rounded-full object-cover"
                    />
                )}

                <span className="text-xs text-gray-500">
                    {group.name}
                </span>

                {isMe && (
                    <img
                        src={group.avatar}
                        alt={group.name}
                        className="w-7 h-7 rounded-full object-cover"
                    />
                )}
            </div>

        </div>
    );
}

export default function ChatThread({ messages }) {

    const groups = groupConsecutive(messages);

    return (
        <div className="mx-auto p-6 bg-white">
            {groups.map((group) => (
                <MessageGroup
                    key={group.sender + group.messages[0].id}
                    group={group}
                />
            ))}
        </div>
    );
}