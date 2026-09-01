import ActiveUsers from "./ActiveUsers";
import Input from "./Input";
import PersonalMessage from "./PersonalMessage";
import Recents from "./Recents";

function Messages() {

    return (
        <div className="grid grid-cols-[auto_1fr] gap-2 w-full h-full">
            <div className="bg-gray-50 w-30  lg:w-64 px-4 py-0 md:py-3">
                <h6 className="text-gray-600 font-semibold border-b mb-4 border-gray-200">Chats</h6>
                <Input placeholder="Search messages" />
                <ActiveUsers />
                <Recents/>
            </div>
            <div className="flex flex-col bg-white px-4 md:py-3">
                <PersonalMessage />
            </div>
        </div>
    );
}
export default Messages;