import React, { useState } from 'react';
import { Clock, ChevronRight, Calendar } from 'lucide-react';
import './NewList.css';

const NewsList = () => {
    const newsItems = [
        {
            id: 1,
            date: '2023-10-18T00:00:00',
            title: '歡迎蒞臨泓沛國際興業有限公司官網',
            content: '感謝您造訪我們的網站！我們很高興為您提供最優質的服務與產品...'
        },
        {
            id: 2,
            date: '2023-10-15T00:00:00',
            title: '2023年度新產品發表會',
            content: '本公司將於下月舉辦年度新產品發表會，誠摯邀請您蒞臨指教...'
        },
        {
            id: 3,
            date: '2023-10-10T00:00:00',
            title: '企業永續發展計畫啟動',
            content: '為實現企業永續經營，本公司推出一系列環保計畫...'
        }
    ];

    const [expandedItems, setExpandedItems] = useState(new Set());

    const toggleItem = (id) => {
        setExpandedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString('zh-TW', {
                month: '2-digit',
                day: '2-digit'
            }),
            year: date.getFullYear()
        };
    };

    return (
        <div className="timeline-news">
            <div className="timeline-news__header">
                <Clock className="timeline-news__icon" />
                <h2 className="timeline-news__title">最新消息</h2>
            </div>

            <div className="timeline-container">
                <div className="timeline-line"></div>

                <div className="timeline-items">
                    {newsItems.map(item => {
                        const formattedDate = formatDate(item.date);
                        const isExpanded = expandedItems.has(item.id);

                        return (
                            <div key={item.id} className="timeline-item">
                                <div className="timeline-dot"></div>
                                <br/>
                                <div className="timeline-content">
                                    <div className="timeline-date">
                                        <span className="timeline-date__day">{formattedDate.date}</span>
                                        <span className="timeline-date__year">{formattedDate.year}</span>
                                    </div>

                                    <div className={`timeline-card ${isExpanded ? 'expanded' : ''}`}>
                                        <div
                                            className="timeline-card__header"
                                            onClick={() => toggleItem(item.id)}
                                        >
                                            <Calendar className="timeline-card__calendar" />
                                            <h3 className="timeline-card__title">{item.title}</h3>
                                            <ChevronRight className={`timeline-card__arrow ${isExpanded ? 'rotated' : ''}`} />
                                        </div>

                                        <div className={`timeline-card__content ${isExpanded ? 'expanded' : ''}`}>
                                            <div className="timeline-card__text">
                                                {item.content}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default NewsList;