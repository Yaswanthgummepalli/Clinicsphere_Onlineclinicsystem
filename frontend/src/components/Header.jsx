import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
 
  const [isActive, setIsActive] = useState(false);

  
  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const closeMenu = () => {
    setIsActive(false);
  };

  return (
    <header className="main-header">
      <div className="logo-section">
        <h1 className="main-heading">Clinic Sphere</h1>
      </div>

      <button 
        className={`menu-toggle ${isActive ? 'active' : ''}`} 
        onClick={toggleMenu}
        aria-label="Toggle navigation"
      >
        <span className="hamburger-bar"></span>
        <span className="hamburger-bar"></span>
        <span className="hamburger-bar"></span>
      </button>

     
      <nav className={`main-nav ${isActive ? 'active' : ''}`}>
        <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
        <Link to="/about" className="nav-link" onClick={closeMenu}>About us</Link>
        <Link to="/contact" className="nav-link" onClick={closeMenu}>Contact Us</Link>
        
        <Link to="/Login" className="nav-button primary" onClick={closeMenu}>Login</Link>
        <Link to="/Register" className="nav-button secondary" onClick={closeMenu}>Register</Link>
      </nav>
    </header>
  );
}

export default Header;