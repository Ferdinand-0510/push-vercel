import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2, Save, X ,ChevronDown} from 'lucide-react';
import './NewsManager.css';
import axios from 'axios';

const NewsManager = () => {
    const [isFormExpanded, setIsFormExpanded] = useState(false);
    const [newsData, setNewsData] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [newItem, setNewItem] = useState({
        title: '',
        content: '',
        publishDate: new Date().toISOString().split('T')[0],
        status: 1,  // 1: 發布, 0: 未發布
        immediatePublish: true  // 是否立即發布
    });

    // 獲取新聞列表
    const fetchNews = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/get_HomeNews');
            if (response.data && Array.isArray(response.data.news)) {
                setNewsData(response.data.news);
            } else {
                setResponseMessage('數據格式不正確');
            }
        } catch (error) {
            console.error('獲取新聞錯誤:', error);
            setResponseMessage(error.response?.data?.error || '無法取得資料');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

// 新增新聞
const handleAdd = async () => {
    try {
        // 驗證必填欄位
        if (!newItem.title || !newItem.content) {
            setResponseMessage('標題和內容為必填項目');
            return;
        }

        let publishDate;
        if (newItem.immediatePublish) {
            publishDate = new Date().toISOString();
        } else {
            // 確保選擇了日期
            if (!newItem.publishDate) {
                setResponseMessage('請選擇發布日期');
                return;
            }
            // 將日期字符串轉換為完整的 ISO 格式
            publishDate = new Date(newItem.publishDate).toISOString();
        }

        const newsData = {
            title: newItem.title,
            content: newItem.content,
            publishDate: publishDate,
            status: newItem.immediatePublish ? 1 : 0
        };

        console.log('準備發送的新聞數據:', newsData); // 調試用

        const response = await axios.post('http://localhost:5000/api/add_news', newsData);
        if (response.data.success) {
            fetchNews();  // 重新獲取新聞列表
            setNewItem({  // 重置表單
                title: '',
                content: '',
                publishDate: new Date().toISOString().split('T')[0],
                status: 1,
                immediatePublish: true
            });
            setResponseMessage('新增成功');
        }
    } catch (error) {
        console.error('新增新聞失敗:', error);
        setResponseMessage('新增失敗：' + (error.response?.data?.message || '未知錯誤'));
    }
};

    const handleUpdate = async (id) => {
        try {
            // 確保日期格式正確
            const formattedDate = editingItem.Publish_Date 
                ? new Date(editingItem.Publish_Date).toISOString()
                : new Date().toISOString();
    
            const updateData = {
                Title: editingItem.Title,
                Content: editingItem.Content,
                Publish_Date: formattedDate,
                Status: editingItem.Status || 1
            };
    
            console.log('發送更新數據:', updateData);  // 調試用
    
            const response = await axios.put(
                `http://localhost:5000/api/update_news/${id}`, 
                updateData
            );
    
            if (response.data.success) {
                fetchNews();
                setEditingItem(null);
                setResponseMessage('更新成功');
            }
        } catch (error) {
            console.error('更新新聞失敗:', error);
            setResponseMessage('更新失敗：' + (error.response?.data?.message || '未知錯誤'));
        }
    };

// 刪除新聞
const handleDelete = async (id) => {
    if (window.confirm('確定要刪除這則新聞嗎？')) {
        try {
            setResponseMessage(''); // 清除之前的消息
            
            console.log('嘗試刪除新聞 ID:', id); // 調試用
            
            const response = await axios.delete(`http://localhost:5000/api/delete_news/${id}`);
            
            if (response.data.success) {
                console.log('刪除成功');
                setResponseMessage('刪除成功');
                await fetchNews(); // 重新獲取新聞列表
            } else {
                throw new Error(response.data.message || '刪除失敗');
            }
        } catch (error) {
            console.error('刪除新聞失敗:', error);
            setResponseMessage(
                '刪除失敗：' + 
                (error.response?.data?.message || error.message || '未知錯誤')
            );
        }
    }
};

    if (loading) return <div>載入中...</div>;

    // 將新聞分類
    const publishedNews = newsData.filter(news => news.Status === 1);
    const unpublishedNews = newsData.filter(news => news.Status === 0);


    return (
        <div className="news-manager">
            <div className={`news-form ${isFormExpanded ? 'expanded' : 'collapsed'}`}>
                <div
                    className="news-form-header"
                    onClick={() => setIsFormExpanded(!isFormExpanded)}
                >
                    <h3>新增消息</h3>
                    <ChevronDown
                        className={`toggle-icon ${isFormExpanded ? 'rotated' : ''}`}
                        size={20}
                    />
                </div>
                
                <div className={`news-form-content ${isFormExpanded ? 'visible' : ''}`}>
                    <input
                        type="text"
                        placeholder="標題"
                        value={newItem.title}
                        onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                        required
                    />
                    <textarea
                        placeholder="內容"
                        value={newItem.content}
                        onChange={(e) => setNewItem({...newItem, content: e.target.value})}
                        required
                    />
                    <div className="publish-options">
                        <label>
                            <input
                                type="checkbox"
                                checked={newItem.immediatePublish}
                                onChange={(e) => setNewItem({
                                    ...newItem,
                                    immediatePublish: e.target.checked,
                                    status: e.target.checked ? 1 : 0
                                })}
                            />
                            立即發布
                        </label>
                        {!newItem.immediatePublish && (
                            <div className="date-time-picker">
                                <input
                                    type="datetime-local"
                                    value={newItem.publishDate}
                                    onChange={(e) => setNewItem({
                                        ...newItem,
                                        publishDate: e.target.value
                                    })}
                                    min={new Date().toISOString().slice(0, 16)}
                                />
                            </div>
                        )}
                    </div>
                    <button onClick={handleAdd} className="add-button">
                        <PlusCircle size={16} />
                        新增
                    </button>
                </div>
            </div>

    {responseMessage && (
                <div className='response-container'>
                    <div className="response-message">
                        {responseMessage}
                    </div>
                </div>
    )}


            <div className='news-ReleaseOrNot'>
                {/* 發布中的新聞 */}
                <div className="news-section">
                    <h3>發布中的新聞</h3>
                    <div className="news-list">
                        {publishedNews.map(item => (
                            <NewsItem
                                key={item.Id}
                                item={item}
                                onEdit={setEditingItem}
                                onUpdate={handleUpdate}
                                onDelete={handleDelete}
                                editingItem={editingItem}
                                setEditingItem={setEditingItem}
                            />
                        ))}
                    </div>
                </div>

                {/* 未發布的新聞 */}
                <div className="news-section">
                    <h3>未發布的新聞</h3>
                    <div className="news-list">
                        {unpublishedNews.map(item => (
                            <NewsItem
                                key={item.Id}
                                item={item}
                                onEdit={setEditingItem}
                                onUpdate={handleUpdate}
                                onDelete={handleDelete}
                                editingItem={editingItem}
                                setEditingItem={setEditingItem}
                            />
                        ))}
                    </div>
                </div>
            </div>
            


        </div>
    );
};

