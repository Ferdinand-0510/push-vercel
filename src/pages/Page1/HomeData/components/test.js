import React, { useState, useEffect } from 'react';
import api from '../../../../utils/axiosConfig';
import './test.css';

const TestDropdown = () => {
    const [dataRange, setDataRange] = useState([]); // 儲存 API 返回的數據
    const [selectedValue, setSelectedValue] = useState(''); // 預設選擇值
    const [error, setError] = useState(null); // 錯誤處理

    // 從 API 獲取數據
    useEffect(() => {
        const GetDropdownData = async () => {
            try {
                const response = await api.get('/api/get_market_MarketGroup');
                if (response.data && response.data.events) {
                    const DropdownListData = response.data.events;

                    // 如果返回的資料不為空，將第一筆設為預設值
                    if (DropdownListData.length > 0) {
                        setSelectedValue(DropdownListData[0].DataRange);
                    }

                    setDataRange(DropdownListData);
                }
            } catch (err) {
                setError('無法載入數據，請稍後再試');
            }
        };

        GetDropdownData();
    }, []);

    // 處理選擇變更
    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <div className="dropdown-container">
            {error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div className="dropdown-row">
                    <label htmlFor="market-dropdown" className="dropdown-label">
                        選擇市集活動：
                    </label>
                    <select
                        id="market-dropdown"
                        className="custom-dropdown"
                        value={selectedValue} // 設定下拉選單的預設值
                        onChange={handleSelectChange}
                    >
                        {dataRange.map((item) => (
                            <option key={item.id} value={item.DataRange}>
                                {item.DataRange}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            {selectedValue && <p className="selected-value">你選擇的是：{selectedValue}</p>}
        </div>
    );
};

export default TestDropdown;
