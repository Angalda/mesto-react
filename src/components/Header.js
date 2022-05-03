import React from "react";
import logo from '../images/header-logo.svg';

function Header() {
  return (
    <div className="Header">
      <>
        <header className="header">
          <a href={logo} className="header__logo"></a>
        </header>
      </>
    </div>
  );
}

export default Header;