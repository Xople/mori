import {useState, useEffect} from 'react'
import axios from 'axios'

export default function useDetailProduct(id) {
  const [detailProduct, setDetailProduct] = useState(null)

  let stock = 0

  useEffect(() => {
    axios.get(`http://127.0.0.1:8080/api/products/id/${id}`)
     .then(res => setDetailProduct(res.data.data))
  }, [])

  if(detailProduct !== null) stock = detailProduct.stocks.reduce((acc, currentValue) => acc + currentValue.stock, 0)
  
  return [detailProduct, stock]
}
