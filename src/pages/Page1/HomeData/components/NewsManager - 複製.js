import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2, Save, X } from 'lucide-react';
import './NewsManager.css'

const NewsManager = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const [newItem, setNewItem] = useState({
        title: '',
        content: '',
        date: new Date().toISOString().split('T')[0]
    });

    // 從後端獲取數據
    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await fetch('/api/news');
            const data = await response.json();
            setNewsItems(data);
        } catch (error) {
            console.error('獲取新聞失敗:', error);
        }
    };

    // 新增新聞
    const handleAdd = async () => {
        try {
            const response = await fetch('/api/news', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newItem)
            });
            if (response.ok) {
                fetchNews();
                setNewItem({
                    title: '',
                    content: '',
                    date: new Date().toISOString().split('T')[0]
                });
            }
        } catch (error) {
            console.error('新增失敗:', error);
        }
    };

    // 更新新聞
    const handleUpdate = async (id) => {
        try {
            const response = await fetch(`/api/news/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editingItem)
            });
            if (response.ok) {
                fetchNews();
                setEditingItem(null);
            }
        } catch (error) {
            console.error('更新失敗:', error);
        }
    };

    // 刪除新聞
    const handleDelete = async (id) => {
        if (window.confirm('確定要刪除這則新聞嗎？')) {
            try {
                const response = await fetch(`/api/news/${id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    fetchNews();
                }
            } catch (error) {
                console.error('刪除失敗:', error);
            }
        }
    };

    return (
        <div className="news-manager">
            <h2>最新消息管理</h2>
            
            {/* 新增表單 */}
            <div className="news-form">
                <h3>新增消息</h3>
                <input
                    type="date"
                    value={newItem.date}
                    onChange={(e) => setNewItem({...newItem, date: e.target.value})}
                />
                <input
                    type="text"
                    placeholder="標題"
                    value={newItem.title}
                    onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                />
                <textarea
                    placeholder="內容"
                    value={newItem.content}
                    onChange={(e) => setNewItem({...newItem, content: e.target.value})}
                />
                <button onClick={handleAdd}>
                    <PlusCircle size={16} />
                    新增
                </button>
            </div>

            {/* 新聞列表 */}
            <div className="news-list">
                {newsItems.map(item => (
                    <div key={item.id} className="news-item">
                        {editingItem?.id === item.id ? (
                            // 編輯模式
                            <div className="news-edit-form">
                                <input
                                    type="date"
                                    value={editingItem.date.split('T')[0]}
                                    onChange={(e) => setEditingItem({
                                        ...editingItem,
                                        date: e.target.value
                                    })}
                                />
                                <input
                                    type="text"
                                    value={editingItem.title}
                                    onChange={(e) => setEditingItem({
                                        ...editingItem,
                                        title: e.target.value
                                    })}
                                />
                                <textarea
                                    value={editingItem.content}
                                    onChange={(e) => setEditingItem({
                                        ...editingItem,
                                        content: e.target.value
                                    })}
                                />
                                <div className="button-group">
                                    <button onClick={() => handleUpdate(item.id)}>
                                        <Save size={16} />
                                        保存
                                    </button>
                                    <button onClick={() => setEditingItem(null)}>
                                        <X size={16} />
                                        取消
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // 顯示模式
                            <div className="news-content">
                                <div className="news-date">{new Date(item.date).toLocaleDateString()}</div>
                                <div className="news-title">{item.title}</div>
                                <div className="news-text">{item.content}</div>
                                <div className="button-group">
                                    <button onClick={() => setEditingItem(item)}>
                                        <Edit size={16} />
                                        編輯
                                    </button>
                                    <button onClick={() => handleDelete(item.id)}>
                                        <Trash2 size={16} />
                                        刪除
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsManager;