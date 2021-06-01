import React, { useState } from 'react';
import { mirai, shape2 } from '../../assets/images/index';
import { Header } from '../../components/layout/index';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { motion } from 'framer-motion';

import useDetailProduct from '../../hooks/useDetailProduct';
import useUserProfile from '../../hooks/useUserProfile';

export default function DetailProduct() {
  const [sizeActive, setSizeActive] = useState("")
  const { id } = useParams()

  const [detailProduct, stock] = useDetailProduct(id)
  const [profile] = useUserProfile()

  const { token } = localStorage

  const [modal, setModal] = useState({ success: false, error: false })

  const variantsModal = {
    open: { opacity: 1, zIndex: 10 },
    close: { opacity: 0, zIndex: -10 }
  }
  const variantsBox = {
    open: { opacity: 1, scale: 1 },
    close: { opacity: 0, scale: .9 }
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
            <div className="col-lg-7 col-md-12">
              <div className="left">
                <div className="img">
                  <img src={detailProduct && detailProduct.image} alt="" />
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="right">
                <h3 className="text-dark">{detailProduct && detailProduct.name}</h3>
                <div className="row justify-content-between mt-5">
                  <div className="col-md-4 col-4">
                    <h6 className="text-dark">Stock</h6>
                  </div>
                  <div className="col-md-6 col-6">
                    <h6 className="text-dark">{stock}</h6>
                  </div>
                </div>
                <div className="row justify-content-between mt-3">
                  <div className="col-md-4 col-4">
                    <h6 className="text-dark">Price</h6>
                  </div>
                  <div className="col-md-6 col-6">
                    <h6 className="text-dark">Rp. {detailProduct && detailProduct.price}/day</h6>
                  </div>
                </div>
                <div className="size d-flex flex-column mt-5">
                  <h4>Size</h4>
                  <div className="row mt-4">
                    {detailProduct && detailProduct.stocks.map(s => (
                      <>
                        <div className="col-md-3 col-3" key={uuid()}>
                          <div
                            className="card-size d-flex align-items-center justify-content-center"
                            id={s.size}
                            onClick={() => sizeActive !== s.size ? setSizeActive(s.size) : setSizeActive("")}
                          >
                            <h5 className="m-0">{s.size}</h5>
                            {sizeActive === s.size && (<div className="active"></div>)}
                          </div>
                        </div>
                      </>
                    ))}
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
            {detailProduct !== null && detailProduct.description}
          </div>
        </div>
      </section>

      <section className="price-info bg-dark w-100 pt-2 pb-2">
        <div className="container d-flex justify-content-between position-relative">
          <div className="left">
            <h5 className="text-light">Price</h5>
            <h6 className="text-light">Rp. {detailProduct && detailProduct.price}</h6>
          </div>
          {token && (
            <div className="right">
              <div
                className="button-cart d-flex justify-content-center align-items-center"
                onClick={() => {
                  // try {
                  let cart = JSON.parse(localStorage.getItem("cart")) || null
                  let thisProduct = cart.filter(c => c._id.includes(detailProduct._id))
                  let userProduct = profile && thisProduct.find(tp => tp.user === profile._id)
                  let userCartProduct = cart.find(tp => tp.user === profile._id && tp._id === detailProduct._id && tp.size === sizeActive)
                  let notUserCartProduct = userCartProduct !== undefined ? cart.filter(tp => tp.idCart !== userCartProduct.idCart) : null
                  const product = detailProduct !== null && [{
                    idCart: uuid(),
                    user: profile !== null && profile._id,
                    _id: detailProduct._id,
                    name: detailProduct.name,
                    price: detailProduct.price,
                    size: sizeActive,
                    image: detailProduct.image,
                    stock: userCartProduct ? userCartProduct.stock + 1 : 1,
                  }]
                  cart !== null && userCartProduct === undefined ? cart.push(...product) : notUserCartProduct.push(...product)
                  console.log(product)
                  console.log(userCartProduct)
                  console.log(notUserCartProduct)
                  cart !== null && userCartProduct === undefined ? localStorage.setItem("cart", JSON.stringify(cart)) : localStorage.setItem("cart", JSON.stringify(notUserCartProduct))

                  setModal({ success: true, error: false })

                  setTimeout(() => {
                    setModal({ success: false, error: false })
                  }, 2000)

                  // } catch (error) {
                  //   setModal({ success: false, error: true })
                  //   setTimeout(() => {
                  //     setModal({ success: false, error: false })
                  //   }, 2000)
                  // }
                }}
              >
                <i className="fas fa-shopping-cart"></i>
              </div>
            </div>
          )}
        </div>
      </section>
      <motion.div
        className="wrap-modal d-flex align-items-center"
        variants={variantsModal}
        animate={modal.success ? "open" : "close"}
        transition={{ duration: .2, delay: .9 }}
      >
        <div className="container d-flex justify-content-center">
          <motion.div
            className="box d-flex flex-column justify-content-center align-items-center text-center p-3 pt-5 pb-5"
            variants={variantsBox}
            animate={modal.success ? "open" : "close"}
            transition={{ duration: .8 }}
          >
            <i className="fa fa-check-circle fa-3x mb-3"></i>
            <h4>Data successfully add into cart</h4>
          </motion.div>
        </div>
      </motion.div>
      <motion.div
        className="wrap-modal d-flex align-items-center"
        variants={variantsModal}
        animate={modal.error ? "open" : "close"}
        transition={{ duration: .2, delay: .9 }}
      >
        <div className="container d-flex justify-content-center">
          <motion.div
            className="box d-flex flex-column justify-content-center align-items-center text-center p-3 pt-5 pb-5"
            variants={variantsBox}
            animate={modal.error ? "open" : "close"}
            transition={{ duration: .8 }}
          >
            <i className="fa fa-time-circle fa-3x mb-3"></i>
            <h4>There' something wrong</h4>
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}
