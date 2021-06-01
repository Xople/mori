import { useCallback, useState, useEffect } from 'react'

export default function useTokenExpired() {

  const [expired, setExpired] = useState(false)
  const [token, setToken] = useState(null)
  const {time_expired} = localStorage

 const authenticated = useCallback((token, time_expired, expire) => {
   localStorage.setItem("token", token)
   localStorage.setItem("time_expired", time_expired)
   localStorage.setItem("expired", expire)
   setExpired(expire)
   setToken(token)

 }, [])

 useEffect(() => {
  const remainingDate = time_expired
  const time = setTimeout(() => {
    if (token !== null && !expired) {
      localStorage.setItem("expired", true)
      setExpired(true)
    } else {
      clearTimeout(time)
    }
  }, remainingDate)

  return () => {
    clearTimeout(time)
  }

}, [token, expired, time_expired])

  return [authenticated, expired]
}
