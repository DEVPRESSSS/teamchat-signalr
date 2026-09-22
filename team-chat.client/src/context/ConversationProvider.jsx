import { useState } from "react";
import ConversationContext from "../context/conversationContext";

export function ConversationProvider({ children }) {

    const [conversationId, setConversationId] = useState(null);


    return (
        <ConversationContext.Provider value={{ conversationId, setConversationId }}>
            {children}
        </ConversationContext.Provider>
    );
}