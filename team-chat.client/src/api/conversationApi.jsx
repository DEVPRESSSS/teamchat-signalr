import api from "../services/apiClient";

export async function createConversation() {
    const response = await api.post("/conversations");
    return response;
}

