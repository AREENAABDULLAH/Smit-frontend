import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Import the CSS

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('https://smit-backend-rosy.vercel.app/api/auth/login', {
        email,
        password,
      });

      if (response.data.success) {
        alert('Login Successful!');
        navigate('/Smit-frontend');
      } else {
        alert('Login Failed: ' + response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Error: Unable to login. Please try again later.');
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-heading">Login</h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="login-input"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="login-input"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Logging In...' : 'Login'}
        </button>
        <p className="signup-link">
          Don’t have an account?{' '}
          <span onClick={() => navigate('/signup')}>Sign up</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
