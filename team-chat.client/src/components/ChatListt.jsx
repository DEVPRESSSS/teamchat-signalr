const chatList = [
    { id: "1", sender: "BSCSJIRO", message: "Tara laro" },
    { id: "2", sender: "BSCSPANPAN", message: "Tara laro" },
    { id: "3", sender: "BSCSSONSON", message: "Tara laro" },
    { id: "4", sender: "BSCSALPHAKAPARO", message: "Tara laro" },
];

function ChatList() {
    return (
        <div className="flex flex-col">
            {chatList.map((senders) => (
                <div
                    key={senders.id}
                    className="flex flex-row items-center gap-3 px-2 py-2 hover:bg-gray-50 rounded-lg"
                >
                    <div className="shrink-0">
                        <img
                            src="https://i.pravatar.cc/32"
                            alt="User avatar"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    </div>

                    <div className="flex-1 min-w-0">
                        <h6 className="text-sm font-semibold truncate">
                            {senders.sender}
                        </h6>
                        <p className="text-gray-500 text-xs truncate">
                            {senders.message}
                        </p>
                    </div>

                    <div className="shrink-0 self-start pt-0.5">
                        <p className="text-xs text-gray-400">5:15 PM</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ChatList;