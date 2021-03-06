import React, { useState } from 'react';
import { logo1 } from '../../assets/images/index';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const [stsSidebar, setStsSideBar] = useState(false);
  const { token } = localStorage

  return (
    <>
      <input type="checkbox" id="sidebar" checked={stsSidebar} onChange={() => setStsSideBar(!stsSidebar)} />

      <div className="sidebar">
        <div className="container d-flex justify-content-around flex-column align-items-center h-100 pb-3">
          <div className="top d-flex justify-content-between align-items-center w-100">
            <img src={logo1} alt="" />
            <label onClick={() => !stsSidebar ? console.log('heyo') : setStsSideBar(false)}>
              <h3><i className="fa fa-times"></i></h3>
            </label>
          </div>
          <div className="text-center d-flex flex-column">
            {!token && (
              <>
                <Link to="/signin" className="mt-3 text-dark" onClick={() => !stsSidebar ? setStsSideBar(true) : setStsSideBar(false)}>
                  <h5>SIGN IN</h5>
                </Link>
                <Link to="/signup" className="mt-3 text-dark" onClick={() => !stsSidebar ? setStsSideBar(true) : setStsSideBar(false)}>
                  <h5>SIGN UP</h5>
                </Link>
              </>
            )}
            {token && (
              <>
                <Link to="/products" className="mt-3 text-dark" onClick={() => !stsSidebar ? setStsSideBar(true) : setStsSideBar(false)}>
                  <h5>PRODUCTS</h5>
                </Link>
                <Link to="/cart" className="mt-3 text-dark" onClick={() => !stsSidebar ? setStsSideBar(true) : setStsSideBar(false)}>
                  <h5>CART</h5>
                </Link>
                <Link to="/profile" className="mt-3 text-dark" onClick={() => !stsSidebar ? setStsSideBar(true) : setStsSideBar(false)}>
                  <h5>PROFILE</h5>
                </Link>
                <Link to="/logout" className="mt-3 text-dark" onClick={() => !stsSidebar ? setStsSideBar(true) : setStsSideBar(false)}>
                  <h5>LOGOUT</h5>
                </Link>
              </>
            )}

            <p>{stsSidebar}</p>
          </div>
          <div className="bottom text-center">
            <p>Mori Wardrobe</p>
            Copyright &copy; 2020 All right reserved ❤
          </div>

        </div>
      </div>
    </>
  )
}
