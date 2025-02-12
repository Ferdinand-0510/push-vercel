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
                <p className="TitleImg-smailtext">一個喜歡去市集、活動、展覽的人 無聊整理的，如果覺得不錯</p>
                <p className="TitleImg-smailtext">可以追蹤及按讚以表支持</p>
            </div>
        </div>
    );
}
export default TitleImg;