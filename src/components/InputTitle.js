// ProductData/index.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InputTitle.css'

function InputTitle() {
    const [inputData, setInputData] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    // 初次載入時向後端請求資料
    useEffect(() => {
        async function fetchTitle() {
            try {
                const response = await axios.get('http://localhost:5000/api/get_title');
                setInputData(response.data.Title || ''); // 設定初始值
            } catch (error) {
                setResponseMessage(error.response?.data?.error || '無法取得初始資料');
            }
        }
        fetchTitle();
    }, []);

    function handleInputChange(e){
        setInputData(e.target.value)
    }

    async function handleSubmit() {
        if (!inputData.trim()) {
            setResponseMessage('請輸入標題');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/save_HomeData', {
                Title: inputData,
                CustomerUuid: 'example-customer-uuid',
                TitleImg: '',
                Title_Status: 1
            });
            setResponseMessage(response.data.message || '操作成功');
            setShowMessage(true); // 顯示訊息
        } catch (error) {
            setResponseMessage(error.response?.data?.error || '發生錯誤');
        }
    }

    return (
        <div className="InputTitleinput-group">
            <h1>圖片標題</h1>
            <input
                    className="InputTitleinput-box"
                    type="text"
                    value={inputData}
                    onChange={handleInputChange}
                    placeholder="輸入標題"
                />
            <div className='InputTitle-btn-input'>

                <button className="InputTitlesubmit-button" onClick={handleSubmit}>send</button>
                <a className={`red-message ${showMessage ? 'visible' : 'hidden'}`}>修改成功: {responseMessage}</a>
            </div>
            
            

        </div>
    );
}

export default InputTitle;


