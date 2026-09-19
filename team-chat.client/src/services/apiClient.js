import axios from "axios";
const URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    },
});

//Auto logout
api.interceptors.response.use(
    (response) => response,
    async (error) => {

        const originalRequest = error.config;
        if (error.response?.status == 401
            && !originalRequest._retry) {

            originalRequest._retry = true;
            try {
                await axios.post(`${URL}/auth/refresh-token`,
                 {},
                    {
                        withCredentials: true
                    }
                );
              
                return api(originalRequest);

            } catch {
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default api;