
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route, Link, useLocation,Navigate  } from 'react-router-dom';

import React, { useEffect, useState } from 'react';
import './index.css';
import TitleImg from './components/TitleImg';
import AboutMe from './components/AboutMe';
import MarketEvent from './components/MarketEvent';
import AnimateOnScroll from './components/AnimateOnScroll';

const App = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // 檢查是否為移動設備
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // 初始檢查
        checkMobile();

        // 監聽視窗大小變化
        window.addEventListener('resize', checkMobile);

        // 滾動處理
        const handleScroll = () => {
            if (!isMobile) {
                setScrollPosition(window.pageYOffset);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isMobile]);

    return (
        <div className="parallax-container">
            <div className="title-section">
                <TitleImg />
            </div>

            <div 
                className="content-section"
                style={{ 
                    transform: isMobile ? 'none' : `translateY(${scrollPosition * -0.3}px)` 
                }}
            >
                <AnimateOnScroll>
                    <div>
                        <MarketEvent />
                    </div>
                </AnimateOnScroll>
                {/* <AnimateOnScroll>
                    <div>
                        <AboutMe />
                    </div>
                </AnimateOnScroll> */}
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
