import React, { useState } from 'react';
import axios from 'axios';
import "./Login.css";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'https://todo-backend-sigma-rouge.vercel.app/api/auth/login',
        { email, password }
      );

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('email', res.data.email);

      window.location.href = '/todos';
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="login-page">
      <form className="login-box" onSubmit={submitHandler}>
        
        <h2 className="login-title">Login</h2>

        <input
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />

        <button type="submit" className="login-btn">Login</button>

        <div className="signup-link">
          Don’t have an account? <a href="/signup">Signup</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
