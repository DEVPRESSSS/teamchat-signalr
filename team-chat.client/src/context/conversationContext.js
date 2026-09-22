import { createContext, useContext } from "react";

const ConversationContext = createContext(null);

export function useConversationContext() {
    return useContext(ConversationContext);
}

export default ConversationContext;