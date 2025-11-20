import React, { useState } from 'react';
import axios from 'axios';
import "./Signup.css";

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'https://todo-backend-sigma-rouge.vercel.app/api/auth/signup',
        { email, password }
      );

      alert('Signup successful! Please login.');
      window.location.href = '/';
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <div className="signup-page">
      <form className="signup-box" onSubmit={submitHandler}>
        <h2 className="signup-title">Signup</h2>

        <input
          className="signup-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          className="signup-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />

        <button type="submit" className="signup-btn">Signup</button>

        <div className="login-link">
          Already have an account? <a href="/">Login</a>
        </div>
      </form>
    </div>
  );
}

export default Signup;
