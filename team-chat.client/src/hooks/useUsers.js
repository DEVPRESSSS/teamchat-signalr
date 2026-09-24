import { useEffect, useState } from "react";
import { fetchActiveUsers, getRecentContacts } from "../api/usersApi"
function useUsers() {
    const [activeUsers, setActiveUsers] = useState([]);
    const [recentChats, setRecentChats] = useState([]);
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

    useEffect(() => {
        const getRecentContactsList = async () => {
            try {
                const response = await getRecentContacts();
                setRecentChats(response.data.listOfContacts);

            } catch (error) {
                console.log(error);
            }
        }
        getRecentContactsList();

    }, [])
    
    return { activeUsers, selectedUser, selectUser, recentChats }
}
export default useUsers;