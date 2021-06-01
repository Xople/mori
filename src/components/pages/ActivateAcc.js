import React from 'react'
import useActivateAcc from '../../hooks/useActivateAcc';
import useSignin from '../../hooks/useSignIn';

import { Redirect } from 'react-router-dom';

export default function ActivateAcc() {
  const [loader, errorActivate, tokenUser] = useActivateAcc()
  const [, success, loading, , activateToken] = useSignin()

  console.log(tokenUser)
  return (
    <>
      {success && (<Redirect to="/profile" />)}
      <div className="wrap-activate d-flex align-items-center">
        <div className="container d-flex justify-content-center">
          {loader && (
            <div className="preloader-activate d-flex justify-content-center align-items-center">
              <div className="loader"></div>
            </div>
          )}

          {!loader && (
            <div className="success-activation d-flex flex-column align-items-center text-center p-4">
              {errorActivate && (
                <>
                  <i className="fa fa-window-close fa-5x"></i>
                  <h5 className="mt-3">something went wrong</h5>
                  <button className="mt-3">Okay</button>
                </>
              )}
              {!errorActivate && (
                <>
                  <i className="fa fa-check-circle fa-5x"></i>
                  <h5 className="mt-3">Your activation account success</h5>
                  <button className="mt-3 d-flex justify-content-center align-items-center" onClick={() => activateToken(tokenUser)} disabled={loading}>
                    {loading === false && (
                      <span>Okay</span>
                    )}
                    {loading === true && (
                      <div className="loading"></div>
                    )}
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
