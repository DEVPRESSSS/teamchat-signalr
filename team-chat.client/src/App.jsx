import './App.css';
// import Messages from './components/Messages';
// import Sidebar from './components/Sidebar';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';

function App() {
    return (
        <BrowserRouter>
            {/* <div className="flex h-screen">
                main chat panel goes here <Sidebar />
                <main className="flex-1 bg-gray-50">
                    <Messages />
                </main>

            
            </div>*/ }
            <nav>
                <Link to="/">Login</Link>
            </nav>
            <Routes>
                <Route path="/" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
       
    );
}

export default App;