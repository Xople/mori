import React, { useState } from 'react';
import { logo1, bars } from '../../assets/images/index';
import { Link, Redirect } from 'react-router-dom';

export default function Header() {
  const [menu, setMenu] = useState(false)
  const [logoutDone, setLogoutDone] = useState(false)
  const { token } = localStorage
  return (
    <header className="header">
      <div className="container d-flex align-items-center justify-content-between h-100">
        <div className="left d-flex align-items-center">
          <Link to={`${token ? '/products' : '/'}`}>
            <div className="img">
              <img src={logo1} alt="" />
            </div>
          </Link>
        </div>
        <div className="right">
          {!token && (
            <div className="wrap-button">
              <Link to="/signin">
                <button className="button button-dark mr-3 pl-3 pr-3">Signin</button>
              </Link>
              <Link to="/signup">
                <button className="button button-light pl-3 pr-3">Signup</button>
              </Link>
            </div>
          )}

          {logoutDone && (<Redirect to="/" />)}
          {token && (
            <div className="wrap-menu-profile d-flex align-items-center position-relative">
              <Link to="/products" className="mr-4">Products</Link>
              <Link to="/cart" className="mr-4">Cart</Link>
              <div className="menu-profile d-flex align-items-center">
                <Link to="/profile">
                  <i className="fa fa-user-circle fa-2x mr-2"></i>
                </Link>
                <i className="fa fa-chevron-down" onClick={() => setMenu(!menu)}></i>
              </div>

              {menu && (
                <div className="menu">
                  <div className="container">
                    <p>Settings</p>
                    <div
                      className="menu-setting mt-4"
                      onClick={() => {
                        localStorage.removeItem("token")
                        localStorage.removeItem("expired")
                        localStorage.removeItem("time_expired")
                        setLogoutDone(true)
                      }}>
                      <h6 className="mb-0">Logout</h6>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

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
