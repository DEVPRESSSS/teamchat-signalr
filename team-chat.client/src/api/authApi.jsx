import api from "../services/apiClient";

export async function login(data) {
    const response = await api.post("/auth", data);
    return response;
}