import React from 'react';
import { Landing, Products, DetailProduct, SignIn, SignUp, Cart, Profile } from './components/pages/index';
import { Sidebar } from './components/layout/index';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './assets/scss/style.scss';

function App() {
  return (
    <>
      <Router>
        <Sidebar />
        <div className="wrapper">
          <Switch>

            <Route exact path="/">
              <Landing />
            </Route>

            <Route path="/products">
              <Products />
            </Route>

            <Route path="/product/detail">
              <DetailProduct />
            </Route>

            <Route path="/cart">
              <Cart />
            </Route>

            <Route path="/profile">
              <Profile />
            </Route>

            <Route path="/signin">
              <SignIn />
            </Route>

            <Route path="/SignUp">
              <SignUp />
            </Route>

          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
