import axios from 'axios';

const getBaseURL = () => {
    // 生產環境
    if (process.env.NODE_ENV === 'production') {
        return 'https://webtest-api.onrender.com';
    }
    
    // 開發環境
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    
    // 如果是使用 IP 地址訪問
    if (/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(hostname)) {
        return `${protocol}//${hostname}:10000`;
    }
    
    // 本地開發
    return 'http://localhost:10000';
};

const api = axios.create({
    baseURL: getBaseURL(),
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000  // 10 秒超時
});

// 請求攔截器
api.interceptors.request.use(
    config => {
        // 調試信息
        console.log('Request URL:', config.url);
        console.log('Request Method:', config.method);
        
        // 如果是本地開發時訪問 IP 地址，確保使用正確的協議
        if (config.url.includes('192.168.')) {
            config.url = config.url.replace('http://', window.location.protocol + '//');
        }
        
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
        // 調試信息
        console.log('Response Status:', response.status);
        console.log('Response Data:', response.data);
        return response;
    },
    error => {
        console.error('API Error:', error);
        
        // 詳細的錯誤信息
        if (error.response) {
            console.error('Error Status:', error.response.status);
            console.error('Error Data:', error.response.data);
            console.error('Error Headers:', error.response.headers);
        } else if (error.request) {
            console.error('No Response Received:', error.request);
        } else {
            console.error('Error Config:', error.config);
        }
        
        // 根據錯誤類型返回友好的錯誤信息
        const errorMessage = error.response?.data?.message 
            || error.response?.data?.error 
            || error.message 
            || '發生未知錯誤';
            
        error.friendlyMessage = errorMessage;
        
        return Promise.reject(error);
    }
);

export default api;