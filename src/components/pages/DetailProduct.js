import React, { useState } from 'react';
import { mirai, shape2 } from '../../assets/images/index';
import { Header } from '../../components/layout/index';
import { Helmet } from 'react-helmet';

export default function DetailProduct() {
  const [sizeActive, setSizeActive] = useState("")

  const elCoba = (size) => {
    if (size !== sizeActive) return
    return (
      <div className="active"></div>
    )
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Mori - Detail Product</title>
      </Helmet>
      <Header />
      <section className="detail-product mt-5">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-md-7">
              <div className="left">
                <div className="img">
                  <img src={mirai} alt="" />
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="right">
                <h3 className="text-dark">Title Here</h3>
                <div className="row justify-content-between mt-5">
                  <div className="col-md-4 col-4">
                    <h6 className="text-dark">Stock</h6>
                  </div>
                  <div className="col-md-6 col-6">
                    <h6 className="text-dark">17</h6>
                  </div>
                </div>
                <div className="row justify-content-between mt-3">
                  <div className="col-md-4 col-4">
                    <h6 className="text-dark">Price</h6>
                  </div>
                  <div className="col-md-6 col-6">
                    <h6 className="text-dark">Rp. 200.00/day</h6>
                  </div>
                </div>
                <div className="size d-flex flex-column mt-5">
                  <h4>Size</h4>
                  <div className="row mt-4">
                    <div className="col-md-3 col-3">
                      <div
                        className="card-size d-flex align-items-center justify-content-center"
                        id="S"
                        onClick={() => sizeActive !== "S" ? setSizeActive("S") : setSizeActive("")}
                      >
                        <h5>S</h5>
                        {elCoba("S")}
                      </div>
                    </div>
                    <div className="col-md-3 col-3">
                      <div
                        className="card-size d-flex align-items-center justify-content-center"
                        id="M"
                        onClick={() => sizeActive !== "M" ? setSizeActive("M") : setSizeActive("")}
                      >
                        <h5>M</h5>
                        {elCoba("M")}
                      </div>
                    </div>
                    <div className="col-md-3 col-3">
                      <div
                        className="card-size d-flex align-items-center justify-content-center"
                        id="L"
                        onClick={() => sizeActive !== "L" ? setSizeActive("L") : setSizeActive("")}
                      >
                        <h5>L</h5>
                        {elCoba("L")}
                      </div>
                    </div>
                    <div className="col-md-3 col-3">
                      <div
                        className="card-size d-flex align-items-center justify-content-center"
                        id="XL"
                        onClick={() => sizeActive !== "XL" ? setSizeActive("XL") : setSizeActive("")}
                      >
                        <h5>XL</h5>
                        {elCoba("XL")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="description mt-5">
        <div className="container">
          <h3>
            Description
          <img src={shape2} alt="" />
          </h3>
          <div className="text-description mt-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat alias in, eum ducimus accusamus sed eligendi.
            Iusto vel reiciendis voluptatibus.
        </div>
        </div>
      </section>

      <section className="price-info bg-dark w-100 pt-2 pb-2">
        <div className="container d-flex justify-content-between position-relative">
          <div className="left">
            <h5 className="text-light">Total Harga</h5>
            <h6 className="text-light">Rp. 200.000</h6>
          </div>
          <div className="right">
            <div className="button-cart d-flex justify-content-center align-items-center">
              <i className="fas fa-shopping-cart"></i>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
