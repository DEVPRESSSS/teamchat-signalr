import api from "../services/apiClient";

export async function login(data) {
    const response = await api.post("/auth/login", data);
    return response;
}

export async function register(data) {
    const response = await api.post("/auth/register", data);
    return response;
}

export async function me() {
    const response = await api.get("/auth/me");
    return response;
}

export async function logout() {
    const response = await api.post("/auth/logout");
    return response;
}

export async function refreshtoken() {
    const response = await api.post("/auth/refresh-token");
    return response;
}