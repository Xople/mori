import React, { useState, useEffect } from 'react';
import { mirai } from '../../assets/images/index';
import { Header } from '../../components/layout/index';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Products() {
  const [categoryMenu, setCategoryMenu] = useState(false);
  const [filterMenu, setFilterMenu] = useState(false);

  useEffect(() => {
    const clickWindow = (e) => {
      if (e.target.className !== "pt-2 btn-pop-up" && e.target.className !== "fa fa-chevron-down ml-1") {
        setFilterMenu(false)
        setCategoryMenu(false)
      }
    }
    window.addEventListener("click", clickWindow)
    return () => {
      window.removeEventListener("click", clickWindow)
    };
  }, []);

  const elCategory = () => {
    if (categoryMenu) {
      return (
        <div className="box-category d-flex flex-column">
          <div className="option d-flex align-items-center p-2">
            <i className="fas fa-tshirt"></i>
            <p className="m-0 pl-3">Suit</p>
          </div>
          <div className="option d-flex align-items-center p-2">
            <i className="fas fa-tshirt"></i>
            <p className="m-0 pl-3">Batik</p>
          </div>
        </div>
      )
    }
  }

  const elFilter = () => {
    if (filterMenu) {
      return (
        <div className="box-filter d-flex flex-column">
          <div className="option d-flex align-items-center p-2">
            <i className="fas fa-sort-alpha-up-alt"></i>
            <p className="m-0 pl-3">Short by A-Z</p>
          </div>
          <div className="option d-flex align-items-center p-2">
            <i className="fas fa-sort-alpha-down-alt"></i>
            <p className="m-0 pl-3">Short by Z-A</p>
          </div>
          <div className="option d-flex align-items-center p-2">
            <i className="fas fa-sort-amount-up"></i>
            <p className="m-0 pl-3">Short by Highest</p>
          </div>
          <div className="option d-flex align-items-center p-2">
            <i className="fas fa-sort-amount-down-alt"></i>
            <p className="m-0 pl-3">Short by Lowest</p>
          </div>
        </div>
      )
    }
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Mori - Products</title>
      </Helmet>
      <Header />
      <div className="filsearch mt-5">
        <div className="container pt-5">
          <div className="row justify-content-between">
            <div className="col-md-7 col-12 wrap-search">
              <div className="search-section d-flex flex-column justify-content-center">
                <form autoComplete="off">
                  <input type="text" name="keyword" id="keyword" placeholder="Search..." />
                  <button className="button-rounded-50 button-search">
                    <i className="fa fa-search"></i>
                  </button>
                </form>
              </div>
            </div>
            <div className="col-md-4 wrap-filter">
              <div className="row">
                <div className="col-md-6 col-6">
                  <div className="category d-flex justify-content-center align-items-center text-dark text-center">
                    <label
                      className="pt-2 btn-pop-up"
                      onClick={() => {
                        if (!categoryMenu) {
                          setCategoryMenu(true)
                          setFilterMenu(false)
                        } else {
                          setCategoryMenu(false)
                        }
                      }}
                    >
                      Category <i className="fa fa-chevron-down ml-1"></i>
                    </label>
                    {elCategory()}
                  </div>
                </div>
                <div className="col-md-6 col-6">
                  <div className="filter d-flex justify-content-center align-items-center text-dark text-center">
                    <label
                      className="pt-2 btn-pop-up"
                      onClick={() => {
                        if (!filterMenu) {
                          setFilterMenu(true)
                          setCategoryMenu(false)
                        } else {
                          setFilterMenu(false)
                        }
                      }}
                    >
                      Filter <i className="fa fa-chevron-down ml-1"></i>
                    </label>
                    {elFilter()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="products mt-5">
        <div className="container">
          <div className="row pb-5">
            <div className="col-md-3 col-6">
              <Link to="/product/detail">
                <div className="card-product pb-4">
                  <div className="img-card">
                    <div className="shadow"></div>
                    <div className="status pl-4 pr-4 pt-2 pb-2 bg-light">
                      Available
                </div>
                    <img src={mirai} alt="" />
                  </div>
                  <div className="info-product pt-4 pl-3 pb-3">
                    <h5>Title Here</h5>
                    <p>Rp. 200.000 / hari</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-3 col-6">
              <div className="card-product pb-4">
                <div className="img-card">
                  <div className="shadow"></div>
                  <div className="status pl-4 pr-4 pt-2 pb-2 bg-light">
                    Available
                </div>
                  <img src={mirai} alt="" />
                </div>
                <div className="info-product pt-4 pl-3 pb-3">
                  <h5>Title Here</h5>
                  <p>Rp. 200.000 / hari</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="card-product pb-4">
                <div className="img-card">
                  <div className="shadow"></div>
                  <div className="status pl-4 pr-4 pt-2 pb-2 bg-dark">
                    Not Available
                </div>
                  <img src={mirai} alt="" />
                </div>
                <div className="info-product pt-4 pl-3 pb-3">
                  <h5>Title Here</h5>
                  <p>Rp. 200.000 / hari</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="card-product pb-4">
                <div className="img-card">
                  <div className="shadow"></div>
                  <div className="status pl-4 pr-4 pt-2 pb-2 bg-light">
                    Available
                </div>
                  <img src={mirai} alt="" />
                </div>
                <div className="info-product pt-4 pl-3 pb-3">
                  <h5>Title Here</h5>
                  <p>Rp. 200.000 / hari</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
