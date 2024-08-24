import React from 'react';
import './style.css';

const ErrorPage: React.FC = () => {


  return (
    <div className="error-page">
      <div className="error-content">
        <h1 className="error-title">404</h1>
        <h2 className="error-subtitle">Page Not Found</h2>
        <p className="error-message">
          The page you are looking for does not exist. It might have been moved or deleted.
        </p>
        <button className="home-button" >Go to Home</button>
      </div>
    </div>
  );
};

export default ErrorPage;
