import React, { useState, useEffect } from 'react';
import api from '../utils/axiosConfig'; // 使用自訂的 axios 配置
import './TitlebuttonJs.css';

const TitlebuttonJs = ({ setgetnewsID }) => {
  const [activeButton, setActiveButton] = useState('');
  const [titles, setTitles] = useState([]);

  let tmpTitleData = [];

  useEffect(() => {
    const fetchTitles = async () => {
        try {
            const response = await api.get('/api/GetStockWebTitle');
            console.log('API Response:', response);  // 新增
            
            const data = response.data;
            console.log('Fetched titles:', data);
            
            if (Array.isArray(data) && data.length > 0) {  // 確保 data 是陣列
                setTitles(data);
                setActiveButton(data[0].Title);
                setgetnewsID([data[0]]);
            } else {
                console.error('Invalid data format:', data);
            }
        } catch (error) {
            console.error('Error details:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
        }
    };

    fetchTitles();
}, [setgetnewsID]);
const handleClick = (titleData) => {
    setActiveButton(titleData.Title);
    setgetnewsID([titleData]);
};

return (
    <div className="carousel-container">
        {titles.map((titleData, index) => (
            <a
                key={titleData.ID}
                href="javascript:void(0)"
                className={`btn ${activeButton === titleData.Title ? 'active' : ''}`}
                
                // onClick={() => handleClick(titleData)}
            >
                {titleData.Title}
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </a>
        ))}
    </div>
);
};

export default TitlebuttonJs;
