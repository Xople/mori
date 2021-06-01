import React, { useState } from 'react';
import { Landing, Products, DetailProduct, SignIn, SignUp, Cart, Profile, ActivateAcc, Activate } from './components/pages/index';
import { Sidebar } from './components/layout/index';
import { motion } from 'framer-motion';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './assets/scss/style.scss';
import SigninContext from './helper/SignInContext'
import useTokenExpired from './hooks/useTokenExpired';

function App() {

  const [authenticated] = useTokenExpired()
  const { token, expired } = localStorage

  return (
    <>
      <Router>
        <SigninContext.Provider value={{ authenticated }}>
          {token && expired === "true" && (<ModalTokenExpired />)}
          <Sidebar />
          <div className="wrapper">
            <Switch>

              <Route exact path="/">
                <Landing />
              </Route>

              <Route path="/products">
                <Products />
              </Route>

              <Route path="/product/detail/:id">
                <DetailProduct />
              </Route>

              <PrivateRoute path="/cart">
                <Cart />
              </PrivateRoute>

              <PrivateRoute path="/profile">
                <Profile />
              </PrivateRoute>

              <FormRoute path="/signin">
                <SignIn />
              </FormRoute>

              <FormRoute path="/signUp">
                <SignUp />
              </FormRoute>

              <ActivateRoute path="/active">
                <Activate />
              </ActivateRoute>

              <ActivateRoute path="/activate/:token">
                <ActivateAcc />
              </ActivateRoute>

            </Switch>
          </div>
        </SigninContext.Provider>
      </Router>
    </>
  );
}

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => localStorage.getItem("token") ? (
        children
      ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location }
            }}
          />
        )}
    />
  )
}

const FormRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => !localStorage.getItem("token") ? (
        children
      ) : (
          <Redirect
            to={{
              pathname: "/profile",
              state: { from: location }
            }}
          />
        )}
    />
  )
}

const ActivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => localStorage.getItem("need_activate") ? (
        children
      ) : localStorage.getItem("token") ? (
        <Redirect
          to={{
            pathname: "/profile",
            state: { from: location }
          }}
        />
      ) : (
            <Redirect
              to={{
                pathname: "/signup",
                state: { from: location }
              }}
            />
          )
      }
    />
  )
}

const ModalTokenExpired = () => {
  const { token, expired } = localStorage
  const [logoutDone, setLogoutDone] = useState(false)
  const variantsModal = {
    open: { opacity: 1, zIndex: 10 },
    close: { opacity: 0, zIndex: -10 }
  }
  const variantsBox = {
    open: { opacity: 1, scale: 1 },
    close: { opacity: 0, scale: .9 }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("time_expired")
    localStorage.removeItem("expired")

    setLogoutDone(true)
  }
  return (
    <>
      {logoutDone && (<Redirect to="/signin" />)}
      <motion.div
        className="wrap-modal d-flex align-items-center"
        variants={variantsModal}
        animate={expired && token ? "open" : "close"}
        transition={{ duration: .2, delay: .9 }}
      >
        <div className="container d-flex justify-content-center">
          <motion.div
            className="box d-flex flex-column justify-content-center align-items-center text-center p-3 pt-5 pb-5"
            variants={variantsBox}
            animate={expired && token ? "open" : "close"}
            transition={{ duration: .8 }}
          >
            <h5>Token Expired, Login Again</h5>
            <button className="bg-dark pt-2 pb-2 pl-4 pr-4 mt-3">
              <h6 className="mb-0" onClick={() => logout()}>Okay</h6>
            </button>
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}


export default App;
