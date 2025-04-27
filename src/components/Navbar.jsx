import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/saylanilogo.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'; // Custom CSS

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand" href="#">
          <img
            src={logo}
            alt="Logo"
            className="d-inline-block align-text-top"
          />
        </a>

        {/* Hamburger */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={isMenuOpen ? 'true' : 'false'}
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div
          className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                <i className="fas fa-home"></i> Home
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-outline-light"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