// 新聞項目組件
const NewsItem = ({ item, onEdit, onUpdate, onDelete, editingItem, setEditingItem }) => {
    const isEditing = editingItem?.Id === item.Id;
    const [deleting, setDeleting] = useState(false);

    const handleDateChange = (e) => {
        const dateValue = e.target.value;
        setEditingItem({
            ...editingItem,
            Publish_Date: dateValue ? new Date(dateValue).toISOString() : null
        });
    };
    const handleDeleteClick = async (id) => {
        setDeleting(true);
        try {
            await onDelete(id);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className={`news-item ${item.Status === 0 ? 'unpublished' : ''} ${deleting ? 'deleting' : ''}`}>
            {isEditing ? (
                <div className="news-edit-form">
                    <input
                        type="text"
                        value={editingItem.Title}
                        onChange={(e) => setEditingItem({
                            ...editingItem,
                            Title: e.target.value
                        })}
                    />
                    <textarea
                        value={editingItem.Content}
                        onChange={(e) => setEditingItem({
                            ...editingItem,
                            Content: e.target.value
                        })}
                    />
                    <input
                        type="datetime-local"
                        value={editingItem.Publish_Date 
                            ? new Date(editingItem.Publish_Date).toISOString().slice(0, 16)
                            : ''
                        }
                        onChange={handleDateChange}
                    />
                    <select
                        value={editingItem.Status}
                        onChange={(e) => setEditingItem({
                            ...editingItem,
                            Status: parseInt(e.target.value)
                        })}
                    >
                        <option value={1}>發布</option>
                        <option value={0}>未發布</option>
                    </select>
                    <div className="button-group">
                        <button onClick={() => onUpdate(item.Id)}>
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
                <div className="news-content">
                    <h4>{item.Title}</h4>
                    <p>{item.Content}</p>
                    <p className="news-date">
                        發布時間: {new Date(item.Publish_Date).toLocaleString()}
                    </p>
                    <div className="button-group">
                        <button onClick={() => onEdit(item)}>
                            <Edit size={16} />
                            編輯
                        </button>
                        <button 
                            onClick={() => handleDeleteClick(item.Id)}
                            disabled={deleting}
                        >
                            <Trash2 size={16} />
                            {deleting ? '刪除中...' : '刪除'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewsManager;