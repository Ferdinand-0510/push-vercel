import React, { useState, useEffect } from 'react';
import './CarouselBox.css';

function CarouselBox() {
    const [activeIndex, setActiveIndex] = useState(0);

    // 商品資料 - 8張圖片
    const items = [
        { id: 1, title: "商品1", price: "$299", image: "/images/A.jpg" },
        { id: 2, title: "商品2", price: "$399", image: "/images/B.jpg" },
        { id: 3, title: "商品3", price: "$499", image: "/images/C.jpg" },
        { id: 4, title: "商品4", price: "$599", image: "/images/D.jpg" },
        { id: 5, title: "商品5", price: "$699", image: "/images/E.jpg" },
        { id: 6, title: "商品6", price: "$799", image: "/images/F.jpg" },
        { id: 7, title: "商品7", price: "$899", image: "/images/G.jpg" },
        { id: 8, title: "商品8", price: "$999", image: "/images/H.jpg" }
    ];

    // 自動輪播
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((current) =>
                current === items.length - 5 ? 0 : current + 1
            );
        }, 2000); // 每2秒切換一次

        return () => clearInterval(timer);
    }, [items.length]);

    // 下一組
    const nextSlide = () => {
        setActiveIndex((current) =>
            current === items.length - 5 ? 0 : current + 1
        );
    };

    // 上一組
    const prevSlide = () => {
        setActiveIndex((current) =>
            current === 0 ? items.length - 5 : current - 1
        );
    };

    return (
        <div className="multi-carousel">
            <button
                className="multi-carousel__button multi-carousel__button--prev"
                onClick={prevSlide}
            >
                ←
            </button>

            <div className="multi-carousel__container">
                <div
                    className="multi-carousel__track"
                    style={{
                        transform: `translateX(-${activeIndex * (20)}%)`,
                    }}
                >
                    {items.map((item) => (
                        <div key={item.id} className="multi-carousel__item">
                            <div className="multi-carousel__card">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="multi-carousel__image"
                                />
                                <div className="multi-carousel__content">
                                    <h3>{item.title}</h3>
                                    <p>{item.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button
                className="multi-carousel__button multi-carousel__button--next"
                onClick={nextSlide}
            >
                →
            </button>

            <div className="multi-carousel__indicators">
                {Array.from({ length: items.length - 4 }).map((_, index) => (
                    <button
                        key={index}
                        className={`multi-carousel__indicator ${index === activeIndex ? 'active' : ''}`}
                        onClick={() => setActiveIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
}

export default CarouselBox;