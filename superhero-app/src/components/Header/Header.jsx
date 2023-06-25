import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss'

const Header = () => {
    return (
      <div className="header">
        <div className="header__container _container">
          <nav className="header__body">
            <ul className="header__list">
              <NavLink
                className="header__link"
                exact="true"
                to="/"
                activeclassname="active-link"
              >
                Superheroes
              </NavLink>
              <NavLink
                className="header__link"
                to="/add-form"
                activeclassname="active-link"
              >
                Add and delete superheroes
              </NavLink>
            </ul>
          </nav>
        </div>
      </div>
    );
}

export default Header;
