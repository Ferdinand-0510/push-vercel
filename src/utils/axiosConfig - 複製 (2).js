import axios from 'axios';

const getBaseURL = () => {
    // 生產環境
    if (process.env.NODE_ENV === 'production') {
        return 'https://webtest-api.onrender.com';
    }
    
    // 開發環境
    return 'http://localhost:10000';
};

const api = axios.create({
    baseURL: getBaseURL(),
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000
});

// 請求攔截器
api.interceptors.request.use(
    config => {
        console.log('Request:', config.method.toUpperCase(), config.url);
        return config;
    },
    error => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// 響應攔截器
api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        console.error('API Error:', error);
        const errorMessage = error.response?.data?.message || '發生未知錯誤';
        error.friendlyMessage = errorMessage;
        return Promise.reject(error);
    }
);

export default api;