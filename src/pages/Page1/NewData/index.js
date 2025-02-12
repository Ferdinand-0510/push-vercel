// Page1/NewData/index.js
import React from 'react';
import './index.css';
import { useLocation } from 'react-router-dom';

function NewData() {
    const use_location = useLocation()
    return (
        <div>
        <h1>當前頁面路徑是: {use_location.pathname}</h1>
        NewData
        </div>
    );
}

export default NewData;


