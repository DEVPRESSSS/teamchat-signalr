//import { Radio, User, MessageSquare, Users, ListTree, Settings, Moon } from 'lucide-react';
import { Radio, User, Moon } from 'lucide-react';
import {Link } from "react-router-dom"
const paths = [
    { to: "/userdashboard", name: "Messages", icon: <NavIcon icon={User} /> },
 
];
function NavIcon({ icon: Icon, active = false }) {
    return (
        <button
            className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors
                ${active ? 'bg-indigo-100 text-green-600' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'}`}
        >
            <Icon size={18} />
        </button>
    );
}

function Sidebar() {
    return (
        <aside className="flex flex-col items-center justify-between w-16 py-4 h-screen bg-white shadow-sm border-r border-gray-100">
            {/* Top logo */}
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-green-600 text-white">
                <Radio size={16} />
            </div>

            {/* Middle nav icons */}
            <nav className="flex flex-col gap-3">

                {
                    paths.map((links) => (
                        <Link key={links.to} to={links.to}> {links.icon}</Link>
                    ))
                }
                {/*     
                     <NavIcon icon={MessageSquare} active />
                     <NavIcon icon={Users} />
                     <NavIcon icon={ListTree} />
                     <NavIcon icon={Settings} />
                 */}
               
             
            </nav>

            {/* Bottom: theme toggle + avatar */}
            <div className="flex flex-col items-center gap-4">
                <button className="text-gray-400 hover:text-gray-600">
                    <Moon size={18} />
                </button>
                <img
                    src="https://i.pravatar.cc/32"
                    alt="User avatar"
                    className="w-8 h-8 rounded-full object-cover"
                />
            </div>
        </aside>
    );
}

export default Sidebar;