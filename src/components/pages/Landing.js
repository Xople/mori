import React from 'react';
import { logo2, shape1, suit, triangle1, triangle2 } from '../../assets/images/index';
import { Header } from '../layout/index';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Landing() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Mori - Home</title>
      </Helmet>
      <Header />
      <section className="hero">
        <div className="shadow"></div>
        <div className="img-hero"></div>
        <div className="container d-flex align-items-center h-100">
          <div className="content-hero d-flex flex-column align-items-center">
            <div className="title d-flex justify-content-between w-100">
              <div className="left d-flex flex-column">
                <h1 className="text-light">Borrow</h1>
                <h1 className="text-light">and</h1>
                <h1 className="text-light">Boom</h1>
              </div>
              <div className="right">
                <img src={shape1} alt="" />
              </div>
            </div>
            <Link to="/products" className="button-width-75 mt-5">
              <button className="button button-light pl-5 pr-5 button-rounded-20 button-width-100">
                View More <i className="fa fa-chevron-right ml-3"></i>
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="preview-products mt-5 pb-5">
        <div className="top">
          <div className="container d-flex flex-column align-items-center">
            <h2>Top Suit</h2>
            <img src={suit} alt="" className="suit" />
            <div className="row top-suits mt-5">
              <div className="col-md-3 col-6">
                <div className="card-suit">
                  <div className="img-card"></div>
                  <div className="title-suit pt-4 pl-3">
                    <h5>Title Here</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="card-suit">
                  <div className="img-card"></div>
                  <div className="title-suit pt-4 pl-3">
                    <h5>Title Here</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="card-suit">
                  <div className="img-card"></div>
                  <div className="title-suit pt-4 pl-3">
                    <h5>Title Here</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="card-suit">
                  <div className="img-card"></div>
                  <div className="title-suit pt-4 pl-3">
                    <h5>Title Here</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="new mt-5">
          <div className="container d-flex flex-column align-items-center">
            <img src={suit} alt="" className="suit" />
            <h2>
              New Suit
            <img src={triangle1} alt="" className="triangle1" />
              <img src={triangle2} alt="" className="triangle2" />
            </h2>
            <div className="row new-suits mt-5">
              <div className="col-md-3 col-6">
                <div className="card-suit">
                  <div className="img-card"></div>
                  <div className="title-suit pt-4 pl-3">
                    <h5>Title Here</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="card-suit">
                  <div className="img-card"></div>
                  <div className="title-suit pt-4 pl-3">
                    <h5>Title Here</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="card-suit">
                  <div className="img-card"></div>
                  <div className="title-suit pt-4 pl-3">
                    <h5>Title Here</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="card-suit">
                  <div className="img-card"></div>
                  <div className="title-suit pt-4 pl-3">
                    <h5>Title Here</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="information pb-5 pt-5">
        <div className="container d-flex justify-content-between">
          <div className="left d-flex align-items-center">
            <img src={logo2} alt="" />
          </div>
          <div className="right d-flex">
            <div className="box about">
              <h4>About Us</h4>
              <div className="link d-flex flex-column">
                <a href="/">About</a>
              </div>
            </div>
            <div className="box socmed">
              <h4>Follow Us</h4>
              <div className="link d-flex flex-column">
                <a href="/">Instagram</a>
                <a href="/">Facebook</a>
                <a href="/">Twitter</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="d-flex justify-content-center align-items-center pt-3 pb-3 bg-dark">
        <h5 className="text-light">Mori Wardrobe &copy; 2020</h5>
      </footer>
    </>
  )
}
