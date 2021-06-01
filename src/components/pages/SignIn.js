import React from 'react';
import { Helmet } from 'react-helmet';
import { ReactSVG } from 'react-svg';
import { bg2, shape4, logo4, logo3, shape3 } from '../../assets/images/index';

import { Redirect } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import useSignIn from '../../hooks/useSignIn';

export default function SignIn() {
  const [error, success, loading, signinProccess] = useSignIn()
  return (
    <>
      {success && (<Redirect to="/profile" />)}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Mori - Sign In</title>
      </Helmet>
      <div className="row wrap-sign-in align-items-center w-100">
        <div className="col-md-6 left">
          <div className="img">
            <img src={bg2} alt="" />
            <div className="shadow d-flex justify-content-center align-items-center">
              <ReactSVG src={logo3} />
            </div>
            <ReactSVG src={shape3} className="shape-top" />
            <ReactSVG src={shape3} className="shape-bottom" />

          </div>
        </div>
        <div className="col-md-5 col-12 right">
          <div className="shape">
            <img src={shape4} alt="" className="shape4" />

            <ReactSVG src={logo4} className="logo4" />
          </div>
          <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
              const errors = {};

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

                signinProccess(values)

                setSubmitting(false)
              }, 400);
            }}
          >
            {({ isSubmitting }) => (
              <Form autoComplete="off">
                <div className="col-md-12">
                  <h2>Login</h2>
                {error && (<p className="p-2 bg-dark">There's something wrong</p>)}
                </div>
                <div className="col-md-12 mt-4 form-group">
                  <label className="mb-1">Email</label>
                  <Field type="text" name="email" className="form-control" placeholder="Enter Email" />
                  <ErrorMessage name="email" className="error-validate-form" component="sub" />
                </div>
                <div className="col-md-12 mt-4 form-group">
                  <label className="mb-1">Password</label>
                  <Field type="password" name="password" className="form-control" placeholder="Enter password" />
                  <ErrorMessage name="password" className="error-validate-form" component="sub" />
                </div>
                <div className="col-md-12 mt-4">
                  <button type="submit" className="button-blue-sign d-flex justify-content-center align-items-center" disabled={loading}>
                  {loading === false && (
                  <span>Login</span>
                  )}
                  {loading === true && (
                    <div className="loading"></div>
                  )}
                </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  )
}
