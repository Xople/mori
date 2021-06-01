import React, { useRef, useState } from 'react';
import { Header } from '../../components/layout/index';
import { Link, Route, useRouteMatch } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { motion } from 'framer-motion';
import useUserProfile from '../../hooks/useUserProfile';

export default function Profile() {
  let { path, url } = useRouteMatch()
  let match = useRouteMatch("/profile/:menu")

  const [profile, loading, success, error, profileForm, setBiodata, updateBiodata, , modalPicture, openModalChangePicture, closeModalChangePicture, previewPicture, handleUpload, changePicture] = useUserProfile()

  const refPicture = useRef()
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
      <Header />
      <section className="profile h-100">
        <motion.div
          className="wrap-modal d-flex align-items-center"
          variants={variantsModal}
          animate={success.updateBiodata || success.updatePassword ? "open" : "close"}
          transition={{ duration: .2, delay: .9 }}
        >
          <div className="container d-flex justify-content-center">
            <motion.div
              className="box d-flex flex-column justify-content-center align-items-center text-center p-3 pt-5 pb-5"
              variants={variantsBox}
              animate={success.updateBiodata || success.updatePassword ? "open" : "close"}
              transition={{ duration: .8 }}
            >
              <i className="fa fa-check-circle fa-3x mb-3"></i>
              <h4>Data successfully changed</h4>
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          className="wrap-modal d-flex align-items-center"
          variants={variantsModal}
          animate={error.updateBiodata || error.updatePassword ? "open" : "close"}
          transition={{ duration: .2, delay: .9 }}
        >
          <div className="container d-flex justify-content-center">
            <motion.div
              className="box d-flex flex-column justify-content-center align-items-center text-center p-3 pt-5 pb-5"
              variants={variantsBox}
              animate={error.updateBiodata || error.updatePassword ? "open" : "close"}
              transition={{ duration: .6 }}
            >
              <i className="fa fa-times-circle fa-3x mb-3"></i>
              <h4>Something went wrong</h4>
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          className="wrap-modal d-flex align-items-center"
          variants={variantsModal}
          animate={modalPicture ? "open" : "close"}
          transition={{ duration: .2, delay: .9 }}
        >
          <div className="container d-flex justify-content-center">
            <motion.div
              className="box d-flex flex-column justify-content-center align-items-center text-center p-3 pt-5 pb-5"
              variants={variantsBox}
              animate={modalPicture ? "open" : "close"}
              transition={{ duration: .6 }}
            >
              <div
                className="img"
                onClick={() => {
                  refPicture.current.click()
                }}
              >
                <img src={previewPicture !== null ? previewPicture : 'user.jpg'} alt="" />
                <div className="shadow d-flex justify-content-center align-items-center">
                  <i className="fa fa-camera fa-2x"></i>
                </div>
              </div>
              <Formik
                initialValues={{ file: '' }}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    changePicture(values)
                  }, 400)

                }}
              >
                {({ isSubmitting, setFieldValue }) => (
                  <Form>
                    <input type="file" ref={refPicture} name="file" id="file" className="d-none" onChange={(e) => {
                      handleUpload(e)
                      setFieldValue('file', e.currentTarget.files[0])
                    }} />
                    {error.updateProfilePicture && (<p className="pt-2 pb-2 pl-0 pr-0 bg-dark mb-0 mt-4">Failed !</p>)}
                    <div className="button mt-4 d-flex justify-content-between w-100">
                      <button type="button" className="bg-dark pt-2 pr-4 pb-2 pl-4 mr-3" onClick={() => closeModalChangePicture()}>Close</button>
                      <button type="submit" disabled={loading.updateProfilePicture || previewPicture === null} className="bg-light pt-2 pr-4 pb-2 pl-4 d-flex justify-content-center align-items-center">
                        {!loading.updateProfilePicture && (
                          <span>Change</span>
                        )}
                        {loading.updateProfilePicture && (
                          <div className="loading"></div>
                        )}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </motion.div>
          </div>
        </motion.div>
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
                    {match === null ? <div className="active"></div> : ''}
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
                    {match !== null && match.url.split('/')[2] === "setting" ? <div className="active"></div> : ''}
                  </div>
                </Link>
                <Link to={`${url}/transactions`} className="text-dark">
                  <div className="option d-flex align-items-center w-100">
                    <div className="icon">
                      <i className="fa fa-shopping-cart"></i>
                    </div>
                    <div className="name-option">
                      <h6 className="m-0">Transactions</h6>
                    </div>
                    {match !== null && match.url.split('/')[2] === "transactions" ? <div className="active"></div> : ''}
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-md-8 col-12 right">
              <Route exact path={path}>
                <div className="row info-top align-items-center">
                  <div className="col-md-3 col-4">
                    <div className="img" onClick={() => openModalChangePicture()}>
                      <img src={`http://127.0.0.1:8080/uploads/images/${profile !== null ? profile.profilePict : 'user.jpg'}`} alt="" />
                    </div>
                  </div>
                  <div className="col-md-8 col-6">
                    <div className="name-place">
                      <h5>{profile !== null && profile.name}</h5>
                    </div>
                  </div>
                </div>
                <Formik
                  initialValues={{ phone: '', name: '' }}
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      updateBiodata(profileForm)
                      setSubmitting(false)
                    }, 400)

                  }}
                >
                  {({ isSubmitting }) => (
                    <Form autoComplete="off">
                      <div className="row info-center mt-3">
                        <div className="col-md-12 form-group">
                          <label className="mb-3">Name</label>
                          <Field type="text" name="name" id="name" className="input-info" placeholder="Masukkan nama" value={profileForm !== null && profileForm.name} onChange={(e) => setBiodata({ phone: profileForm.phone, name: e.target.value })} />
                        </div>
                        <div className="col-md-6 mt-3 form-group">
                          <label className="mb-3">Email</label>
                          <input type="text" name="email" id="email" className="input-info" value={profile !== null && profile.email} readOnly />
                        </div>
                        <div className="col-md-6 mt-3 form-group">
                          <label className="mb-3">Phone</label>
                          <Field type="text" name="phone" id="phone" className="input-info" placeholder="Masukkan nomor telepon" value={profileForm !== null && profileForm.phone} onChange={(e) => setBiodata({ phone: e.target.value, name: profileForm.name })} />
                        </div>
                      </div>
                      <div className="button-bottom d-flex justify-content-center w-100 mt-5">
                        <button type="submit" disabled={loading.updateBiodata} className="d-flex align-items-center justify-content-center">
                          {loading.updateBiodata === false && (
                            <span>Save Changes</span>
                          )}
                          {loading.updateBiodata === true && (
                            <div className="loading"></div>
                          )}
                        </button>

                      </div>
                    </Form>
                  )}
                </Formik>


              </Route>
              <Route path={`${path}/setting`}>
                <div className="row info-top align-items-center">
                  <div className="col-md-3 col-4">
                    <div className="img" onClick={() => openModalChangePicture()}>
                      <img src={`http://127.0.0.1:8080/uploads/images/${profile !== null ? profile.profilePict : 'user.jpg'}`} alt="" />
                    </div>
                  </div>
                  <div className="col-md-8 col-6">
                    <div className="name-place">
                      <h5>{profile !== null && profile.name}</h5>
                    </div>
                  </div>
                </div>
                <ProfileSetting />
              </Route>
              <Route path={`${path}/transactions`}>
                <ProfileTransactions />
              </Route>
            </div>

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
                  {match !== null && match.url.split('/')[2] === "setting" ? <div className="active"></div> : ''}
                </div>
              </Link>
              <Link to="/profile/transactions" className="col-4 option text-dark">
                <div>
                  <i className="fa fa-shopping-cart"></i>
                  {match !== null && match.url.split('/')[2] === "transactions" ? <div className="active"></div> : ''}
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
  const [, loading, success, error, , , , updatePassword] = useUserProfile()

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
      <motion.div
        className="wrap-modal d-flex align-items-center"
        variants={variantsModal}
        animate={success.updateBiodata || success.updatePassword ? "open" : "close"}
        transition={{ duration: .2, delay: .9 }}
      >
        <div className="container d-flex justify-content-center">
          <motion.div
            className="box d-flex flex-column justify-content-center align-items-center text-center p-3 pt-5 pb-5"
            variants={variantsBox}
            animate={success.updateBiodata || success.updatePassword ? "open" : "close"}
            transition={{ duration: .6 }}
          >
            <i className="fa fa-check-circle fa-3x mb-3"></i>
            <h4>Data successfully changed</h4>
          </motion.div>
        </div>
      </motion.div>
      <motion.div
        className="wrap-modal d-flex align-items-center"
        variants={variantsModal}
        animate={error.updateBiodata || error.updatePassword ? "open" : "close"}
        transition={{ duration: .2, delay: .9 }}
      >
        <div className="container d-flex justify-content-center">
          <motion.div
            className="box d-flex flex-column justify-content-center align-items-center text-center p-3 pt-5 pb-5"
            variants={variantsBox}
            animate={error.updateBiodata || error.updatePassword ? "open" : "close"}
            transition={{ duration: .8 }}
          >
            <i className="fa fa-times-circle fa-3x mb-3"></i>
            <h4>Something went wrong</h4>
          </motion.div>
        </div>
      </motion.div>
      <Formik
        initialValues={{ password: '', confirmPassword: '', newPassword: '', confirmNewPassword: '' }}
        onSubmit={(values, { setSubmitting }) => {
          updatePassword(values)
          console.log(values)
          setTimeout(() => {
            setSubmitting(false)
          }, 2000)
        }}
      >
        {({ isSubmitting }) => (
          <Form autoComplete="off">
            <div className="row info-center mt-3 w-100">
              <div className="col-md-6 mt-3 form-group">
                <label className="mb-3">Password</label>
                <Field type="password" name="password" id="password" className="input-info" placeholder="Enter password" />
              </div>
              <div className="col-md-6 mt-3 form-group">
                <label className="mb-3">Confirmation password</label>
                <Field type="password" name="confirmPassword" id="confirmpassword" className="input-info" placeholder="Enter confirmation password" />
              </div>
              <div className="col-md-6 mt-3 form-group">
                <label className="mb-3">New password</label>
                <Field type="password" name="newPassword" id="newpassword" className="input-info" placeholder="Enter a new password" />
              </div>
              <div className="col-md-6 mt-3 form-group">
                <label className="mb-3">Confirmation new password</label>
                <Field type="password" name="confirmNewPassword" id="confirmNewPassword" className="input-info"
                  placeholder="Enter a new confirmation password" />
                <ErrorMessage name="confirmNewPassword" component="sub" />
              </div>
            </div>
            <div className="button-bottom d-flex justify-content-center w-100 mt-5">
              <button type="submit" disabled={loading.updatePassword} className="d-flex justify-content-center align-items-center">
                {loading.updatePassword === false && (
                  <span>Save Changes</span>
                )}
                {loading.updatePassword === true && (
                  <div className="loading"></div>
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

function ProfileTransactions() {
  const [
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    , checkout, orders, filterOrders] = useUserProfile()

  let { path } = useRouteMatch()
  let match = useRouteMatch(`${path}/orders`)
  const [filterBy, setFilterBy] = useState("ongoing")
  const [modal, setModal] = useState({order: false})
  const [orderPreview, setOrderPreview] = useState(null)
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
      <div className="row">
        <div className="col-lg-6 col-6">
          <Link to={path}>
            <div className="text-center position-relative top-transactions pt-2 pb-2">
              <h5 className="mb-0">Checkout</h5>
              {match === null && (<div className="active"></div>)}
            </div>
          </Link>
        </div>

        <div className="col-lg-6 col-6">
          <Link to={`${path}/orders`}>
            <div className="text-center position-relative top-transactions pt-2 pb-2">
              <h5 className="mb-0">Orders</h5>
              {match !== null && (<div className="active"></div>)}
            </div>
          </Link>
        </div>
      </div>

      <Route path={path} exact>
        {checkout && checkout.length !== 0 ? (
          <div className="row row-checkout pt-5 pb-5">
            {checkout && checkout.map(c => (
              <>
                <div className="col-lg-12" key={c._id}>
                  <div className="d-flex justify-content-between align-items-center checkout p-3 mt-3">
                    <div className="left d-flex flex-column">
                      <span>{c.bookingCode}</span>
                      <span>Deadline : {`${c.overDue.split("T")[0]} - ${c.overDue.split("T")[1].split(".")[0]}`}</span>
                      <span className="mt-3">Rp. {c.totalPrice}</span>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        ) : (
          <h5 className="text-center mt-5">There's no checkout</h5>
        )}
      </Route>

      <Route path={`${path}/orders`}>
        {orders && orders.length !== 0 ? (
          <>
        <div className="col-lg-12 pt-5" style={{ userSelect: "none" }}>
          Filter By : <span
            className={`${filterBy === "ongoing" && "bg-dark"} p-2 mr-2`}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setFilterBy("ongoing")
              filterOrders("ongoing")
            }}
          >On Going</span>
          <span
            className={`${filterBy === "finished" && "bg-dark"} p-2 mr-2`}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setFilterBy("finished")
              filterOrders("finished")
            }}
          >Finished</span>
        </div>
        <div className="row row-checkout pt-4 pb-5">
          {orders && orders.map(o => (
            <>
              <div className="col-lg-12" key={o._id}>
                <div className="d-flex justify-content-between align-items-center checkout p-3 mt-3">
                  <div className="left d-flex flex-column">
                    <span>{o.bookingCode}</span>
                    <span>Returning Time : {`${o.overDue.split("T")[0]} - ${o.overDue.split("T")[1].split(".")[0]}`}</span>
                    <span className="mt-3">Rp. {o.totalPrice}</span>
                  </div>
                  <div className="right">
                    <button 
                    className="bg-light p-2" 
                    onClick={() => {
                      setOrderPreview(o)
                      setModal({order: true})
                    }}>Detail</button>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
          </>
        ) : (<h5 className="text-center mt-5">There's no orders</h5>)}

        <motion.div
          className="wrap-modal d-flex align-items-center"
          variants={variantsModal}
          animate={modal.order ? "open" : "close"}
          transition={{ duration: .2, delay: .9 }}
        >
          <div className="container d-flex justify-content-center">
            <motion.div
              className="box text-center p-3 pt-4 pb-4 bg-dark position-relative"
              variants={variantsBox}
              animate={modal.order ? "open" : "close"}
              transition={{ duration: .8 }}
              style={{boxShadow: "7px 7px 0 #8D93AB"}}
            >
              <div 
              className="btn-close position-absolute bg-light d-flex align-items-center justify-content-center"
              style={{top: "-10px", right: "-10px", borderRadius: "50%", width: "40px", height: "40px", cursor: "pointer"}}
              onClick={() => {
                setModal({order: false})
                setOrderPreview(null)
              }}
              >
                <i className="fa fa-times"></i>
              </div>
              <h4>Detail Order</h4>
              <p>{orderPreview && orderPreview.status}</p>
              <div className="d-flex mt-5 justify-content-between w-100">
                <h6>Email</h6>
                <h6>{orderPreview && orderPreview.email}</h6>
              </div>
              <div className="d-flex mt-3 justify-content-between w-100">
                <h6>Days</h6>
                <h6>{orderPreview && orderPreview.days}</h6>
              </div>
              <div className="d-flex mt-3 justify-content-between w-100">
                <h6>Date</h6>
                <h6>{orderPreview && orderPreview.date.split("T")[0]}</h6>
              </div>
              <div className="d-flex mt-3 justify-content-between w-100">
                <h6>Overdue</h6>
                <h6>{orderPreview && orderPreview.overDue.split("T")[0]}</h6>
              </div>
              <div className="d-flex mt-3 justify-content-between w-100">
                <h6>Total Price</h6>
                <h6>{orderPreview && orderPreview.totalPrice}</h6>
              </div>
              <div className="d-flex mt-4 align-items-end w-100">
                <h6>Cashier : </h6>
                <h6 className="ml-3">{orderPreview && orderPreview.cashier}</h6>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Route>
    </>
  )
}