import api from "../services/apiClient";

export async function createConversation(data) {
    const response = await api.post("/conversations/create-convo",data);
    return response;
}

