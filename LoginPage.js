import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const validUsername = 'Alishba';
    const validPassword = 'Alishba01234';

    if (username === validUsername && password === validPassword) {
      localStorage.setItem('isLoggedIn', 'true'); // Store login state
      navigate('/taskform'); // Navigate to TaskForm page after login
    } else {
      setError('Invalid username or password!');
    }
  };

  return (
    <div id="login-wrapper">
      <div id="login-container">
        <h1 id="login-title">WELCOME</h1>
        <p id="login-subtitle">Please login to your account</p>
        <div className="input-group">
          <label htmlFor="username" className="input-label">Username</label>
          <input
            type="text"
            id="username"
            className="input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password" className="input-label">Password</label>
          <input
            type="password"
            id="password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        {error && <p id="error-text">{error}</p>}
        <button id="login-button" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default LoginPage;
