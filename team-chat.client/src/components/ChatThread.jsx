import { MoreVertical } from "lucide-react";

function groupConsecutive(messages) {
    const groups = [];
    for (const msg of messages) {
        const last = groups[groups.length - 1];
        if (last && last.sender === msg.sender) {
            last.messages.push(msg);
        } else {
            groups.push({ sender: msg.sender, name: msg.name, avatar: msg.avatar, messages: [msg] });
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

    const timeColor = isMe ? "text-indigo-100/80" : "text-gray-400";

    const menuButton = (
        <button
            type="button"
            onClick={onMenuClick}
            aria-label="Message options"
            className="mt-1.5 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity text-gray-400 hover:text-gray-600"
        >
            <MoreVertical size={16} />
        </button>
    );

    const bubble = (
        <div className={`px-3.5 py-2 max-w-[240px] ${radiusClass} ${bubbleColor}`}>
            <p className="text-sm leading-snug">{text}</p>
            <span className={`block text-[11px] text-right mt-1 ${timeColor}`}>{time}</span>
        </div>
    );

    // 'me' messages: bubble first, menu after (menu sits on the outer/left side).
    // 'them' messages: menu first, bubble after (menu sits on the outer/right side).
    return (
        <div className={`group flex items-end gap-1.5 ${isMe ? "justify-end" : "justify-start"}`}>
            {isMe ? (
                <>
                    {menuButton}
                    {bubble}
                </>
            ) : (
                <>
                    {bubble}
                    {menuButton}
                </>
            )}
        </div>
    );
}

function MessageGroup({ group }) {
    const isMe = group.sender === "me";

    return (
        <div className="flex flex-col gap-1 mb-4">
            {group.messages.map((msg, i) => (
                <MessageBubble
                    key={i}
                    text={msg.text}
                    time={msg.time}
                    isFirst={i === 0}
                    isMe={isMe}
                    onMenuClick={() => console.log("open menu for:", msg.text)}
                />
            ))}


            <div className={`flex items-center gap-2 mt-1 ${isMe ? "justify-end" : "justify-start"}`}>
                {!isMe && (
                    <img
                        src={group.avatar || `https://i.pravatar.cc/40?u=${group.name}`}
                        alt={group.name}
                        className="w-7 h-7 rounded-full object-cover"
                    />
                )}
                <span className="text-xs text-gray-500">{group.name}</span>
                {isMe && (
                    <img
                        src={group.avatar || `https://i.pravatar.cc/40?u=${group.name}`}
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
        <div className=" mx-auto p-6 bg-white">
            {groups.map((group, i) => (
                <MessageGroup key={i} group={group} />
            ))}
        </div>
    );
}
export function ChatThreadDemo() {
    const sampleMessages = [
        { sender: "me", name: "Jerald", text: "Good morning", time: "10:00" },
        { sender: "me", name: "Jerald", text: "Yeah everything is fine", time: "10:05" },
        { sender: "them", name: "Doris Brown", text: "Sounds good, see you then", time: "10:06" },
        { sender: "me", name: "Jerald", text: "Next meeting tomorrow 10.00AM", time: "10:05" },
    ];

    return <ChatThread messages={sampleMessages} />;
}