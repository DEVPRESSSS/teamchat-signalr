import { useState } from "react";
import ActiveUsers from "./ActiveUsers";
import Input from "./Input";
import PersonalMessage from "./PersonalMessage";
import Recents from "./Recents";
import EmptyChat from "./EmptyChat";

function Messages() {
    const [selectedUser, setSelectedUser] = useState(null);

    const [chatOpen, setChatOpen] = useState(false);

    const handleSelectUser = (user) => {
        setSelectedUser(user);
        setChatOpen(true);
    };

    return (
        <div className="flex h-full min-h-0 w-full bg-white">
            <aside
                className={`${chatOpen ? "hidden md:flex" : "flex"} w-full shrink-0 flex-col border-r border-zinc-200 bg-zinc-50 md:w-72 lg:w-80`}
            >
                <div className="px-4 pb-3 pt-4">
                    <h1 className="text-lg font-semibold tracking-tight text-zinc-900">Chats</h1>
                    <div className="mt-3">
                        <Input placeholder="Search messages" />
                    </div>
                </div>
                <div className="flex-1 space-y-6 overflow-y-auto px-2 pb-4">
                    <ActiveUsers
                        selectedUser={selectedUser}
                        setSelectedUser={handleSelectUser} />
                    <Recents />
                </div>
            </aside>

            <section
                className={`${chatOpen ? "flex" : "hidden md:flex"} min-h-0 min-w-0 flex-1 flex-col bg-white`}
            >
                {selectedUser !== null
                    ? <PersonalMessage selectedUser={selectedUser} onBack={() => setChatOpen(false)} />
                    : <EmptyChat />}
            </section>
        </div>
    );
}
export default Messages;