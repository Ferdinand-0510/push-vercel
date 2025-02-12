// ProductData/index.js
import React, { useState, useCallback } from 'react';
import './index.css';


function ProductData() {
    const [inputData, setinputData] = useState('')
    const [titleData, settitleData] = useState('')
    function GetTitleData(e){
        setinputData(e.target.value);
    }

    function SetTitleData(e) {
        settitleData(inputData)
    }


    return (
        <div className="input-container">
            <div className="input-group">
                <h1>商品管理</h1>
                <input className="input-box" type="text" value={inputData} onChange={GetTitleData} placeholder="輸入標題" />
                <button className="submit-button" onClick={SetTitleData}>send</button>
                <a>顯示內容: {titleData}</a>
            </div>
        </div>
    );
}

export default ProductData;
