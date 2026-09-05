import { useState } from 'react';
import { SendHorizontal } from 'lucide-react';


function SendMessageInput({ connected, sendMessage, placeholder }) {

    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!message.trim()) {
            return;
        }

        await sendMessage(message);

        setMessage('');
    };

    return (
        <div
            className="flex items-center gap-2 border border-gray-300 px-3 mb-2 py-2 rounded-md w-full
                       focus-within:border-gray-600 focus-within:ring-2 focus-within:ring-indigo-100
                       transition-colors"
        >
            <form
                onSubmit={handleSubmit}
                className="flex items-center w-full"
            >
                <input
                    className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-gray-400"
                    placeholder={placeholder}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={!connected}
                />

                <button
                    type="submit"
                    disabled={!connected || !message.trim()}
                    className="shrink-0 text-gray-400"
                >
                    <SendHorizontal
                        className="text-green-600 cursor-pointer"
                        size={16}
                    />
                </button>
            </form>
        </div>
    );
}

export default SendMessageInput;