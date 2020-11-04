import React from 'react';
import { mirai } from '../../assets/images/index';
import { Header } from '../../components/layout/index';

export default function Cart() {
  return (
    <>
      <Header />
      <section className="cart mt-5">
        <div className="container">
          <h2>Cart</h2>
          <div className="row wrap-card-cart justify-content-center">
            <div className="col-md-12 col-11 card-cart position-relative">
              <div className="img"><img src={mirai} alt="" /></div>
              <div className="row row-info align-items-center h-100">
                <div className="col-md-4 space"></div>
                <div className="col-md-6 info-product">
                  <div className="title">
                    <h4>aowkoakowkoakowkoakokwokaokokokoakokwoakowkowakowakoawkokaok</h4>
                  </div>
                  <div className="price">
                    <h5>Rp. 200.000</h5>
                  </div>
                </div>
              </div>
              <div className="size">
                <h5>Size XL</h5>
              </div>
            </div>
            <div className="col-md-12 col-11 card-cart position-relative">
              <div className="img"><img src={mirai} alt="" /></div>
              <div className="row row-info align-items-center h-100">
                <div className="col-md-4 space"></div>
                <div className="col-md-6 info-product">
                  <div className="title">
                    <h4>aowkoakowkoakowkoakokwokaokokokoakokwoakowkowakowakoawkokaok</h4>
                  </div>
                  <div className="price">
                    <h5>Rp. 200.000</h5>
                  </div>
                </div>
              </div>
              <div className="size">
                <h5>Size XL</h5>
              </div>
            </div>
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
              <h6>Checkout</h6>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
