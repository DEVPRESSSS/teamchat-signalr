import useConversation from "../hooks/useConversation";
import useUsers from "../hooks/useUsers";

function ActiveUsers() {
    const { activeUsers } = useUsers();
    const { startConversation } = useConversation();
    return (
        <div className="grid grid-cols-4 gap-2">
            {activeUsers.map((user) => (
                <div
                    key={user.userId}
                    onClick={() => startConversation(user.userId)}
                    className="min-w-0 cursor-pointer"
                >
                    <div>
                        <img
                            src="https://i.pravatar.cc/32"
                            alt="User avatar"
                            className="w-8 h-8 rounded-full object-cover"
                        />
                    </div>

                    <h6 className="text-sm text-gray-600 truncate">
                        {user.fullName}
                    </h6>
                </div>
            ))}
        </div>
    );
}

export default ActiveUsers;