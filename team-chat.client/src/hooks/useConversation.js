import { useEffect, useRef, useState } from "react";
import { createConversation } from "../api/conversationApi";
import { useConversationContext } from "../context/conversationContext";
import { connection } from "../api/SignalRClient";
import { useSignalR } from "../context/signalRContext";
function useConversation() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { conversationId, setConversationId } = useConversationContext();
    const { connected } = useSignalR();

    const conversationIdRef = useRef(conversationId);
    useEffect(() => {
        conversationIdRef.current = conversationId;
    }, [conversationId]);

    useEffect(() => {
        if (!connected || !conversationIdRef.current) return;

        connection
            .invoke("JoinConversation", conversationIdRef.current)
            .catch((err) => console.error("Failed to rejoin conversation:", err));
    }, [connected]);

    const startConversation = async (receiverId) => {
        setLoading(true);
        setError(null);

        try {
            const response = await createConversation({
                receiverId
            });

            const newConversationId = response.data;

            setConversationId(newConversationId);


            await connection.invoke(
                "JoinConversation",
                newConversationId
            );
            console.log("SignalR Connection status: ", connected);

        } catch (err) {
            console.error("Failed to start conversation:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        conversationId,
        startConversation,
        loading,
        error
    };
}

export default useConversation;