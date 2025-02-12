

// C:\類D槽\Python\StockWeb\webtest\src\pages\Page1\HomeData\components\Data

import React, { useEffect, useState } from 'react';
import { Edit2,Trash , Save, Plus, RefreshCw } from 'lucide-react';
import './Data.css';
import axios from 'axios';

function Data() {
    const [loginKeyData, setLoginKeyData] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [isAdding, setIsAdding] = useState(false);
    const [isLoading, setIsLoading] = useState(true);  // 添加載入狀態

    const [newItem, setNewItem] = useState({
        Name: '',
        Description: ''
    });

    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        console.log('Component mounted');
        fetchData();
    }, []);

    useEffect(() => {
        console.log('loginKeyData updated:', loginKeyData);
        console.log('isLoading:', isLoading);
    }, [loginKeyData, isLoading]);
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/get_loginkey');
            console.log('API Response:', response.data);
            
            // 確保 response.data 是陣列
            const dataArray = Array.isArray(response.data) ? response.data : [response.data];
            
            // 過濾掉可能的 null 或 undefined 值
            const validData = dataArray.filter(item => item != null);
            
            setLoginKeyData(validData);
            console.log('Processed Data:', validData); // 添加這行來檢查處理後的數據
        } catch (error) {
            console.error('獲取資料失敗:', error);
            setLoginKeyData([]);
        } finally {
            setIsLoading(false); // 確保這行一定會執行
        }
    };

    // 生成隨機 LoginKey
    const generateLoginKey = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 20; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    };

    const handleEdit = (item) => {
        setEditingId(item.Id);
        setEditForm(item);
    };
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/delete_loginkey/${id}`);
            // 刪除成功後可以刷新頁面或重新載入數據
            fetchData();
        } catch (error) {
            console.error(error);
        }
    };
    
    const handleSave = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/update_loginkey/${id}`, editForm);
            setEditingId(null);
            fetchData();
        } catch (error) {
            console.error('更新失敗:', error);
        }
    };

    const handleAdd = async () => {
        try {
            const itemToAdd = {
                ...newItem,
                LoginKey: generateLoginKey()
            };
            await axios.post('http://localhost:5000/api/add_loginkey', itemToAdd);
            setIsAdding(false);
            setNewItem({ Name: '', Description: '' });
            fetchData();
        } catch (error) {
            console.error('新增失敗:', error);
        }
    };

    return (
        <div className="login-key-manager">
            <div className="header">
                <h2>登入金鑰管理</h2>
                <button className="add-button" onClick={() => setIsAdding(true)}>
                    <Plus size={16} />
                    新增金鑰
                </button>
            </div>

            {isAdding && (
                <div className="add-form">
                    <input
                        type="text"
                        placeholder="名稱"
                        value={newItem.Name}
                        onChange={(e) => setNewItem({...newItem, Name: e.target.value})}
                    />
                    <input
                        type="text"
                        placeholder="描述"
                        value={newItem.Description}
                        onChange={(e) => setNewItem({...newItem, Description: e.target.value})}
                    />
                    <label></label>
                    <div className="button-group">
                        <button className="save-button" onClick={handleAdd}>
                            <Save size={16} />
                            確認新增
                        </button>
                        <button className="cancel-button" onClick={() => setIsAdding(false)}>
                            取消
                        </button>
                    </div>
                </div>
            )}


        {isLoading ? (
            <div className="loading">載入中...</div>
        ) : loginKeyData && loginKeyData.length > 0 ? (
            <div className="data-grid">
                {loginKeyData.map((item) => (
                    <div key={item.Id} className="data-row">
                        {editingId === item.Id ? (
                            <div className="edit-form">
                                <label>名稱:</label>
                                <input
                                    type="text"
                                    value={editForm.Name}
                                    onChange={(e) => setEditForm({...editForm, Name: e.target.value})}
                                />
                                <label>描述:</label>
                                
                                <input
                                    type="text"
                                    value={editForm.Description}
                                    onChange={(e) => setEditForm({...editForm, Description: e.target.value})}
                                />
                                <label></label>
                                <div className="button-group">
                                    <button className="save-button" onClick={() => handleSave(item.Id)}>
                                        <Save size={16} />
                                        保存
                                    </button>
                                    <button className="cancel-button" onClick={() => setEditingId(null)}>
                                        取消
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="data-content">
                                <div className="data-field">
                                    <span className="label">ID:</span>
                                    <span>{item.Id}</span>
                                </div>
                                <div className="data-field">
                                    <span className="label">UUID:</span>
                                    <span>{item.Uuid}</span>
                                </div>
                                <div className="data-field">
                                    <span className="label">名稱:</span>
                                    <span>{item.Name}</span>
                                </div>
                                <div className="data-field">
                                    <span className="label">LoginKey:</span>
                                    <span>{item.LoginKey}</span>
                                </div>
                                <div className="data-field">
                                    <span className="label">描述:</span>
                                    <span>{item.Description}</span>
                                </div>
                                <div className="data-field">
                                    <span className="label">創建時間:</span>
                                    <span>{new Date(item.CreatedAt).toLocaleString()}</span>
                                </div>
                                <button className="edit-button" onClick={() => handleEdit(item)}>
                                    <Edit2 size={16} />
                                    編輯
                                </button>
                                <button  className="delete-button" onClick={() => handleDelete(item.Id)}>
                                    <Trash  size={16} />
                                    刪除
                                </button>

                            </div>
                        )}
                    </div>
                ))}
            </div>
        ) : (
            <div className="no-data">沒有資料</div>
        )}



            
        </div>
    );
}

export default Data;