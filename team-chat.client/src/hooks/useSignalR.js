import { useEffect, useState, useRef } from "react";
import { connection } from "../api/SignalRClient";

export function useSignalR(currentUser) {
    const [messages, setMessages] = useState([]);
    const [connected, setConnected] = useState(false);
    const idCounter = useRef(0);

    useEffect(() => {
        const startConnection = async () => {
            try {
                await connection.start();
                console.log("SignalR Connected");
                setConnected(true);
            } catch (error) {
                console.error("SignalR Connection Error:", error);
            }
        };

        const receiveMessage = (user, message) => {
            idCounter.current += 1;

            setMessages((prev) => [
                ...prev,
                {
                    id: `${Date.now()}-${idCounter.current}`,
                    sender: user === currentUser ? "me" : user,
                    name: user,
                    avatar: `https://i.pravatar.cc/32?u=${user}`,
                    text: message,
                    time: new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                    })
                }
            ]);
        };

        connection.on("ReceiveMessage", receiveMessage);
        startConnection();

        return () => {
            connection.off("ReceiveMessage", receiveMessage);
        };
    }, [currentUser]);

    const sendMessage = async (message) => {
        try {
            await connection.invoke("SendMessage", currentUser, message);
        } catch (error) {
            console.error("Send Message Error:", error);
        }
    };

    return { messages, connected, sendMessage };
}