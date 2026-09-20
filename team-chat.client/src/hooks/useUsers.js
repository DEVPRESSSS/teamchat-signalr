import { useEffect, useState } from "react";
import { fetchActiveUsers } from "../api/usersApi"
function useUsers() {
    const [activeUsers, setActiveUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetchActiveUsers();
                setActiveUsers(response.data.users);

            } catch (error) {
                console.log(error);
            }
        }
        fetchUsers();

    },[])
    
    return {activeUsers}
}
export default useUsers;