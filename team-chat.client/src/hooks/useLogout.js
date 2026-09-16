import { logout } from "../api/authApi";
import toast from 'react-hot-toast';
import {useNavigate } from 'react-router-dom'
export function useLogout() {
    const navigate = useNavigate();
    const handleConfirmation = async () => {     
        const response = await logout();

        toast.success(response.data.message);
        navigate("/login");
    };
    return {handleConfirmation };
}