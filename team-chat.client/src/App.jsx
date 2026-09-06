import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import {Toaster } from 'react-hot-toast'
function App() {
    return (
        <BrowserRouter>
            <Toaster position="top-right" reverseOrder={false} />

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