import React, { useState } from 'react';
import { mirai } from '../../assets/images/index';
import { Header } from '../../components/layout/index';
import useUserProfile from '../../hooks/useUserProfile';
import { v4 as uuid } from 'uuid';
import { motion } from 'framer-motion';
import { Link, Redirect } from 'react-router-dom';
import useTransaction from '../../hooks/useTransaction';
import useCart from '../../hooks/useCart';

export default function Cart() {
  const [profile] = useUserProfile()
  const [modal, setModal] = useState({ checkout: false })
  const [totalPrice, setTotalPrice] = useState(0)
  const [justOne, setJustOne] = useState(false)
  const [days, setDays] = useState(0)
  const [products, setProducts] = useState([])

  let cart = JSON.parse(localStorage.getItem("cart")) || null
  let userCart = cart ? cart.filter(c => c.user.includes(profile !== null && profile._id)) : null
  const cartPost = cart ? cart.map(c => ({ _id: c._id, size: c.size, stock: c.stock })) : null
  const [price, setPrice] = useState(0)
  const [checkCart] = useCart(cartPost)

  const [checkout, success, error, loading] = useTransaction()

  const variantsModal = {
    open: { opacity: 1, zIndex: 10 },
    close: { opacity: 0, zIndex: -10 }
  }
  const variantsBox = {
    open: { opacity: 1, scale: 1, zIndex: 10 },
    close: { opacity: 0, scale: .9, zIndex: -10 }
  }

  console.log(checkCart)

  return (
    <>
      {success && (<Redirect to="/profile/transactions" />)}
      {justOne && (<Redirect to="/cart" />)}
      <Header />
      <section className="cart mt-5">
        <div className="container">
          {cart === null || userCart.length === 0 || userCart === null ? (
            <div className="text-center pt-5">
              <h3>There's no products in cart</h3>
              <Link to="/products">
                <button className="bg-dark pt-2 pb-2 pr-4 pl-4 mt-3">Products</button>
              </Link>
            </div>

          ) : (
            <>
              <h2>Cart</h2>
              <div className="row wrap-card-cart justify-content-center">
                {cart !== null && userCart.map(c => {
                  const thisProduct = checkCart != null && checkCart.find(cc => cc._id === c._id)
                  c["available"] = thisProduct.available
                  return (
                    <>
                      <div className="col-md-12 col-11 card-cart position-relative" key={uuid()}>
                        <div className="img"><img src={c.image} alt="" /></div>
                        {c.available === false && <div className="oos d-flex justify-content-center align-items-center"><h6>Out of stocks</h6></div>}
                        <div className="row row-info align-items-center h-100">
                          <div className="col-md-4 space"></div>
                          <div className="col-md-6 info-product">
                            <div className="title">
                              <h4 className="mb-0" style={{ textDecoration: c.available ? "none" : "line-through" }}>{c.name}</h4>
                            </div>
                            <div className="price">
                              <h5 className="mb-0" style={{ textDecoration: c.available ? "none" : "line-through" }}>Rp. {c.price * c.stock}</h5>
                            </div>
                          </div>
                        </div>
                        <div className="size">
                          <h5 className="mb-0" style={{ textDecoration: c.available ? "none" : "line-through" }}>Size {c.size}</h5>
                        </div>
                        <div
                          className="delete d-flex align-items-center justify-content-center"
                          onClick={(e) => {
                            const delCart = cart.filter(dc => dc.idCart !== c.idCart)
                            let newUserCart = delCart.filter(c => c.user.includes(profile !== null && profile._id))

                            if (userCart.length === 1) setJustOne(true)

                            delCart.length >= 1 ? localStorage.setItem("cart", JSON.stringify(delCart)) : localStorage.removeItem("cart")

                            setPrice(newUserCart.reduce((acc, currentValue) => acc + currentValue.price, 0))

                            // e.currentTarget.parentNode.remove()
                          }}
                        >
                          <i className="fa fa-trash"></i>
                        </div>
                      </div>
                    </>
                  )
                }
                )}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="price-info bg-dark w-100 pt-2 pb-2">
        <div className="container d-flex justify-content-between position-relative">
          <div className="left">
            <h5 className="text-light">Total Harga</h5>
            <h6 className="text-light">Rp. {price === 0 ? cart && userCart.filter(({ available }) => available === true).reduce((acc, currentValue) => acc + currentValue.price * currentValue.stock, 0) : price}</h6>
          </div>

          {cart && userCart.length !== 0 && (
            <div className="right">
              <div
                className="button-cart d-flex justify-content-center align-items-center"
                onClick={() => {
                  setModal({ checkout: true })
                  cart && setProducts(userCart.filter(({ available }) => available === true).map(c => ({ _id: c._id, size: c.size, stock: c.stock })))
                  cart && setPrice(userCart.filter(({ available }) => available === true).reduce((acc, currentValue) => acc + currentValue.price * currentValue.stock, 0))
                }}>
                <h6 className="mb-0">Checkout</h6>
              </div>
            </div>
          )}
        </div>
      </section>

      <motion.div
        className="wrap-modal d-flex align-items-center"
        variants={variantsModal}
        animate={modal.checkout ? "open" : "close"}
        transition={{ duration: .2, delay: .9 }}
      >
        <div className="container d-flex justify-content-center">
          <motion.div
            className="box p-3 pt-5 pb-5"
            variants={variantsBox}
            animate={modal.checkout ? "open" : "close"}
            transition={{ duration: .6 }}
          >
            <h3>Checkout</h3>
            <div className="field mt-3 d-flex flex-column">
              <label htmlFor="deadline">Deadline of borrowing</label>
              <input
                type="number" name="deadline"
                id="deadline" min="0"
                onChange={(e) => {
                  e.target.value !== "" ? setTotalPrice(parseInt(e.target.value) * price) : setTotalPrice(1 * price)
                  e.target.value !== "" ? setDays(e.target.value) : setDays(0)
                }}
              />
            </div>
            <div className="bg-dark mt-3 p-3 d-flex flex-column">
              {cart && userCart.map(c => (
                <>
                  {c.available && (
                    <div className="d-flex mt-2 justify-content-between">
                      <h6>{c.name} <span className="bg-light p-1">{c.size}</span></h6>
                      <h6>Rp. {c.price * c.stock}</h6>
                    </div>
                  )}
                </>
              ))}
              <div className="d-flex mt-2 justify-content-between">
                <h6>Day</h6>
                <h6>{days}</h6>
              </div>
              <div className="total mt-2 d-flex justify-content-between">
                <h6>Price Total</h6>
                <h6>Rp. {totalPrice === 0 ? cart && userCart.filter(({ available }) => available === true).reduce((acc, currentValue) => acc + currentValue.price * currentValue.stock, 0) : totalPrice}</h6>
              </div>
            </div>
            {error && (<p className="p-2 bg-dark mb-0 mt-3">Failed !</p>)}
            <div className="d-flex justify-content-between w-100 mt-3">
              <button className="bg-purple pb-2 pt-2" style={{ width: "48%" }} onClick={() => {
                setModal({ checkout: false })
                cart && setProducts([])
              }}>Cancel</button>
              <button
                className="bg-dark pb-2 pt-2 d-flex justify-content-center align-items-center" style={{ width: "48%" }}
                onClick={() => {
                  const values = {
                    email: profile !== null && profile.email,
                    days: days,
                    totalPrice: totalPrice,
                    products: products
                  }
                  const delCart = cart.filter(c => c.user !== profile._id)

                  console.log(delCart)

                  checkout(values)
                    .then(res => res && localStorage.setItem("cart", JSON.stringify(delCart)))

                }}
              >
                {loading ? (<div className="loading"></div>) : (<span>Order</span>)}
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}
