import React, { useState } from 'react';
import axios from '../../../../utils/axiosConfig';
import './InputImg.css';

function InputImg() {
    const [image, setImage] = useState(`/images/market.jpg`);
    const [showModal, setShowModal] = useState(false);
    const [fileInput, setFileInput] = useState(null);
    const [timestamp, setTimestamp] = useState(Date.now()); // 添加時間戳狀態

    // 處理圖片上傳
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                // 創建 FormData
                const formData = new FormData();
                formData.append('file', file);
                formData.append('Title', 'HomeTitle');
                formData.append('TitleImg', file.name);
                formData.append('Title_Status', '1');
                console.log("test")
                // 發送請求到後端
                const response = await axios.post('/api/Change_HomeImg', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.data.success) {
                    // 更新時間戳來強制重新加載圖片
                    setTimestamp(Date.now());
                    // 使用新的時間戳更新圖片URL
                    setImage(`/images/market.jpg?t=${Date.now()}`);
                    alert('圖片上傳成功！');
                } else {
                    throw new Error(response.data.message || '上傳失敗');
                }
            } catch (error) {
                console.error('上傳失敗:', error);
                alert('上傳失敗: ' + (error.response?.data?.error || error.message));
            }
        }
    };

    // 觸發檔案選擇
    const handleButtonClick = () => {
        if (fileInput) {
            fileInput.click();
        }
    };

    // 構建帶有時間戳的圖片URL
    const getImageUrl = () => `${image}?t=${timestamp}`;

    return (
        <div className="Backstageinput-img-container">
            <div className="Backstageimage-container">
                <img 
                    src={getImageUrl()} 
                    alt="Title Image" 
                    className="Backstagetitle-image" 
                    onClick={() => setShowModal(true)}
                />
                <div className="image-overlay">
                    <input
                        type="file"
                        ref={setFileInput}
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                    />
                    <button 
                        className="change-image-btn"
                        onClick={handleButtonClick}
                    >
                        更換圖片
                    </button>
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <span className="close-btn" onClick={() => setShowModal(false)}>
                            &times;
                        </span>
                        <img src={getImageUrl()} alt="預覽" className="modal-image" />
                    </div>
                </div>
            )}
        </div>
    );
}

export default InputImg;