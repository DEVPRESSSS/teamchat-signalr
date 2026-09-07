import api from "../services/apiClient";

export async function login(data) {
    const response = await api.post("/auth/login", data);
    return response;
}

export async function register(data) {
    const response = await api.post("/auth/register", data);
    return response;
}