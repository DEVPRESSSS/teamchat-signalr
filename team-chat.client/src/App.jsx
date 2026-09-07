import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import {Toaster } from 'react-hot-toast'
import DefaultLayout from './layout/DefaultLayout';
import Home from './components/Home';
import About from './components/About';
import Register from './pages/auth/Register';
import UserLayout from './layout/UserLayout';
import Messages from './components/Messages';
function App() {
    return (
        <BrowserRouter>
            <Toaster position="top-right" reverseOrder={false} />
            <Routes>
                {/*DefaultLayout route */ }
                <Route element={<DefaultLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/aboutus" element={<About />} />
                </Route>

                {/*UserLayout route */}
                <Route element={<UserLayout />}>
                    <Route path="/userdashboard" element={<Messages />} />            
                </Route>
            </Routes>
        </BrowserRouter>
       
    );
}

export default App;