//D:\Carl\React\test\src\pages\Page1\index.js
import React, { useState, useCallback } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // 引入 useAuth
import './index.css';

function Page1() {
    const { user } = useAuth(); // 獲取用戶資訊
    const [menuOpen, setMenuOpen] = useState(false);
    const [productSubMenu, setProductSubMenu] = useState(false);
    const [dataSubMenu, setDataSubMenu] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [currentMoon, setCurrentMoon] = useState('first'); // 'first' or 'second'

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleProductSubMenu = () => {
        setProductSubMenu(!productSubMenu);
        setDataSubMenu(false);
    };

    const toggleDataSubMenu = () => {
        setDataSubMenu(!dataSubMenu);
        setProductSubMenu(false);
    };

    const handleMoonClick = useCallback(async () => {
        if (isAnimating) return;
        setIsAnimating(true);

        const firstMoon = document.querySelector('.first-moon');
        const secondMoon = document.querySelector('.second-moon');

        if (currentMoon === 'first') {
            firstMoon.classList.add('visible');
            secondMoon.classList.add('visible');

            firstMoon.classList.add('rotate-out');
            secondMoon.classList.add('rotate-in');

            setTimeout(() => {
                firstMoon.classList.remove('visible', 'rotate-out');
                setCurrentMoon('second');
                setIsAnimating(false);
            }, 500);
        } else {
            secondMoon.classList.add('visible');
            firstMoon.classList.add('visible');

            secondMoon.classList.add('rotate-out');
            firstMoon.classList.add('rotate-in');

            setTimeout(() => {
                secondMoon.classList.remove('visible', 'rotate-out');
                setCurrentMoon('first');
                setIsAnimating(false);
            }, 500);
        }
    }, [isAnimating, currentMoon]);

    return (
        <div className="box">
            <div className={`overlay ${menuOpen ? 'active' : ''}`} onClick={handleMenuToggle}></div>
            <div className="title1">
                <div className="hamburger" onClick={handleMenuToggle}>
                    ☰
                </div>
                <div className="logo">Logo</div>
                <div className="space"></div>

                <div className="member-login">
                    <div className="member-space"></div>
                    <div className="gotohome">
                        <Link to="/">首頁</Link>
                    </div>
                    <div className="separation">|</div>
                    {user ? (
                        // 如果用戶已登入，顯示 uuid
                        <div className="gotohome">歡迎: {user.username} ！</div>
                    ) : (
                        // 如果未登入，顯示 "會員登入"
                        <div className="gotohome">會員登入</div>
                    )}
                    <div className="member-space"></div>
                </div>
            </div>
            <div className="item1">
                <div className={`menu ${menuOpen ? 'open' : ''}`}>
                    <div className="nox1">
                        <Link to="/page1/home-data">
                            <img src="/images/homeicon-001.ico" alt="Home Icon" style={{ width: '20px', marginRight: '8px' }} />首頁
                        </Link>
                    </div>
                    <div className="nox2 has-submenu">
                        <div className="nox1" onClick={toggleProductSubMenu}>
                            <img src="/images/new-producticon-001.ico" alt="Product Icon" style={{ width: '24px', marginRight: '8px' }} />
                            產品
                            {productSubMenu ? '▼' : '▶'}
                        </div>
                        <div className={`submenu ${productSubMenu ? 'show' : ''}`}>
                            <Link to="/page1/product-data">大分類</Link>
                            <div>中分類</div>
                            <div>小分類</div>
                        </div>
                    </div>
                    <div className="nox3">
                        <Link to="/new-data">
                            <img src="/images/speakericon-001.ico" alt="Product Icon" style={{ width: '28px', marginRight: '8px' }} />
                            消息
                        </Link>
                    </div>
                    <div className="nox4 has-submenu">
                        <div onClick={toggleDataSubMenu}>
                            <img src="/images/open-bookicon-001.ico" alt="Product Icon" style={{ width: '20px', marginRight: '8px' }} />
                            資料 {dataSubMenu ? '▼' : '▶'}
                        </div>
                        <div className={`submenu ${dataSubMenu ? 'show' : ''}`}>
                            <div>圖片</div>
                            <div>影片</div>
                        </div>
                    </div>
                    <div className="nox5" onClick={handleMoonClick}>
                        <img src="/images/phone-callicon-001.ico" alt="Product Icon" style={{ width: '20px', marginRight: '8px' }} />
                        關於我們
                    </div>

                    <div className="nox6">
                        <Link to="/page1/login-key">
                            <img src="/images/speakericon-001.ico" alt="Product Icon" style={{ width: '28px', marginRight: '8px' }} />
                            登入Key
                        </Link>
                    </div>
                </div>
            </div>
            <div className="body1">
                {/* 嵌套路由內容將被渲染在這裡 */}
                <Outlet />
            </div>
        </div>
    );
}

export default Page1;
