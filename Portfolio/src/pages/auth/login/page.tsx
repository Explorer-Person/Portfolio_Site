import './style.css';
import React, { useEffect } from 'react';
import useLoginHook from './hook';
import { CustomButton } from '@src/components';
import { useNavigate } from "react-router-dom";


const LoginPage: React.FC = () => {
  const {
    data:{ styleButton, status, process, loading },
    functions:{
    handleChange,
  }} = useLoginHook();
  const navigate = useNavigate();

  useEffect(()=>{

    if(status === true && process === 'login'){
      return navigate('/');
    } 
  }, [status, process, loading])
  return (
    <div className="login-container">
      <h2>Login</h2>
      <div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name='email' onChange={handleChange} placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name='password' onChange={handleChange} placeholder="Enter your password" />
        </div>
      <CustomButton style={styleButton} inheritor='auth' process='login' type='request' id={null}/>
      </div>
    </div>
  );
};

export default LoginPage;

