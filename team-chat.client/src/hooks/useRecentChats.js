import { useEffect, useState } from "react";
import { getRecentContacts } from "../api/usersApi"
function useRecentChats() {
    const [recentChats, setRecentChats] = useState([]);
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
    
    return { recentChats }
}
export default useRecentChats;