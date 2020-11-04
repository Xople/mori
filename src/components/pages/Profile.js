import React, { useEffect, useState } from 'react';
import { mirai } from '../../assets/images/index';
import { Header } from '../../components/layout/index';
import { Link, Route, Switch, useRouteMatch, useParams } from 'react-router-dom';



export default function Profile() {
  let { path, url } = useRouteMatch()
  let match = useRouteMatch("/profile/:menu")
  return (
    <>
      <Header />
      <section className="profile h-100">
        <div className="container">
          <div className="row wrap-profile justify-content-between mt-5">
            <div className="col-md-3 left">
              <h5>User Profile</h5>
              <div className="wrap-option mt-5">
                <Link to={`${url}`} className="text-dark">
                  <div className="option d-flex align-items-center w-100">
                    <div className="icon">
                      <i className="fas fa-user"></i>
                    </div>
                    <div className="name-option">
                      <h6 className="m-0">Profile</h6>
                    </div>
                    {match == null ? <div className="active"></div> : ''}
                  </div>
                </Link>
                <Link to={`${url}/setting`} className="text-dark">
                  <div className="option d-flex align-items-center w-100">
                    <div className="icon">
                      <i className="fa fa-cog"></i>
                    </div>
                    <div className="name-option">
                      <h6 className="m-0">Setting</h6>
                    </div>
                    {match != null ? <div className="active"></div> : ''}
                  </div>
                </Link>
              </div>
            </div>
            <Switch>
              <div className="col-md-8 col-12 right">
                <div className="row info-top align-items-center">
                  <div className="col-md-3 col-4">
                    <div className="img">
                      <img src={mirai} alt="" />
                    </div>
                  </div>
                  <div className="col-md-8 col-6">
                    <div className="name-place">
                      <h5>Mirai Kuriyama</h5>
                      <span>Tokyo, Japan</span>
                    </div>
                  </div>
                </div>
                <Route exact path={path}>
                  <div className="row info-center mt-3">
                    <div className="col-md-12 form-group">
                      <label className="mb-3">Name</label>
                      <input type="text" name="name" id="name" className="input-info" value="Mirai Kuriyama" />
                    </div>
                    <div className="col-md-4 mt-3 form-group">
                      <label className="mb-3">Email</label>
                      <input type="text" name="email" id="email" className="input-info" value="MiraiKuriyama@gmail.com" />
                    </div>
                    <div className="col-md-4 mt-3 form-group">
                      <label className="mb-3">Phone</label>
                      <input type="text" name="phone" id="phone" className="input-info" value="(+629999)" />
                    </div>
                    <div className="col-md-4 mt-3 form-group">
                      <label className="mb-3">Location</label>
                      <input type="text" name="location" id="location" className="input-info" value="Tokyo, Japan" />
                    </div>
                  </div>
                  <div className="button-bottom d-flex justify-content-center w-100 mt-5">
                    <button>Save Changes</button>
                  </div>
                </Route>

                <Route path={`${path}/:menu`}>
                  <ProfileSetting />
                </Route>
              </div>
            </Switch>

          </div>
        </div>

        <section className="option-bottom">
          <div className="container">
            <div className="row align-items-center justify-content-center wrap-option-bottom">
              <Link to="/profile" className="col-4 option text-dark">
                <div>
                  <i className="fas fa-user"></i>
                  {match == null ? <div className="active"></div> : ''}
                </div>
              </Link>
              <Link to="/profile/setting" className="col-4 option text-dark">
                <div>
                  <i className="fa fa-cog"></i>
                  {match != null ? <div className="active"></div> : ''}
                </div>
              </Link>
            </div>
          </div>
        </section>

      </section>

    </>
  )
}

function ProfileSetting() {
  return (
    <>
      <div className="row info-center mt-3 w-100">
        <div className="col-md-6 mt-3 form-group">
          <label className="mb-3">Password</label>
          <input type="password" name="name" id="password" className="input-info" placeholder="Enter password" />
        </div>
        <div className="col-md-6 mt-3 form-group">
          <label className="mb-3">Confirmation password</label>
          <input type="password" name="email" id="confirmpassword" className="input-info" placeholder="Enter confirmation password" />
        </div>
        <div className="col-md-6 mt-3 form-group">
          <label className="mb-3">New password</label>
          <input type="password" name="phone" id="newpassword" className="input-info" placeholder="Enter a new password" />
        </div>
        <div className="col-md-6 mt-3 form-group">
          <label className="mb-3">Confirmation new password</label>
          <input type="password" name="location" id="newconfirmpassword" className="input-info"
            placeholder="Enter a new confirmation password" />
        </div>
      </div>
      <div className="button-bottom d-flex justify-content-center w-100 mt-5">
        <button>Save Changes</button>
      </div>
    </>
  )
}