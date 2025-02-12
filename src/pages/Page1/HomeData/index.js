// ProductData/index.js
import React, { useState, useCallback } from 'react';

import InputTitle from "./components/InputTitle"
import InputImg from "./components/InputImg"
import DorpDownLisk from "./components/DorpDownLisk"
import CarouselBox from "./components/CarouselBox"
import NewList from "./components/NewList"
import MarketEventEditor from "./components/MarketEventEditor"  // �s�W�o��
import NewsManager from "./components/NewsManager" 
import TEST from "./components/test" 
import './index.css'
function HomeData() {


    const [expandedModule, setExpandedModule] = useState('title'); // 預設展開 'title' 模組

    const toggleModule = (moduleName) => {
        if (expandedModule === moduleName) {
            // 不允許關閉 'title' 模組
            if (moduleName !== 'title') {
                setExpandedModule(null);
            }
        } else {
            setExpandedModule(moduleName);
        }
    };

    return (
        <div className="admin-dashboard">
            <h1 className="dashboard-title">網站內容管理</h1>

            {/* 首頁標題設定模組 - 預設展開 */}
            <div className="module-section">
                <div 
                    className="module-header clickable"
                    onClick={() => toggleModule('title')}
                >
                    <h2>首頁標題設定</h2>
                    <div className="header-right">
                        <span className="module-description">管理網站首頁的標題和主視覺圖片</span>
                        <span className={`expand-icon expanded`}>
                            ▼
                        </span>
                    </div>
                </div>
                <div className={`module-content expanded`}>
                    <div className="content-wrapper visible">
                        <div className="title-image-container">
                            <div className="input-section">
                                <h3>標題設定</h3>
                                <InputTitle />
                            </div>
                            <div className="input-section">
                                <h3>主視覺圖片</h3>
                                <InputImg />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

{/* 
            <div className="module-section">
                <div 
                    className="module-header clickable"
                    onClick={() => toggleModule('news')}
                >
                    <h2>最新消息管理</h2>
                    <div className="header-right">
                        <span className="module-description">管理網站的新聞和公告</span>
                        <span className={`expand-icon ${expandedModule === 'news' ? 'expanded' : ''}`}>
                            ▼
                        </span>
                    </div>
                </div>
                <div className={`module-content ${expandedModule === 'news' ? 'expanded' : ''}`}>
                    <div className="content-wrapper">
                        <NewsManager />
                    </div>
                </div>
            </div>
*/}

            <div className="module-section">
                <div 
                    className="module-header clickable"
                    onClick={() => toggleModule('market')}
                >
                    <h2>市集資訊</h2>
                    <div className="header-right">
                        <span className="module-description">管理市場相關資訊和數據</span>
                        <span className={`expand-icon ${expandedModule === 'market' ? 'expanded' : ''}`}>
                            ▼
                        </span>
                    </div>
                </div>
                {/* <TEST /> */}
                <div className={`module-content ${expandedModule === 'market' ? 'expanded' : ''}`}>
                    <div className="content-wrapper">
                        <MarketEventEditor />
                    </div>
                </div>
            </div> 
        </div>
    );
}

export default HomeData;