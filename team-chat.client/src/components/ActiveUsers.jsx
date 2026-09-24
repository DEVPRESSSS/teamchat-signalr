import useConversation from "../hooks/useConversation";
import useUsers from "../hooks/useUsers";
import Avatar from "./Avatar";

function ActiveUsers({ selectedUser, setSelectedUser }) {
    const { activeUsers, loading, error } = useUsers();
    const { startConversation } = useConversation();

    const handleUserClick = async (user) => {
        setSelectedUser(user);

        await startConversation(user.userId);
    };

    return (
        <section aria-labelledby="people-heading">
            <h2 id="people-heading" className="px-2 pb-1 text-xs font-semibold text-zinc-500">
                People
            </h2>

            {loading && (
                <p role="status" className="px-2 py-2 text-sm text-zinc-500">Loading people…</p>
            )}
            {!loading && error && (
                <p role="alert" className="px-2 py-2 text-sm text-red-600">
                    Unable to load people. Refresh the page to try again.
                </p>
            )}
            {!loading && !error && activeUsers.length === 0 && (
                <p className="px-2 py-2 text-sm text-zinc-500">
                    No one else has joined yet. Invite a teammate to register.
                </p>
            )}

            <ul>
                {activeUsers.map((user) => {
                    const isSelected = selectedUser?.userId === user.userId;
                    return (
                        <li key={user.userId}>
                            <button
                                type="button"
                                onClick={() => handleUserClick(user)}
                                aria-current={isSelected ? "true" : undefined}
                                className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors ${isSelected ? "bg-indigo-50" : "hover:bg-zinc-100"
                                    }`}
                            >
                                <Avatar src={user.profilePath} name={user.fullName} />
                                <span className="min-w-0 flex-1 truncate text-sm font-medium text-zinc-900">
                                    {user.fullName}
                                </span>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}

export default ActiveUsers;