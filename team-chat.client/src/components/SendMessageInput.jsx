import { SendHorizontal } from 'lucide-react';
import { useSignalR } from '../hooks/useSignalR';
function SendMessageInput({ placeholder }) {

    const { messages, connected, sendMessage } = useSignalR();
    ///
    return (
        <div className="flex items-center gap-2 border border-gray-300 px-3 mb-2 py-2 rounded-md w-full
                         focus-within:border-gray-600 focus-within:ring-2 focus-within:ring-indigo-100
                         transition-colors">

            <form onSubmit={ }>
                <input
                    className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-gray-400"
                    placeholder={placeholder}
                />
                <div className="shrink-0 text-gray-400">
                    <SendHorizontal className="text-green-600 cursor-pointer " size={16} />
                </div>
            </form>   
        </div>
    );
}
export default SendMessageInput;