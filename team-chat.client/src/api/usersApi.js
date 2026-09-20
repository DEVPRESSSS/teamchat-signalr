import api from "../services/apiClient";

export async function fetchActiveUsers() {
    const response = await api.get("/conversations/active-users");
    return response;
}

