import React, { useState, useEffect, useRef } from 'react';
import { Header } from '../../components/layout/index';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import useCategories from '../../hooks/useCategories';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

import ReactInfiniteScroll from 'react-infinite-scroller';
import { v4 as uuid } from 'uuid';
import { mirai } from '../../assets/images';

export default function Products() {
  const [categoryMenu, setCategoryMenu] = useState(false);
  const [filterMenu, setFilterMenu] = useState(false);

  const [products, lastLength, increasePage, setFilterBy, setSortBy] = useInfiniteScroll()
  const categories = useCategories()

  const refSearch = useRef()

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
            <div className="col-lg-7 col-md-12 wrap-search">
              <div className="search-section d-flex flex-column justify-content-center">
                <input type="text" name="keyword" id="keyword" placeholder="Search..." autoComplete="off" ref={refSearch} />
                <button className="button-rounded-50 button-search" onClick={() => setFilterBy("name", refSearch.current.value)}>
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 wrap-filter">
              <div className="row">
                <div className="col-md-6 col-6">
                  <div className="category d-flex justify-content-center align-items-center text-dark">
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
                    {categoryMenu && (
                      <div className="box-category d-flex flex-column">
                        {categories !== null && categories.map(c => (
                          <>
                            <div className="option d-flex align-items-center p-2" onClick={() => setFilterBy("category", c._id)} key={uuid()}>
                              <i className="fas fa-tshirt"></i>
                              <p className="m-0 pl-3">{c.name}</p>
                            </div>
                          </>
                        ))}
                      </div>
                    )}
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
                    {filterMenu && (
                      <div className="box-filter d-flex flex-column">
                        <div className="option d-flex align-items-center p-2" onClick={() => setSortBy("atoz")}>
                          <i className="fas fa-sort-alpha-up-alt"></i>
                          <p className="m-0 pl-3">Short by A-Z</p>
                        </div>
                        <div className="option d-flex align-items-center p-2" onClick={() => setSortBy("ztoa")}>
                          <i className="fas fa-sort-alpha-down-alt"></i>
                          <p className="m-0 pl-3">Short by Z-A</p>
                        </div>
                        <div className="option d-flex align-items-center p-2" onClick={() => setSortBy("hightolow")}>
                          <i className="fas fa-sort-amount-up"></i>
                          <p className="m-0 pl-3">Short by Highest</p>
                        </div>
                        <div className="option d-flex align-items-center p-2" onClick={() => setSortBy("lowtohigh")}>
                          <i className="fas fa-sort-amount-down-alt"></i>
                          <p className="m-0 pl-3">Short by Lowest</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="products mt-5">
        <div className="container">
          <ReactInfiniteScroll
            initialLoad={false}
            hasMore={lastLength === 0 ? false : true}
            loadMore={increasePage}
            loader={(
              <h1 key={uuid()}>Loading...</h1>
            )}
            key={uuid()}
          >
            <div className="row pb-5">
              {products !== null && products.map(p => (
                <div className="col-lg-3 col-md-4 col-6" key={p._id}>
                  <Link to={`/product/detail/${p._id}`}>
                    <div className="card-product pb-4">
                      <div className="img-card">
                        <div className="shadow"></div>
                        <div className="status pl-4 pr-4 pt-2 pb-2 bg-light">
                          Available
                        </div>
                        <img src={`${p.image}`} alt="" />
                      </div>
                      <div className="info-product pt-4 pl-3 pb-3 pr-2">
                        <h5>{p.name}</h5>
                        <p>Rp. {p.price} / hari</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </ReactInfiniteScroll>
        </div>
      </section>
    </>
  )
}
