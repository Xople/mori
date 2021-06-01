import {useState, useEffect} from 'react'
import axios from 'axios'

export default function useCategory() {
  const [categories, setCategories] = useState(null)

  useEffect(() => {
    axios.get('http://127.0.0.1:8080/api/categories')
    .then(res => setCategories(res.data.data))
  }, [])

  return categories
}
