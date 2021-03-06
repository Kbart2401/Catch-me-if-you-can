import React from 'react'; 

const ICON = "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z";

const EndPin = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={24} viewBox="0 0 24 24" fill="#FF0000" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d={ICON}/>
            <line x1="4" y1="22" x2="4" y2="15"/>
        </svg>
    )
}

export default EndPin; 