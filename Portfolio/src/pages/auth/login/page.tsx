import './style.css';
import React from 'react';
import useLoginHook from './hook';
import { CustomButton } from '@src/components';

const LoginPage: React.FC = () => {
  const {
    data:{ styleButton },
    functions:{
    handleChange,
  }} = useLoginHook()
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

