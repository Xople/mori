import {useState, useEffect} from 'react'
import axios from 'axios';

export default function usePreviewProducts() {
  const [latestProducts, setLatestProducts] = useState([])
  const [topProducts, setTopProducts] = useState([])

  useEffect(() => {
    axios.get(`http://127.0.0.1:8080/api/products/latest`)
    .then(res => setLatestProducts(res.data.data))
  }, [])

  useEffect(() => {
    axios.get(`http://127.0.0.1:8080/api/products/top`)
    .then(res => setTopProducts(res.data.data))
  }, [])
  
  return [latestProducts, topProducts]
}
