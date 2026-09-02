import { Search } from 'lucide-react';
function Input({ placeholder }) {
    return (
        <div className="flex items-center gap-2 border border-gray-300 px-3 mb-2 py-2 rounded-md w-full
                         focus-within:border-green-600 focus-within:ring-2 focus-within:ring-indigo-100
                         transition-colors">
         
            <div className="shrink-0 text-gray-400">
                <Search size={16}/>
            </div>
            <input
                className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-gray-400"
                placeholder={placeholder}
            />
        </div>
    );
}
export default Input;