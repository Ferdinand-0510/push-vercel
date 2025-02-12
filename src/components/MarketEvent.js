import React, { useEffect, useRef, useState } from 'react';
import api from '../utils/axiosConfig';
import './MarketEvent.css'

function MarketEvent() {
    const [marketEvents, setMarketEvents] = useState([]);
    const sectionRefs = useRef([]);

    useEffect(() => {

        // 從 API 獲取市集資料
        async function fetchMarketEvents() {
            try {
                const response = await api.get('/api/get_market_events');
                console.log('API Response:', response.data);
                setMarketEvents(response.data.events || []);
            } catch (error) {
                console.error('無法取得市集資料:', error);
            }
        }
        fetchMarketEvents()

        // 原有的 IntersectionObserver 邏輯
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '50px'
            }
        );

        const sections = document.querySelectorAll('.market-section');
        sections.forEach((section) => {
            observer.observe(section);
        });
        

        return () => {
            sections.forEach((section) => {
                observer.unobserve(section);
            });
        };
    }, []);


    useEffect(() => {
        if (marketEvents.length > 0) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                        }
                    });
                },
                { threshold: 0.1, rootMargin: '50px' }
            );
    
            const sections = document.querySelectorAll('.market-section');
            sections.forEach((section) => observer.observe(section));
    
            return () => sections.forEach((section) => observer.unobserve(section));
        }
    }, [marketEvents]); // 在 marketEvents 變更時重新執行
    // 按城市分組市集資料
    const groupEventsByCity = () => {
        const cities = [...new Set(marketEvents.map(event => event.MarketCity))];
        return cities.map(city => ({
            city,
            events: marketEvents.filter(event => event.MarketCity === city)
        }));
    };

    return (
        <div>
            {!marketEvents.length ? (
                <div>Loading...</div>
            ) : (
            <div>
            <div className='market-title'> 
                <img src="/images/marketTitle1.png" alt="Title Image" className="market-Titleimg" />
                <h1>市集內容</h1>
            </div>

            <div className='market-container1'>
                <img src="/images/1206.jpg" alt="Title Image" className="market-img" />
                <div className='market-context'>
                    {groupEventsByCity().map((cityGroup, cityIndex) => (
                        <React.Fragment key={cityIndex}>
                            <div className="market-section">
                                <h2>📌📌📌{cityGroup.city}📌📌📌</h2>
                            </div>
                            <br/>
                            <div className="market-section">
                            
                                {cityGroup.events.map((event, eventIndex) => (
                                    
                                    <div key={eventIndex} className="market-item">
                                        
                                        {event.Url ? (
                                            <a 
                                                href={event.Url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                            >
                                                🏝️ {event.Title}
                                            </a>
                                        ) : (
                                            <span>🏝️ {event.Title}</span>
                                        )}
                                        <br/>
                                        {(event.DataRange || event.MarketData) && (
                                            <>📅 {`${event.DataRange || ''}${event.DataRange && event.MarketData ? '  ' : ''}${event.MarketData || ''}`}<br/></>
                                        )}

                                        {event.MarketAdd && (
                                            <>📍 {event.MarketAdd}<br/></>
                                        )}
                                        {event.Note && (
                                            <>📃 {event.Note}<br/></>
                                        )}
                                        
                                    </div>
                                    
                                ))}
                            </div>

                        </React.Fragment>
                    ))}
                </div>
                <div className='market-space'></div>
            </div>
            
            <div className='market-title'> 
                <img src="/images/marketbow.png" alt="Title Image" className="market-Titleimg" />
                
            </div>
        </div>
            )}
        </div>
        
    )
}

export default MarketEvent;