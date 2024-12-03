//C:\類D槽\Python\StockWeb\webtest\src\components\TitleImg.js

import React from 'react';
import './TitleImg.css';

function TitleImg() {
    return (
        <div className="image-container">
            <img src="/images/market.jpg" alt="Title Image" className="title-image" />
            <div className="homeoverlay">
                <p className="TitleImg-text">歡迎瀏覽</p>
                <p className="TitleImg-text">這裡是活動大詮</p>
            </div>
        </div>
    );
}
export default TitleImg;