import { useState } from "react";
import ConversationContext from "../context/conversationContext";
import { useAuth } from "./authContext";

export function ConversationProvider({ children }) {

    const { user } = useAuth();
    const [conversationId, setConversationId] = useState(null);
    const [previousUser, setPreviousUser] = useState(user);

    if (user !== previousUser) {
        setPreviousUser(user);
        if (!user) setConversationId(null);
    }

    return (
        <ConversationContext.Provider value={{ conversationId, setConversationId }}>
            {children}
        </ConversationContext.Provider>
    );
}