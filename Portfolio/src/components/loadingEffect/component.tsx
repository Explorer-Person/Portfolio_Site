import React from 'react';
import './style.css';

interface LoadingEffectProps {
    size: string;
}

const LoadingEffect: React.FC<LoadingEffectProps> = ({ size }) => {
   
    return (
        <div style={{ width: size }} className='loader'>
            {/* You can add any loading spinner or text here */}
        </div>
    );
};

export default LoadingEffect;