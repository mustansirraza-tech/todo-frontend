import React from "react";
import "./Header.css";

function Header({ handleSignOut }) {
  return (
    <header className="header-container">
      <div className="header-left">
        <img
          src="/mountblue-png.png"
          alt="Mountblue Logo"
          className="header-logo"
        />
        <h1 className="header-title">Mountblue Todo App</h1>
      </div>

      <button className="header-signout-btn" onClick={handleSignOut}>
        Sign Out
      </button>
    </header>
  );
}

export default Header;
