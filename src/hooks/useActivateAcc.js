import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function useActivateAcc() {
  const [loader, setLoader] = useState(true)
  const [errorActivate, setError] = useState(false)
  const [tokenUser, setTokenUser] = useState(null)
  let { token } = useParams()

  useEffect(() => {
    axios.post(`http://127.0.0.1:8080/api/users/activate/${token}`)
     .then(res => setTokenUser(res.data.token))
     .then(setTimeout(() => setLoader(false), 3000))
     .catch(err => err ? setError(true) : setError(false))
  }, [])

  return [loader, errorActivate, tokenUser]
}
