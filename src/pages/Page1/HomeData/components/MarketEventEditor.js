import React, { useState, useEffect } from 'react';
import api from '../../../../utils/axiosConfig';
import './MarketEventEditor.css';

const MarketEventEditor = () => {
    const [image, setImage] = useState(`/images/MarketData/H.jpg`);
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({
        Title: "",
        MarketCity: "",
        DataRange: "",
        Url: "",
        MarketData: "",
        Note: "",
        MarketAdd: ""
    });
    const [bulkEventText, setBulkEventText] = useState('');
    const [isAddFormVisible, setIsAddFormVisible] = useState(false);
    const [isShowItem, setIsShowItem] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    /*------------------------下拉式選單S---------------------------- */
    const [dataRange, setDataRange] = useState([]); // 儲存 API 返回的數據
    const [selectedValue, setSelectedValue] = useState(''); // 預設選擇值
    const [error, setError] = useState(null); // 錯誤處理
    const [SelectWeek, setSelectWeek] = useState(0);
    const [isAdding, setIsAdding] = useState(false); // 控制是否進入新增模式
    const [newValue, setNewValue] = useState(""); // 控制新增模式的輸入值
    const [newMarketGorup, setNewMarketGorup] = useState({
        DataRange: ""

    });
    /*------------------------下拉式選單E---------------------------- */

    const fetchEvents = async (MG_ID) => {
        try {
            const response = await api.get(`/api/get_market_events?MG_ID=${MG_ID}`);
            console.log("response.data.events:", response.data.events);
            setEvents(response.data.events || []);
        } catch (error) {
            console.error('無法取得市集活動:', error);
        }
    };

    // 當 SelectWeek 改變時，自動更新事件列表
    useEffect(() => {

        if (SelectWeek) {
            fetchEvents(SelectWeek); // 將 SelectWeek 作為 MG_ID 傳入
        } else {
            GetDropdownData()
        }
    }, [SelectWeek]);

    /*------------------------下拉式選單S---------------------------- */

    const GetDropdownData = async () => {
        try {
            const response = await api.get('/api/get_market_MarketGroup');
            //console.log("API返回的完整數據：", response.data);
            if (response.data && response.data.events) {
                const DropdownListData = response.data.events;
                //console.log("第一筆數據結構：", DropdownListData[0]); // 檢查具體的數據結構

                if (DropdownListData.length > 0) {
                    const firstItemId = DropdownListData[0].Id;
                    const firstItemDataRange = DropdownListData[0].DataRange;

                    // 設定預設值
                    setSelectWeek(firstItemId);
                    setSelectedValue(firstItemDataRange);

                    //console.log("第一筆 Id:", firstItemId);
                    //console.log("第一筆 DataRange:", firstItemDataRange);
                }

                setDataRange(DropdownListData);
            }
        } catch (err) {
            console.error("API錯誤：", err);
            setError('無法載入數據，請稍後再試');
        }
    };

    /*------------------------下拉式選單E---------------------------- */

    const parseBulkEvents = (text) => {
        const events = [];
        let currentEvent = {};

        // 將輸入文字按 📌📌📌 分成不同區塊
        const sections = text.split(/📌📌📌/).filter(Boolean);

        sections.forEach((section) => {
            const lines = section.trim().split('\n'); // 將區塊按行分割
            let city = '';

            lines.forEach((line) => {
                line = line.trim();
                if (line) {
                    if (line.includes('📌')) {
                        // 城市資訊
                        city = line.replace(/📌/g, '').trim();
                    } else if (line.includes('🏝️')) {
                        // 市集名稱
                        currentEvent = {
                            MarketCity: city,
                            Title: line.replace('🏝️', '').trim(),
                        };
                    } else if (line.includes('📅')) {
                        // 日期範圍
                        currentEvent.DataRange = line.replace('📅', '').trim();
                    } else if (line.includes('🕐')) {
                        // 市集時間
                        currentEvent.MarketData = line.replace('🕐', '').trim();
                    } else if (line.includes('📃')) {
                        // 備註
                        currentEvent.Note = line.replace('📃', '').trim();
                    } else if (line.includes('👻')) {
                        // 網址
                        currentEvent.Url = line.replace('👻', '').trim();
                    }
                    else if (line.includes('📍')) {
                        // 地址並保存該事件
                        currentEvent.MarketAdd = line.replace('📍', '').trim();
                        events.push({ ...currentEvent }); // 保存事件
                        currentEvent = {}; // 重置
                    }
                }
            });
        });

        return events;
    };


    // 將原本的 fetch 請求改為使用 api
    const handleBulkAdd = async (MG_ID) => {
        console.log("testMG_ID:" , MG_ID)
        const parsedEvents = parseBulkEvents(bulkEventText);
        if (parsedEvents.length === 0) {
            alert('無法解析市集資訊，請確認格式是否正確');
            return;
        }

        try {
            console.log("準備發送批量新增請求", parsedEvents);
            // 使用 api 實例發送請求
            const response = await api.post(`/api/save_bulk_market_events?MG_ID=${MG_ID}`, {
                events: parsedEvents
            });

            setEvents(prev => [...prev, ...response.data.events]);
            setBulkEventText('');
            alert('批量新增市集活動成功！');
        } catch (error) {
            console.error('批量新增錯誤:', error);
            const errorMessage = error.response?.data?.error || error.message || '未知錯誤';
            alert(`批量新增失敗: ${errorMessage}`);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editingEvent) {
            setEditingEvent(prev => ({
                ...prev,
                [name]: value
            }));
        } else {
            setNewEvent(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleAddEvent = async () => {
        if (!newEvent.Title || !newEvent.MarketCity || !newEvent.DataRange) {
            alert('請填寫必要欄位（標題、城市、日期）');
            return;
        }

        try {
            // 使用 api 實例發送 POST 請求
            const response = await api.post('/api/save_market_event', newEvent);

            // 更新事件列表
            setEvents(prev => [...prev, response.data.event]);

            // 清空表單
            setNewEvent({
                Title: "",
                MarketCity: "",
                DataRange: "",
                Url: "",
                MarketData: "",
                Note: "",
                MarketAdd: ""
            });

            // 隱藏新增表單
            setIsAddFormVisible(false);
            setIsShowItem(false);

            alert('活動新增成功！');
        } catch (error) {
            console.error('新增活動錯誤:', error);
            // 根據 error.response 顯示錯誤訊息
            const errorMessage = error.response?.data?.error || error.message || '未知錯誤';
            alert(`新增活動失敗: ${errorMessage}`);
        }
    };

    const handleUpdateEvent = async () => {
        if (!editingEvent.Title || !editingEvent.MarketCity || !editingEvent.DataRange) {
            alert('請填寫必要欄位（標題、城市、日期）');
            return;
        }
        try {
            const response = await api.put(`/api/update_market_event/${editingEvent.Uuid}`, editingEvent);

            setEvents(prev => prev.map(event =>
                event.Uuid === editingEvent.Uuid ? response.data.event : event
            ));
            setEditingEvent(null);
            setIsAddFormVisible(false);
            setIsShowItem(false);
            alert('活動更新成功');
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message || '更新活動失敗';
            alert('更新活動失敗: ' + errorMessage);
        }
    };
    const handleDeleteEvent = async (uuid) => {
        try {
            const response = await api.delete(`/api/delete_market_event/${uuid}`);

            setEvents(prev => prev.filter(event => event.Uuid !== uuid));
            alert('活動刪除成功');
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message || '刪除活動失敗';
            alert('刪除活動失敗: ' + errorMessage);
        }
    };

    const startEditingEvent = (event) => {
        setEditingEvent(event);
        setIsAddFormVisible(true);
    };

    const toggleAddForm = () => {
        if (editingEvent) {
            setEditingEvent(null);
        }
        setIsAddFormVisible(!isAddFormVisible);
    };

    const ShowThisItemForm = () => {
        setIsShowItem(!isShowItem);
    };

    /*------------------------下拉式選單S---------------------------- */
    const handleSelectChange = (event) => {
        // 從 dataRange 陣列中找到對應的選項
        const selectedOption = dataRange.find(item => item.DataRange === event.target.value);

        // 更新選中的值
        setSelectedValue(event.target.value);

        // 使用 Id 而不是 id
        setSelectWeek(selectedOption ? selectedOption.Id : 0);

        console.log("完整選項數據：", selectedOption);
        console.log("選擇的週次 Id:", selectedOption?.Id);
        console.log("選擇的值:", event.target.value);

    };

    const DataRangeButtonClick = () => {
        setIsAdding(true); // 點擊按鈕進入新增模式
    };

    const InputDataRangeChange = (event) => {
        setNewValue(event.target.value);
    };

    const DataRangeCancel = () => {
        // console.log("送出的值：", newValue);
        setIsAdding(false); // 送出後退出新增模式
        setNewValue(""); // 清空輸入框
    };


    
    const changeWebShowData = async (MG_ID) => {
        // 顯示確認提示
        const userConfirmed = window.confirm('確定要修改資料嗎？');
        
        // 如果使用者選擇取消，直接結束函數
        if (!userConfirmed) {
            return;
        }
    
        try {
            // 使用 api 實例發送 POST 請求
            const response = await api.post(`/api/alterWebShowData?MG_ID=${MG_ID}`);
            
            // 提示修改成功
            alert('修改成功！');
        } catch (error) {
            console.error('新增錯誤:', error);
    
            // 顯示後端返回的錯誤詳細訊息
            const errorMessage = error.response?.data?.details || error.message || '未知錯誤';
            alert(`修改失敗: ${errorMessage}`);
        }
    };
    
    

    //修改前端顯示的資料是哪個日期區間
    const AddMarketGroup = async () => {
        if (!newValue) {
            alert('請填寫必要欄位（標題、城市、日期）');
            return;
        }
    
        try {
            // 使用 api 實例發送 POST 請求
            const response = await api.post('/api/InsertMarketGroup', { DataRange: newValue });
    
            // 更新事件列表
            setEvents((prev) => [...prev, response.data.event]);
    
            // 清空表單
            setNewMarketGorup({
                DataRange: ""
            });
            await GetDropdownData();
            setIsAdding(false); // 送出後退出新增模式
            setNewValue(""); // 清空輸入框
            alert('活動新增成功！');
        } catch (error) {
            console.error('新增錯誤:', error);
            // 顯示後端返回的錯誤詳細訊息
            const errorMessage = error.response?.data?.details || error.message || '未知錯誤';
            alert(`新增失敗: ${errorMessage}`);
        }
    };
    
    /*------------------------下拉式選單E---------------------------- */

    return (
        <div className="container">

            <div className="dropdown-container">
                        {isAdding ? (
                            // 新增模式的內容
                            <div className="add-mode">
                                <p>新增：</p>
                                <input
                                    type="text"
                                    value={newValue}
                                    onChange={InputDataRangeChange}
                                    placeholder="輸入新值"
                                    className="input"
                                />
                            <div className="button-group">
                                <button onClick={AddMarketGroup} className="MEbutton">
                                    送出
                                </button>
                                <button onClick={DataRangeCancel} className="MEbutton">
                                    取消
                                </button>
                            </div>


                            </div>
                        ) : (
                            // 下拉選單模式的內容
                            <div className="dropdown-row">
                                <label htmlFor="market-dropdown" className="dropdown-label">
                                    選擇市集活動：
                                </label>
                                <select
                                    id="market-dropdown"
                                    className="custom-dropdown"
                                    value={selectedValue}
                                    onChange={handleSelectChange}
                                >
                                    <option value="" disabled>
                                        請選擇
                                    </option>
                                    {dataRange.map((item) => (
                                        <option key={item.id} value={item.DataRange}>
                                            {item.DataRange}
                                        </option>
                                    ))}
                                </select>
                                <button onClick={DataRangeButtonClick} className="MEbutton">
                                    新增
                                </button>
                                <button onClick={() => changeWebShowData(SelectWeek)}className="MEbutton">
                                    前端顯示
                                </button>

                            </div>

                        )}

                        {selectedValue && !isAdding &&(
                                    <p className="selected-value">你選擇的是：{selectedValue}</p>
                                )}
                    </div>
                    
            <div>

            </div>
            <div>
                <button
                    className={`MEbutton add-event-button ${isAddFormVisible ? 'close-button-active' : ''}`}
                    onClick={toggleAddForm}
                >
                    {isAddFormVisible ? 'x 縮回市集活動' : '+ 新增市集活動'}
                </button>
            </div>



            <div className={`add-form-wrapper ${isAddFormVisible ? 'visible' : ''}`}>
                <div className="card">
                    <h2>{editingEvent ? '編輯全部市集' : '新增全部市集'}</h2>
                    <div>
                        <label className="label">批量新增市集活動</label>
                        <textarea
                            className="input bulk-input"
                            value={bulkEventText}
                            onChange={(e) => setBulkEventText(e.target.value)}
                            placeholder="請輸入格式化的市集資訊..."
                            rows={10}
                            style={{
                                width: '100%',
                                minHeight: '200px',
                                marginBottom: '10px'
                            }}
                        />
                        <button
                            className="MEbutton"
                            onClick={() => handleBulkAdd(SelectWeek)}
                        >
                            批量新增市集
                        </button>
                    </div>

                    <h2>{editingEvent ? '編輯市集活動' : '新增市集活動'}
                        <button
                            className="close-button"
                            onClick={toggleAddForm}
                            style={{ float: 'right', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>
                            ✕
                        </button>
                    </h2>
                    <div>
                        <label className="label">市集名稱</label>
                        <input
                            className="input"
                            name="Title"
                            value={editingEvent ? editingEvent.Title : newEvent.Title}
                            onChange={handleInputChange}
                            placeholder="例：台北市集"
                        />
                    </div>
                    <div>
                        <label className="label">市集城市</label>
                        <input
                            className="input"
                            name="MarketCity"
                            value={editingEvent ? editingEvent.MarketCity : newEvent.MarketCity}
                            onChange={handleInputChange}
                            placeholder="例：台北市"
                        />
                    </div>
                    <div>
                        <label className="label">市集地址</label>
                        <input
                            className="input"
                            name="MarketAdd"
                            value={editingEvent ? editingEvent.MarketAdd : newEvent.MarketAdd}
                            onChange={handleInputChange}
                            placeholder="例：台北市"
                        />
                    </div>
                    <div>
                        <label className="label">日期範圍</label>
                        <input
                            className="input"
                            name="DataRange"
                            value={editingEvent ? editingEvent.DataRange : newEvent.DataRange}
                            onChange={handleInputChange}
                            placeholder="例：11/22-24"
                        />
                    </div>
                    <div>
                        <label className="label">市集時間</label>
                        <input
                            className="input"
                            name="MarketData"
                            value={editingEvent ? editingEvent.MarketData : newEvent.MarketData}
                            onChange={handleInputChange}
                            placeholder="例：10:00-19:00"
                        />
                    </div>
                    <div>
                        <label className="label">市集網址</label>
                        <input
                            className="input"
                            name="Url"
                            value={editingEvent ? editingEvent.Url : newEvent.Url}
                            onChange={handleInputChange}
                            placeholder="例：https://taipei-market.com"
                        />
                    </div>
                    <div>
                        <label className="label">備註</label>
                        <input
                            className="input"
                            name="Note"
                            value={editingEvent ? editingEvent.Note : newEvent.Note}
                            onChange={handleInputChange}
                            placeholder="選填"
                        />
                    </div>
                    <button
                        className="MEbutton"
                        onClick={editingEvent ? handleUpdateEvent : handleAddEvent}
                    >
                        {editingEvent ? '更新市集活動' : '新增市集活動'}
                    </button>
                </div>
            </div>


            <div className="card">
                <h2>市集活動列表</h2>
                {events.map((event) => (
                    <div key={event.Uuid} className="eventCard">
                        <div className="eventHeader">
                            <div className='eventbox-item'>
                                <p>🏙️ {event.MarketCity}</p>
                                <p>🏝️ {event.Title}</p>
                                <p>📅 {event.DataRange}</p>
                                {event.MarketData && <p>⏰ {event.MarketData}</p>}
                                <p>📍 {event.MarketAdd}</p>
                                {event.Url && <p>🔗 {event.Url}</p>}
                                {event.Note && <p>📝 {event.Note}</p>}
                            </div>
                            <div className='eventbox-button'>
                                <button
                                    className="editButton MEbutton"
                                    onClick={() => startEditingEvent(event)}
                                >
                                    編輯
                                </button>
                                <button
                                    className="deleteButton"
                                    onClick={() => handleDeleteEvent(event.Uuid)}
                                >
                                    刪除
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    );
};

export default MarketEventEditor;