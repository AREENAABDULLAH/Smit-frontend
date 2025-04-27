// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Navbar stays visible
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home'; // Optional: You can keep or remove this too

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Removed Dashboard route */}
      </Routes>
    </Router>
  );
}

export default App;
