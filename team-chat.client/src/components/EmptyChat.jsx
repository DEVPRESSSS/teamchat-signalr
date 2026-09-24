import { MessageSquareDashed } from "lucide-react";

function EmptyChat() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-zinc-50 px-6 text-center">
            <div
                aria-hidden="true"
                className="flex h-14 w-14 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-400"
            >
                <MessageSquareDashed size={26} strokeWidth={1.5} />
            </div>

            <div className="space-y-1">
                <h2 className="text-base font-semibold text-zinc-900">No conversation selected</h2>
                <p className="max-w-xs text-sm leading-relaxed text-zinc-500">
                    Choose someone from the People list to start chatting.
                </p>
            </div>
        </div>
    );
}

export default EmptyChat;