import {useContext, useState} from 'react'
import axios from 'axios'

export default function useSignIn() {
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const signupProccess = (values) => {
    setLoading(true)
    axios.post(`http://127.0.0.1:8080/api/users/signup`, values)
     .then(res => {
       if(res) {
         setTimeout(() => {
           localStorage.setItem('need_activate', true)
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

  return [error, success, loading, signupProccess]
}
