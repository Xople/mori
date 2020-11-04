import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { ReactSVG } from 'react-svg';
import { bg2, shape4, logo4, logo3, shape3 } from '../../assets/images/index';

export default function SignIn() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Mori - Sign In</title>
      </Helmet>
      <div className="row wrap-sign-in align-items-center w-100">
        <div className="col-md-6 left">
          <div className="img">
            <img src={bg2} alt="" />
            <div className="shadow d-flex justify-content-center align-items-center">
              <ReactSVG src={logo3} />
            </div>
            <ReactSVG src={shape3} className="shape-top" />
            <ReactSVG src={shape3} className="shape-bottom" />

          </div>
        </div>
        <div className="col-md-5 col-12 right">
          <div className="shape">
            <img src={shape4} alt="" className="shape4" />

            <ReactSVG src={logo4} className="logo4" />
          </div>
          <div className="col-md-12">
            <h2>Login</h2>
          </div>
          <div className="col-md-12 mt-4 form-group">
            <label className="mb-1">Username</label>
            <input type="text" name="phone" id="" className="form-control" placeholder="Enter username" />
          </div>
          <div className="col-md-12 mt-4 form-group">
            <label className="mb-1">Password</label>
            <input type="password" name="location" id="" className="form-control" placeholder="Enter password" />
          </div>
          <div className="col-md-12 mt-4">
            <button className="button-blue-sign">Login</button>
          </div>
        </div>
      </div>
    </>
  )
}
