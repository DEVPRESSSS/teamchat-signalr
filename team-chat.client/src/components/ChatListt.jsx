

function ChatList() {
    return (
        <div className="flex flex-col">
                <div
                    className="flex flex-row items-center gap-3 px-2 py-2 hover:bg-gray-50 rounded-lg"
                >
                    <div className="shrink-0">
                     
                    </div>

                    <div className="flex-1 min-w-0">
                        <h6 className="text-sm font-semibold truncate">
                        </h6>
                        <p className="text-gray-500 text-xs truncate">
                        </p>
                    </div>

                    <div className="shrink-0 self-start pt-0.5">
                        <p className="text-xs text-gray-400">5:15 PM</p>
                    </div>
                </div>
            
        </div>
    );
}

export default ChatList;