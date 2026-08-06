import axios from "axios";
import { BACKEND_URL } from "../config/config";
const api = axios.create({
     baseURL: `${BACKEND_URL}/api`,
    headers: {
        "Content-Type": "application/json",
    },
});

// Attach JWT Token to every request

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;