//C:\類D槽\Python\StockWeb\webtest\src\context\AuthContext.js
// 1. 導入必要的 React Hooks 和 axios
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// 2. 創建一個新的 Context
const AuthContext = createContext(null);

// 3. 配置 axios 實例
const api = axios.create({
  baseURL: 'http://localhost:10000',  // 設置API基礎URL
  withCredentials: true,             // 允許跨域請求攜帶cookie
  headers: {
    'Content-Type': 'application/json'  // 設置請求頭
  }
});

// 4. 創建 AuthProvider 組件
export const AuthProvider = ({ children }) => {
  // 5. 定義狀態
  const [user, setUser] = useState(null);        // 存儲用戶信息
  const [loading, setLoading] = useState(true);  // 加載狀態

  // 6. 檢查session狀態的函數
  const checkSession = async () => {
    try {
      // 向後端發送請求檢查session
      const response = await api.get('/api/check-session');
      if (response.data.loggedIn) {
        setUser(response.data.user);  // 如果已登入，設置用戶信息
      }
    } catch (error) {
      console.error('Session檢查失敗:', error);
    } finally {
      setLoading(false);  // 無論成功失敗都結束加載狀態
    }
  };

  // 7. 組件掛載時檢查session
  useEffect(() => {
    checkSession();
  }, []);

  // 8. 註冊函數
  const register = async (userData) => {
    try {
      // 發送註冊請求
      const response = await api.post('/api/register', {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        phone: userData.phone,
        customerUuid: userData.customerUuid || 'default-uuid'
      });

      // 處理註冊響應
      if (response.data.success) {
        return {
          success: true,
          message: '註冊成功'
        };
      }
      return {
        success: false,
        message: response.data.message
      };
    } catch (error) {
      // 錯誤處理
      console.error('註冊失敗:', error);
      return {
        success: false,
        message: error.response?.data?.message || '註冊失敗，請稍後再試'
      };
    }
  };

  // 9. 登入函數
  const login = async (username, password) => {
    try {
      // 發送登入請求
      const response = await api.post('/api/login', {
        username,
        password
      });

      // 處理登入響應
      if (response.data.success) {
        setUser(response.data.user);  // 設置用戶狀態
        return true;
      }
      return false;
    } catch (error) {
      console.error('登入失敗:', error);
      return false;
    }
  };

  // 10. 登出函數
  const logout = async () => {
    try {
      // 發送登出請求
      await api.post('/api/logout');
      setUser(null);  // 清除用戶狀態
    } catch (error) {
      console.error('登出失敗:', error);
    }
  };

  // 11. 加載狀態處理
  if (loading) {
    return <div>Loading...</div>;
  }

  // 12. 提供 Context 值
  return (
    <AuthContext.Provider value={{ 
      user,                // 用戶信息
      login,              // 登入函數
      logout,             // 登出函數
      register,           // 註冊函數
      loading,            // 加載狀態
      isAuthenticated: !!user,  // 是否已認證
      api                 // API實例
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// 13. 創建自定義 Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  // 確保 Hook 在 Provider 內使用
  if (!context) {
    throw new Error('useAuth必須在AuthProvider內使用');
  }
  return context;
};