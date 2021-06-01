import {useState, useEffect} from 'react'
import axios from 'axios'

export default function useCart(cart) {
  const [checkCart, setCheckCart] = useState(null)
  
  useEffect(() => {
    axios.post('http://127.0.0.1:8080/api/products/check', { products: cart })
    .then(res => setCheckCart(res.data.data))
    // .then(res => console.log(res.data.data))
  }, [])

  return [checkCart]
}


