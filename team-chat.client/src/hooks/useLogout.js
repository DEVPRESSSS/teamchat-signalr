import { logout } from "../api/authApi";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useAuth } from "../context/authContext"; 
export function useLogout() {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const MySwal = withReactContent(Swal)

    const handleConfirmation = async () => {
        const result = await MySwal.fire({
            title: "Are you sure you want to logout?",
            icon: "question",
            position: "center",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            width: "20rem",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            customClass: {
                popup: "swal-popup",
                title: "swal-title"
            }
        });

        if (result.isConfirmed) {
            try {
                const response = await logout();
                toast.success(response.data?.message ?? "Logged out successfully.");
            } catch (error) {
                console.log("Logout request failed (likely already expired):", error);
            } finally {
                setUser(null);       
                navigate("/login"); 
            }
        }
    };

    return { handleConfirmation };
}