import { useContext, useState } from 'react'
import axios from 'axios'
import SigninContext from '../helper/SignInContext'

export default function useSignIn() {
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const auth = useContext(SigninContext)

  const signinProccess = (values) => {
    setLoading(true)
    axios.post(`http://127.0.0.1:8080/api/users/login`, values)
      .then(res => {
        if (res) {
          setTimeout(() => {
            const exparation = new Date(new Date().getTime() + 800 * 60 * 60)
            const timeLogin = new Date(new Date().getTime())
            const remainingDate = exparation - timeLogin

            console.log(exparation)
            auth.authenticated(res.data.token, remainingDate, false)
            setSuccess(true)
            setLoading(false)
          }, 2000)

        }
      })
      .catch(err => {
        setTimeout(() => {
          err ? setError(true) : setError(false)
          setLoading(false)
        }, 1000)
      })
  }

  const activateToken = (token) => {
    setLoading(true)
    localStorage.removeItem("need_activate")
    setTimeout(() => {
      const exparation = new Date(new Date().getTime() + 800 * 60 * 60)
      const timeLogin = new Date(new Date().getTime())
      const remainingDate = exparation - timeLogin
      auth.authenticated(token, remainingDate, false)
      setLoading(false)
      setSuccess(true)
    }, 2000)

  }

  return [error, success, loading, signinProccess, activateToken]
}
