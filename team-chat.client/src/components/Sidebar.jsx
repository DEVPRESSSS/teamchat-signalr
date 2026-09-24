import { Radio, MessageSquare } from 'lucide-react';
import { NavLink } from "react-router-dom"
import { useLogout } from '../hooks/useLogout';
import { useAuth } from '../context/authContext';
import Avatar from './Avatar';

const paths = [
    { to: "/userdashboard", name: "Messages", icon: MessageSquare },
];

function Sidebar() {
    const { handleConfirmation } = useLogout();
    const { user } = useAuth();

    return (
        <aside className="flex h-full w-16 flex-col items-center justify-between border-r border-zinc-200 bg-white py-4">
            <div
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-white"
            >
                <Radio size={16} />
            </div>

            <nav aria-label="Main" className="flex flex-col gap-2">
                {paths.map(({ to, name, icon: Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        aria-label={name}
                        title={name}
                        className={({ isActive }) =>
                            `flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${isActive
                                ? "bg-indigo-50 text-indigo-600"
                                : "text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
                            }`
                        }
                    >
                        <Icon size={18} />
                    </NavLink>
                ))}
            </nav>

            <button
                type="button"
                onClick={handleConfirmation}
                aria-label="Log out"
                title="Log out"
                className="rounded-full"
            >
                <Avatar name={String(user ?? "")} />
            </button>
        </aside>
    );
}

export default Sidebar;