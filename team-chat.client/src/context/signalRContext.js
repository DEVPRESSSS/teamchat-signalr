import { createContext, useContext } from "react";

const SignalRContext = createContext(false);

export function useSignalR() {
    return useContext(SignalRContext);
}

export default SignalRContext;