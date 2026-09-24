import { connection } from "../api/SignalRClient";
import { me } from "../api/authApi";
import { useEffect, useState } from "react";
import SignalRContext from "./signalRContext";
import { useAuth } from "./authContext";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function SignalRProvider({ children }) {

    const { user, setUser, loading } = useAuth();
    const [connected, setConnected] = useState(false);
    const [restartCount, setRestartCount] = useState(0);

    useEffect(() => {
        connection.onreconnecting(() => setConnected(false));
        connection.onreconnected(() => setConnected(true));
        connection.onclose(() => {
            setConnected(false);
            setRestartCount((count) => count + 1);
        });
    }, []);

    useEffect(() => {
        if (loading) return;

        if (!user) {
            if (connection.state !== "Disconnected") connection.stop();
            return;
        }

        let cancelled = false;

        const connect = async () => {
            let attempt = 0;

            while (!cancelled) {
                const state = connection.state;

                if (state === "Connected") {
                    setConnected(true);
                    return;
                }
                if (state !== "Disconnected") {
                    await wait(250);
                    continue;
                }

                try {
                  
                    await me();
                    if (cancelled) return;

                    await connection.start();
                    if (!cancelled) setConnected(true);
                    return;

                } catch (error) {
                    if (error?.response?.status === 401) {
                        if (!cancelled) setUser(null);
                        return;
                    }
                    console.error("SignalR connection failed, retrying:", error);
                    await wait(Math.min(1000 * 2 ** attempt, 15000));
                    attempt++;
                }
            }
        };

        connect();

        return () => {
            cancelled = true;
        };
    }, [user, loading, restartCount, setUser]);

    return (
        <SignalRContext.Provider value={{ connection, connected }}>
            {children}
        </SignalRContext.Provider>
    );
}