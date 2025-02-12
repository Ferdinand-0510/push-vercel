import React, { useState } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './index.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const success = await login(username, password);
      if (success) {
        navigate('/page1');
      } else {
        setError('用戶名或密碼錯誤');
      }
    } catch (error) {
      setError('登入失敗，請稍後再試');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>登入</h2>
        {error && <div className="error">{error}</div>}
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="用戶名"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="密碼"
          />
        </div>
        <button type="submit">登入</button>
        <div className="register-link">
          還沒有帳號？ <Link to="/register">立即註冊</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;