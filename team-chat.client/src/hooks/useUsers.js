import { useEffect, useState } from "react";
import { fetchActiveUsers } from "../api/usersApi"
function useUsers() {
    const [activeUsers, setActiveUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

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

    }, [])

    const selectUser = (user) => {
        setSelectedUser(user);
    };
    
    return { activeUsers, selectedUser, selectUser }
}
export default useUsers;