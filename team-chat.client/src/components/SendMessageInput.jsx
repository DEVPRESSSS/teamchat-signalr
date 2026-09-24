import { SendHorizontal } from 'lucide-react';
import { useSignalR } from '../context/signalRContext';
import { useState } from 'react';
import { useMessages } from '../hooks/useMessages';
import { useConversationContext } from '../context/conversationContext';

function SendMessageInput({ placeholder = "Write a message" }) {

    const { connected } = useSignalR();
    const { sendMessage } = useMessages();
    const [message, setMessage] = useState('');
    const { conversationId } = useConversationContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!message.trim()) {
            return;
        }

        await sendMessage(conversationId, message);

        setMessage('');
    };
    return (
        <form onSubmit={handleSubmit} className="shrink-0 border-t border-zinc-200 bg-white p-3 sm:px-4">
            <div
                className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white py-2 pl-3 pr-2
                           transition-colors focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100"
            >
                <input
                    value={message}
                    aria-label="Message"
                    autoComplete="off"
                    className="min-w-0 flex-1 bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400 disabled:cursor-not-allowed"
                    placeholder={connected ? placeholder : "Connecting…"}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={!connected}
                />

                <button
                    type="submit"
                    aria-label="Send message"
                    disabled={!connected || !message.trim()}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white
                               transition-colors hover:bg-indigo-700
                               disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-400"
                >
                    <SendHorizontal size={16} />
                </button>
            </div>
        </form>
    );
}

export default SendMessageInput;