import React from 'react';
import { logo1, bars } from '../../assets/images/index';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <div className="container d-flex align-items-center justify-content-between h-100">
        <div className="left d-flex align-items-center">
          <Link to="/">
            <div className="img">
              <img src={logo1} alt="" />
            </div>
          </Link>
        </div>
        <div className="right">
          <div className="wrap-button">
            <Link to="/signin">
              <button className="button button-dark mr-3 pl-3 pr-3">Signin</button>
            </Link>
            <Link to="/signup">
              <button className="button button-light pl-3 pr-3">Signup</button>
            </Link>
          </div>

          <div className="wrap-sidebar">
            <label htmlFor="sidebar">
              <img src={bars} alt="" />
            </label>

          </div>
        </div>
      </div>
    </header>
  )
}
