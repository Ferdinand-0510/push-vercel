import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './index.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    customerUuid: 'default-uuid' // 這裡需要根據實際情況設置
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { api } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 基本驗證
    if (formData.password !== formData.confirmPassword) {
      setError('密碼不匹配');
      return;
    }

    try {
      const response = await api.post('/api/register', formData);
      if (response.data.success) {
        navigate('/login');
      }
    } catch (error) {
      setError(error.response?.data?.message || '註冊失敗，請稍後再試');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>註冊</h2>
        {error && <div className="error">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="username">用戶名</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">電子郵件</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">密碼</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">確認密碼</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">電話（選填）</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <button type="submit">註冊</button>
      </form>
    </div>
  );
};

export default Register;