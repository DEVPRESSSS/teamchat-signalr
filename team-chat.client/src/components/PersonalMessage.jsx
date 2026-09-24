import { ArrowLeft } from "lucide-react";
import Conversation from "./Conversation";
import SendMessageInput from "../components/SendMessageInput"
import Avatar from "./Avatar";
import { useSignalR } from "../context/signalRContext";

function PersonalMessage({ selectedUser, onBack }) {
    const { connected } = useSignalR();

    return (
        <div className="flex min-h-0 flex-1 flex-col">

            <div className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-zinc-200 bg-white px-4">

                <div className="flex min-w-0 items-center gap-3">
                    <button
                        type="button"
                        onClick={onBack}
                        aria-label="Back to chats"
                        className="-ml-1 rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 md:hidden"
                    >
                        <ArrowLeft size={18} />
                    </button>

                    <Avatar src={selectedUser?.profilePath} name={selectedUser?.fullName} size="lg" />

                    <h2 className="truncate text-sm font-semibold text-zinc-900">
                        {selectedUser?.fullName}
                    </h2>
                </div>

                <p role="status" className="flex shrink-0 items-center gap-1.5 text-xs text-zinc-500">
                    <span
                        aria-hidden="true"
                        className={`h-1.5 w-1.5 rounded-full ${connected ? "bg-emerald-500" : "bg-zinc-300"}`}
                    />
                    {connected ? "Connected" : "Connecting…"}
                </p>

            </div>

            <Conversation selectedUser={selectedUser} />
            <SendMessageInput placeholder={`Message ${selectedUser?.fullName ?? ""}`.trim()} />

        </div>
    );
}

export default PersonalMessage;