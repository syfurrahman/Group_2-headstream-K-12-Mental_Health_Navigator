import React from "react";
import "../styles.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="navbar-title">K-12 Mental Health Tech Navigator</h2>

      <div className="navbar-links">
        <a href="#">About Us</a>
        <a href="#">Explore</a>
        <div className="dropdown">
          <button>Case Studies ▾</button>
          <div className="dropdown-content">
            <a href="#">Case Study 1</a>
            <a href="#">Case Study 2</a>
            <a href="#">Case Study 3</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
