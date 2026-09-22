import { useEffect, useState } from "react";
import { connection } from "../api/SignalRClient";

export function useMessages() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const receiveMessage = (
            conversationId,
            senderId,
            message
        ) => {
            setMessages((prev) => [
                ...prev,
                {
                    avatar: "https://i.pravatar.cc/32",
                    text: message,
                    conversationId,
                    senderId
                }
            ]);
        };

        connection.on("ReceiveMessage", receiveMessage);

        return () => {
            connection.off("ReceiveMessage", receiveMessage);
        };
    }, []);

    const sendMessage = async (conversationId, message) => {
        try {
            await connection.invoke("SendMessage", conversationId, message);
        } catch (error) {
            console.error("Send Message Error:", error);
        }
    };

    return { messages, sendMessage };
}