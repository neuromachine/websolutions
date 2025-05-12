import axios from 'axios';

const api = axios.create({
    baseURL: 'http://wspro/api',
    withCredentials: false,
    headers: {
        'Accept': 'application/json',
        // 'Authorization': `Bearer ${token}` // если нужен токен
    }
});

export default api;