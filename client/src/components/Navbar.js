import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "../styles.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };
  
  return (
    <div className="nav-container">
      <nav className="navbar">
        <Link to="/" className="logo">
          K-12 <span>Mental Health</span> Tech Navigator
        </Link>
        
        <button className="menu-button" onClick={toggleMenu}>
          {menuOpen ? '✕' : '☰'}
        </button>
        
        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <Link to="/about" className="nav-link">About Us</Link>
          
          <div className={`dropdown ${activeDropdown === 'explore' ? 'active' : ''}`}>
            <span 
              className="nav-link" 
              onClick={() => toggleDropdown('explore')}
            >
              Explore ▾
            </span>
            <div className="dropdown-content">
              <Link to="/journey/assess">Assess Student Needs</Link>
              <Link to="/journey/stakeholder">Stakeholder Engagement</Link>
              <Link to="/journey/solutions">Select Solutions</Link>
              <Link to="/journey/funding">Funding Strategies</Link>
              <Link to="/journey/implement">Implementation</Link>
            </div>
          </div>
          
          <div className={`dropdown ${activeDropdown === 'case-studies' ? 'active' : ''}`}>
            <span 
              className="nav-link" 
              onClick={() => toggleDropdown('case-studies')}
            >
              Case Studies ▾
            </span>
            <div className="dropdown-content">
              <Link to="/case-studies/elementary">Elementary Schools</Link>
              <Link to="/case-studies/middle">Middle Schools</Link>
              <Link to="/case-studies/high">High Schools</Link>
              <Link to="/case-studies/district">District-Wide</Link>
            </div>
          </div>
          
          <Link to="/resources" className="nav-link">Resources</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
