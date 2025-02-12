// ProductData/index.js
import React, { useState, useEffect } from 'react';
import api from '../../../../utils/axiosConfig';
import './InputTitle.css'

function InputTitle() {
    const [inputData, setInputData] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    // 修改 useEffect 中的請求
    useEffect(() => {
        async function fetchTitle() {
            try {
                const response = await api.get('/api/get_title');
                setInputData(response.data.Title || '');
            } catch (error) {
                setResponseMessage(error.friendlyMessage || '無法取得初始資料');
            }
        }
        fetchTitle();
    }, []);

    function handleInputChange(e){
        setInputData(e.target.value)
    }

    // 修改 handleSubmit 中的請求
    async function handleSubmit() {
        if (!inputData.trim()) {
            setResponseMessage('請輸入標題');
            return;
        }

        try {
            const response = await api.post('/api/save_HomeData', {
                Title: inputData,
                CustomerUuid: 'example-customer-uuid',
                TitleImg: '',
                Title_Status: 1
            });
            setResponseMessage(response.data.message || '操作成功');
            setShowMessage(true);
        } catch (error) {
            setResponseMessage(error.friendlyMessage || '發生錯誤');
        }
    }
    return (
        <div className="InputTitleinput-group">
            {/* <h1>圖片標題</h1> */}
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


