import { connection } from "../api/SignalRClient";
import { useEffect, useState } from "react";
import SignalRContext from "./signalRContext";
export function SignalRProvider({ children }) {

    const [connected, setConnected] = useState(false);

    useEffect(() => {

        const startConnection = async () => {

            try {
                await connection.start();
                console.log("SignalR connected!");
                setConnected(true);
            } catch(error) {
                console.log(error);
            }
        };
        startConnection();

    }, []);
    

    return (
        <SignalRContext.Provider value={{ connection, connected }}>
            {children}
        </SignalRContext.Provider>
    );
}