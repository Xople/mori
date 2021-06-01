import {useState} from 'react'
import axios from 'axios'

export default function useInfiniteScroll() {  
  const [page, setPage] = useState(1)
  const [lastLength, setLastLength] = useState(8)
  const [products, setProducts] = useState([])
  const [filter, setFilter] = useState({name: "none", id: "none"})
  const [sort, setSort] = useState("")

  const increasePage = () => {
    const showAll = async () => {
      const res = await axios.get(`http://127.0.0.1:8080/api/products/pages/${page}`)

      setTimeout(() => {
        setProducts(prevState => [...prevState, ...res.data.data])
        res.data.data.length >= 1 ? setLastLength(8) : setLastLength(0)
        setPage(prevState => prevState + 1)
      }, 2000)
      
    }

    const showByCategory = async () => {
      const res = await axios.get(`http://127.0.0.1:8080/api/products/ct/${filter.id}/pages/${page}`)
      setTimeout(() => {
        setProducts(prevState => [...prevState, ...res.data.data])
        res.data.data.length >= 1 ? setLastLength(8) : setLastLength(0)
        setPage(prevState => prevState + 1)
      }, 2000)
    }

    const showByName = async () => {
      const res = await axios.get(`http://127.0.0.1:8080/api/products/name/${filter.id}/pages/${page}`)
      setTimeout(() => {
        setProducts(prevState => [...prevState, ...res.data.data])
        res.data.data.length >= 1 ? setLastLength(8) : setLastLength(0)
        setPage(prevState => prevState + 1)
      }, 2000)
    }

    const showSort = async () => {
      const res = await axios.get(`http://127.0.0.1:8080/api/products/pages/${page}`)
      setTimeout(() => {
        if(sort === "atoz") setProducts(prevState => [...prevState, ...res.data.data.sort((a, b) => (a.name > b.name) ? 1 : (a.name < b.name ? -1 : 0))])
        if(sort === "ztoa") setProducts(prevState => [...prevState, ...res.data.data.sort((a, b) => (b.name > a.name) ? 1 : (a.name > b.name ? -1 : 0))])
        if(sort === "lowtohigh") setProducts(prevState => [...prevState, ...res.data.data.sort((a, b) => (a.price > b.price) ? 1 : (a.price < b.price ? -1 : 0)) ])
        if(sort === "hightolow") setProducts(prevState => [...prevState, ...res.data.data.sort((a, b) => (b.price > a.price) ? 1 : (a.price > b.price ? -1 : 0))])
        res.data.data.length >= 1 ? setLastLength(8) : setLastLength(0)
        setPage(prevState => prevState + 1)
      }, 2000)
      
    }
    
    if(filter.name === "none" && filter.id === "none" || filter.id === "") showAll()
    if(filter.name === "category" && filter.id !== "none") showByCategory()
    if(filter.name === "name" && filter.id !== "none" && filter.id !== "") showByName()
    if(filter.name === "sort") showSort()
  }

  const setFilterBy = (pname, pid) => {
    setLastLength(8)
    setPage(1)
    setFilter({name: pname, id: pid})
    setProducts([])
  }

  const setSortBy = (name) => {
    setLastLength(8)
    setPage(1)
    setFilter({name: "sort"})
    setSort(name)
    setProducts([])
  }
  return [products, lastLength ,increasePage, setFilterBy, setSortBy]
}
