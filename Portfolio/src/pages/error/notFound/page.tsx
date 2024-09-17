import React from 'react';
import './style.css';
import { routeHandler } from '@src/shared';

const NotFoundPage: React.FC = () => {


  return (
    <div className="error-page">
      <div className="error-content">
        <h1 className="error-title">404</h1>
        <h2 className="error-subtitle">Page Not Found</h2>
        <p className="error-message">
          The page you are looking for does not exist. It might have been moved or deleted.
        </p>
        <button onClick={()=>routeHandler('/')} className="home-button" >Go to Home</button>
      </div>
    </div>
  );
};

export default NotFoundPage;
