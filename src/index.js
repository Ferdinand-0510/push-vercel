import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import TitleImg from './components/TitleImg';
import MarketEvent from './components/MarketEvent';
import AnimateOnScroll from './components/AnimateOnScroll';
import Page1 from './pages/Page1';
import HotProductCarousel from './components/HotProductCarousel';
import TitlebuttonJs from './components/TitlebuttonJs';
import ProductData from './pages/Page1/ProductData';
import PortfolioData from './pages/Page1/PortfolioData';
import HomeData from './pages/Page1/HomeData';
import LoginPage from './pages/Login'; // 確保有一個登入頁面組件
import LoginKey from './pages/Page1/LoginKey';
import { PrivateRoute } from './components/PrivateRoute';

// 主頁面組件
const Home = () => {
    const [scrollPosition, setScrollPosition] = React.useState(0);
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        
        checkMobile();

        window.addEventListener('resize', checkMobile);

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
                        <HotProductCarousel/>
                        <TitlebuttonJs/>
                        <MarketEvent />
                    </div>
                </AnimateOnScroll>
            </div>
        </div>
    );
};
// App 組件
const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} /> {/* 新增登入頁面 */}
                    <Route path="/page1/*" element={
                        <PrivateRoute>
                            <Page1 />
                        </PrivateRoute>}>
                        <Route path="product-data" element={<ProductData />} />
                        <Route path="portfolio-data" element={<PortfolioData />} />
                        <Route path="home-data" element={<HomeData />} />
                        <Route path="login-key" element={<LoginKey />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);