import api from "../services/apiClient";

export async function fetchActiveUsers() {
    const response = await api.get("/conversations/active-users");
    return response;
}

export async function fetchSelectedUser(userId) {
    const response = await api.get(`/conversations/user/${userId}`);
    return response;
}

export async function getRecentContacts() {
    const response = await api.get('conversations/recents');
    return response;
}
