import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // 💡 Import the CSS file

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); // 💡 You forgot this in the original code!
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://smit-backend-rosy.vercel.app/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Sign Up Successful! 🎉");
        navigate('/login');
      } else {
        alert("❌ Sign Up Failed: " + data.message);
      }
    } catch (err) {
      alert("🚨 Error: Could not connect to server.");
    }
  };

  return (
    <div className="login-container"> {/* You can reuse login-container from Login.css */}
      <form className="signup-form" onSubmit={handleSignup}>
        <h2 className="signup-heading">Sign Up</h2>
        <input
          type="text"
          placeholder="Enter your name"
          className="signup-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Enter your email"
          className="signup-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Create a password"
          className="signup-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="signup-button">Sign Up</button>
        <p className="login-link">
          Already have an account?{' '}
          <span onClick={() => navigate('/login')}>Log in</span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
