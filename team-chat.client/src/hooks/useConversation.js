import { useState } from "react";
import { createConversation } from "../api/conversationApi";

function useConversation() {
    const [conversationId, setConversationId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const startConversation = async (receiverId) => {
        setLoading(true);
        setError(null);

        try {
            const response = await createConversation({
                receiverId: receiverId
            });

            setConversationId(response.data);
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