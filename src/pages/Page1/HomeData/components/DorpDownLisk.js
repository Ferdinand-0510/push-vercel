import React, { useState } from 'react';
import './DorpDownLisk.css';

function DorpDownLisk() {
    const cities = ['台北', '台中', '高雄'];
    const areas = {
        台北: ['信義區', '中山區'],
        台中: ['龍井區', '太平區', '新社區'],
        高雄: ['楠梓區', '左營區'],
    };
    const letters = {
        信義區: ['A', 'B', 'C'],
        中山區: ['D', 'E', 'F'],
        龍井區: ['G', 'H', 'I'],
        太平區: ['J', 'K', 'L'],
        新社區: ['M', 'N', 'O'],
        楠梓區: ['P', 'Q', 'R'],
        左營區: ['S', 'T', 'U'],
    };

    const [selectedCity, setSelectedCity] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const [selectedLetter, setSelectedLetter] = useState('');


    const handleCityChange = (e) => {
        const city = e.target.value;
        setSelectedCity(city);
        setSelectedArea('');
        setSelectedLetter('');
    };

    const handleAreaChange = (e) => {
        const area = e.target.value;
        setSelectedArea(area);
        setSelectedLetter('');
    };

    const handleLetterChange = (e) => {
        setSelectedLetter(e.target.value);
    };

    return (
        <div className="body-container">
            <div className="dropdown-container">
                <p className="dropdown-label">選擇城市</p>
                <select
                    className="dropdown-select"
                    value={selectedCity}
                    onChange={handleCityChange }
                >
                <option value="" disabled>
                請選擇縣市
                </option>
                    {cities.map((citie) => (
                        <option key={citie} value={citie}>
                            {citie }
                        </option>
                    ))}
                </select>
                
            </div>

            <div className="dropdown-container">
                <p className="dropdown-label">選擇地區</p>
                <select
                    className="dropdown-select"
                    value={selectedArea}
                    onChange={handleAreaChange}
                    disabled={!selectedCity}
                >
                    <option value="" disabled>
                        請選擇地區
                    </option>
                    {selectedCity &&
                        areas[selectedCity].map((area) => (
                            <option key={area} value={area}>
                                {area}
                            </option>
                        ))}
                </select>
            </div>

            <div className="dropdown-container">
                <p className="dropdown-label">選擇字母</p>
                <select
                    className="dropdown-select"
                    value={selectedLetter}
                    onChange={handleLetterChange}
                    disabled={!selectedArea}
                >
                    <option value="" disabled>
                        請選擇字母
                    </option>
                    {selectedArea &&
                        letters[selectedArea].map((letter) => (
                            <option key={letter} value={letter}>
                                {letter}
                            </option>
                        ))}
                </select>
            </div>

            <div className="dropdown-result">
                選擇結果：{selectedCity} / {selectedArea} / {selectedLetter}
            </div>
        </div>
    );
}

export default DorpDownLisk;
