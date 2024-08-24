import React from 'react';
import './style.css';
import useSignupHook from './hook';
import { CustomButton } from '@src/components';

const SignupPage: React.FC = () => {
  const {
    data: {
      styleButton
    },
    functions:{
    handleChange,
  }} = useSignupHook()

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <div>
        <div className="form-group">
          <label>Username</label>
          <input onChange={handleChange} type="text" name='username' placeholder="Enter your username" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input onChange={handleChange} type="email" name='email' placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input onChange={handleChange} type="password" name='password' placeholder="Enter your password" />
        </div>
       <CustomButton type='request' style={styleButton} process='signup' inheritor='auth' id={null}/> 
      </div>
    </div>
  );
};

export default SignupPage;

