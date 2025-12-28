import axios from 'axios';

// This checks if there is an environment variable, otherwise falls back to localhost
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3302';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to attach the token if it exists
api.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;