import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import { Toaster } from 'react-hot-toast'
import DefaultLayout from './layout/DefaultLayout';
import Register from './pages/auth/Register';
import UserLayout from './layout/UserLayout';
import Messages from './components/Messages';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';

function App() {
    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <Routes>
                <Route element={<DefaultLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/aboutus" element={<About/>} />
                </Route>

                <Route element={<UserLayout />}>
                    <Route path="/userdashboard"
                        element={
                            <ProtectedRoute>
                                <Messages />
                            </ProtectedRoute>

                        }/>
                </Route>
            </Routes>
        </>
    );
}

export default App;