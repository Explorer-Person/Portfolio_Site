import React from 'react';
import './style.css';
import { routeHandler } from '@src/shared';

const NotAuthPage: React.FC = () => {


  return (
    <div className="error-page">
      <div className="error-content">
        <h1 className="error-title">401</h1>
        <h2 className="error-subtitle">Not Authorized</h2>
        <p className="error-message">
          The page you are looking for not permitted. You can try login with your admin info.
        </p>
        <button onClick={()=>routeHandler('/')} className="home-button" >Go to Home</button>
      </div>
    </div>
  );
};

export default NotAuthPage;
