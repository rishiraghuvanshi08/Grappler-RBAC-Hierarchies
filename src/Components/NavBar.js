import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
// import { CodeIcon, HamburgetMenuClose, HamburgetMenuOpen } from "../Icons";
// import CodeIcon from '../Icons/code-bold.svg'
// import HamburgetMenuOpen from '../Icons/close-fill.svg'
// import HamburgetMenuClose from '../Icons/hamburger-lg.svg'


function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <span>RBAC</span>
            {/* <i className="fas fa-code"></i> */}
            {/* <span className="icon">
              <CodeIcon />
            </span> */}
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/users"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Users
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/projects"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Project
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/teams"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Teams
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/login"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Login
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {/* <i className={click ? "fas fa-times" : "fas fa-bars"}></i> */}

            {click ? (
              <span className="icon">
                {/* <HamburgetMenuOpen />{" "} */}
              </span>
            ) : (
              <span className="icon">
                {/* <HamburgetMenuClose /> */}
              </span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;