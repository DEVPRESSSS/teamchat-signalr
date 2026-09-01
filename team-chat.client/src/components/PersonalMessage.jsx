// PersonalMessage.jsx (acting as the page shell)
import { Info } from "lucide-react"
import SendFooter from "./SendFooter";
import Conversation from "./Conversation";

function PersonalMessage() {
    return (
        <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between h-14 px-4 border-b border-gray-200 bg-white shrink-0">
                <div className="flex items-center gap-3">
                    <img
                        src="https://i.pravatar.cc/32"
                        alt="User avatar"
                        className="w-9 h-9 rounded-full object-cover ring-1 ring-gray-200 shrink-0"
                    />
                    <h5 className="text-sm font-semibold text-gray-900 tracking-tight">
                        Montemor, Jerald R.
                    </h5>
                </div>

                <button
                    type="button"
                    aria-label="View info"
                    className="text-gray-600 hover:text-gray-600 transition-colors p-1.5 cursor-pointer rounded-full hover:bg-gray-100"
                >
                    <Info size={18} />
                </button>
            </div>

            <Conversation />
            <SendFooter />
        </div>
    );
}

export default PersonalMessage;