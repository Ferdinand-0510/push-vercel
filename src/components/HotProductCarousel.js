import React, { useState, useEffect } from 'react';
import './HotProductCarousel.css';

function CarouselBox() {
    const [activeIndex, setActiveIndex] = useState(0);

    // 商品資料 - 8張圖片
    const items = [
        { id: 1, title: "曉靚港味腸粉（高雄楠梓店）", price: "好吃 新鮮 用心 平價", image: "/images/A.jpg", link: "https://www.google.com/maps/place/%E6%9B%89%E9%9D%9A%E6%B8%AF%E5%91%B3%E8%85%B8%E7%B2%89%EF%BC%88%E6%A5%A0%E6%A2%93%E5%BA%97/@22.722883,120.2932917,17z/data=!3m1!4b1!4m6!3m5!1s0x346e0fb48d443867:0xe89e7e8d668c282!8m2!3d22.722883!4d120.295872!16s%2Fg%2F11y4921gwf?authuser=0&entry=ttu&g_ep=EgoyMDI1MDIwNS4xIKXMDSoASAFQAw%3D%3D" }
        // { id: 2, title: "商品2", price: "$399", image: "/images/B.jpg", link: "https://example.com/item2" },
        // { id: 3, title: "商品3", price: "$499", image: "/images/C.jpg", link: "https://example.com/item3" },
        // { id: 4, title: "商品4", price: "$599", image: "/images/D.jpg", link: "https://example.com/item4" },
        // { id: 5, title: "商品5", price: "$699", image: "/images/E.jpg", link: "https://example.com/item5" },
        // { id: 6, title: "商品6", price: "$799", image: "/images/F.jpg", link: "https://example.com/item6" },
        // { id: 7, title: "商品7", price: "$899", image: "/images/G.jpg", link: "https://example.com/item7" },
        // { id: 8, title: "商品8", price: "$999", image: "/images/H.jpg", link: "https://example.com/item8" }
    ];
    

    // 自動輪播
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((current) =>
                current === items.length - 1 ? 0 : current + 1
            );
        }, 5000);

        return () => clearInterval(timer);
    }, [items.length]);

    // 下一張
    const nextSlide = () => {
        setActiveIndex((current) =>
            current === items.length - 1 ? 0 : current + 1
        );
    };

    // 上一張
    const prevSlide = () => {
        setActiveIndex((current) =>
            current === 0 ? items.length - 1 : current - 1
        );
    };

    return (
        <div className="carousel">
            <button
                className="carousel__button carousel__button--prev"
                onClick={prevSlide}
            >
                ←
            </button>

            <div className="carousel__container">
                <div
                    className="carousel__track"
                    style={{
                        transform: `translateX(-${activeIndex * 100}%)`
                    }}
                >
                    {items.map((item, index) => (
                        <div
                            key={item.id}
                            className="carousel__item"
                        >
                            <div className="carousel__card">
                                <a href={item.link} target="_blank" rel="noopener noreferrer">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="carousel__image"
                                    />
                                    <div className="carousel__content">
                                        <h3>{item.title}</h3>
                                        <p>{item.price}</p>
                                    </div>
                                </a>
                            </div>
                        </div>

                    ))}
                </div>
            </div>

            <button
                className="carousel__button carousel__button--next"
                onClick={nextSlide}
            >
                →
            </button>

            <div className="carousel__indicators">
                {items.map((_, index) => (
                    <button
                        key={index}
                        className={`carousel__indicator ${index === activeIndex ? 'active' : ''}`}
                        onClick={() => setActiveIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
}

export default CarouselBox;