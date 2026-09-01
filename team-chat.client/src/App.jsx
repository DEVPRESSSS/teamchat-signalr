import './App.css';
import Messages from './components/Messages';
import Sidebar from './components/Sidebar';

function App() {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 bg-gray-50">
                {/* main chat panel goes here */}
                <Messages/>
            </main>
        </div>
    );
}

export default App;