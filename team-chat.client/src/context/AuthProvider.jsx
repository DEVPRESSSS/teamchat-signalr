import { useState, useEffect } from "react";
import AuthContext from "./authContext";
import { me } from "../api/authApi";

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await me();
                setUser(response.data?.email);
            
            } catch {
                setUser(null);

            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
}