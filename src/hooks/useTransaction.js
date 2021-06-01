import {useState} from 'react'
import axios from 'axios'

export default function useTransaction() {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const {token} = localStorage

  const checkout = (values) => {
    return new Promise((resolve, rejected) => {
      setLoading(true)
      setTimeout(() => {    
        axios.post(`http://127.0.0.1:8080/api/transactions/create`, values, {headers: {'Authorization': `Bearer ${token}`}})
         .then(res => {
           setLoading(false)
           setSuccess(true)
           resolve(true)
    
         })
         .catch(err => {
           setLoading(false)
           setError(true)
          })
      }, 2000)
    })
    
    
  }  
  return [checkout, success,  error, loading]
}
