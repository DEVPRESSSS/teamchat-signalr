import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import {Toaster } from 'react-hot-toast'
import DefaultLayout from './layout/DefaultLayout';
import Home from './components/Home';
function App() {
    return (
        <BrowserRouter>
            <Toaster position="top-right" reverseOrder={false} />
            <Routes>
                <Route element={<DefaultLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={<LoginPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
       
    );
}

export default App;