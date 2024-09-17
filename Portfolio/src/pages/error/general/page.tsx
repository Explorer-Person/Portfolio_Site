import React from 'react';
import './style.css';
import { routeHandler } from '@src/shared';

const ErrorPage: React.FC = () => {


  return (
    <div className="error-page">
      <div className="error-content">
        <h1 className="error-title">500</h1>
        <h2 className="error-subtitle">Something Went Wrong</h2>
        <p className="error-message">
          The page you are looking for not work. You can reload page or wait till issue resolved by us.
        </p>
        <button onClick={()=>routeHandler('/')} className="home-button" >Go to Home</button>
      </div>
    </div>
  );
};

export default ErrorPage;
 