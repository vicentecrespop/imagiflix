import React from 'react';

const Loading = () => (
    <div className='w-full h-screen bg-black grid place-items-center'>
        <svg style={{margin: 'auto', background: 'none', display: 'block', shapeRendering: 'auto', height: '50vmin', width: '50vmin'}} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <path d="M10 50A40 40 0 0 0 90 50A40 43.3 0 0 1 10 50" fill="#ff0000" stroke="none">
        <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 51.65;360 50 51.65"></animateTransform>
        </path>
        </svg>
    </div>
)

export default Loading