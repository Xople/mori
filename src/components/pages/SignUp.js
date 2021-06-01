import React from 'react';
import { shape4, bg2, logo4, logo3, shape3 } from '../../assets/images/index';
import { Helmet } from 'react-helmet';
import { ReactSVG } from 'react-svg';
import {Redirect} from 'react-router-dom';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import useSignup from '../../hooks/useSignUp';
export default function SignUp() {
  const  [error, success, loading, signupProccess] = useSignup()

  return (
    <>
    {success && (<Redirect to="/active" />)}
      <Helmet>
        <title>Mori - Sign Up</title>
      </Helmet>
      <div className="row wrap-sign-up align-items-center w-100">

        <div className="col-md-5 col-12 left">
          <div className="shape">
            <img src={shape4} alt="" className="shape4" />

            <ReactSVG src={logo4} className="logo4" />

          </div>
          <Formik
            initialValues={{ name: '', phone: '', email: '', password: '' }}
            validate={values => {
              const errors = {};
              if (!values.name) {
                errors.name = 'Wajib diisi';
              }

              if (!values.phone) {
                errors.phone = 'Wajib diisi';
              } else if (/\D/g.test(values.phone)) {
                errors.phone = 'Pastikan bahwa angka';
              }

              if (!values.email) {
                errors.email = 'Wajib diisi';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Alamat Email tidak sesuai';
              }

              if (!values.password) {
                errors.password = 'Wajib diisi';
              } else if (values.password.length < 8) {
                errors.password = "Password harus lebih dari 8 karakter";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                signupProccess(values)

                setSubmitting(false)
              }, 400);
            }}
          >
            {({ isSubmitting }) => (
              <Form autoComplete="off">
                <h2>Signup</h2>
                {error && (<p className="p-2 bg-dark">There's something wrong</p>)}
                <div className="form-row mt-3">
                  <div className="form-group col-md-6">
                    <label>Name</label>
                    <Field type="text" name="name" className="form-control" placeholder="Name" />
                    <ErrorMessage name="name" className="error-validate-form" component="sub" />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Phone</label>
                    <Field type="text" name="phone" className="form-control" placeholder="Phone" />
                    <ErrorMessage name="phone" className="error-validate-form" component="sub" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Email</label>
                    <Field type="email" name="email" className="form-control" placeholder="Email" />
                    <ErrorMessage name="email" className="error-validate-form" component="sub" />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Password</label>
                    <Field type="password" name="password" className="form-control" placeholder="Password" />
                    <ErrorMessage name="password" className="error-validate-form" component="sub" />
                  </div>
                </div>
                <button type="submit" className="button-blue-sign d-flex justify-content-center align-items-center" disabled={loading}>
                  {loading === false && (
                  <span>Login</span>
                  )}
                  {loading === true && (
                    <div className="loading"></div>
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="col-md-6 right">
          <div className="img">
            <img src={bg2} alt="" />
            <div className="shadow d-flex justify-content-center align-items-center">
              <ReactSVG src={logo3} />
            </div>
            <ReactSVG src={shape3} className="shape-top" />
            <ReactSVG src={shape3} className="shape-bottom" />

          </div>
        </div>
      </div>
    </>
  )
}
