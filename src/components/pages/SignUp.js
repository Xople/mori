import React from 'react';
import { shape4, bg2, logo4, logo3, shape3 } from '../../assets/images/index';
import { Helmet } from 'react-helmet';
import { ReactSVG } from 'react-svg';
export default function SignUp() {

  return (
    <>
      <Helmet>
        <title>Mori - Sign Up</title>
      </Helmet>
      <div className="row wrap-sign-up align-items-center w-100">

        <div className="col-md-5 col-12 left">
          <div className="shape">
            <img src={shape4} alt="" className="shape4" />

            <ReactSVG src={logo4} className="logo4" />

          </div>
          <form>
            <h2>Signup</h2>
            <div className="form-group mt-3">
              <label>Name</label>
              <input type="text" className="form-control" placeholder="Name" />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Phone</label>
                <input type="text" className="form-control" placeholder="Phone" />
              </div>
              <div className="form-group col-md-6">
                <label>Email</label>
                <input type="email" className="form-control" placeholder="Email" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Username</label>
                <input type="text" className="form-control" placeholder="Username" />
              </div>
              <div className="form-group col-md-6">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Password" />
              </div>
            </div>
            <button type="submit" className="button-blue-sign">Sign Up</button>
          </form>
        </div>
        <div className="col-md-6 right">
          <div className="img">
            <img src={bg2} alt="" />
            <div className="shadow d-flex justify-content-center align-items-center">
              <ReactSVG src={logo3} />
            </div>
            <ReactSVG src={shape3} className="shape-top" />
            <ReactSVG src={shape3} className="shape-bottom" />

          </div>
        </div>
      </div>
    </>
  )
}
