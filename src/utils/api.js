import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: false,
    headers: {
        'Accept': 'application/json',
        // 'Authorization': `Bearer ${token}` // если нужен токен
    }
});

export default api;