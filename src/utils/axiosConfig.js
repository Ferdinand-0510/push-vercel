import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000',  // Flask 後端地址
  withCredentials: true,  // 重要：允許跨域請求攜帶認證信息
  headers: {
    'Content-Type': 'application/json',
  }
});

export default instance;