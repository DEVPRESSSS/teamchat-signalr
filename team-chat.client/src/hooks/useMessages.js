import { useEffect, useState } from "react";
import { connection } from "../api/SignalRClient";

export function useMessages() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {   
        const receiveMessage = (message) => {

            setMessages((prev) => [
                ...prev,
                {
                    avatar: `https://i.pravatar.cc/32`,
                    text: message         
                }
            ]);
        };

        connection.on("ReceiveMessage", receiveMessage);
        return () => {
            connection.off("ReceiveMessage", receiveMessage);
        };
    }, []);

    const sendMessage = async (message) => {
        try {
            const user = "test";
            await connection.invoke("SendMessage", user, message);
        } catch (error) {
            console.error("Send Message Error:", error);
        }
    };

    return { messages, sendMessage };
}