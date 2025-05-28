import { useCallback, useEffect, useState } from "react"


const useFetch  = ({url, method})=>{
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)


  const  API_KEY = 'YXBpS2V5U2VjcmV0'

  const onFetch = useCallback(()=>{
    setLoading(true)
    fetch(url, {
      method,
      headers: {
        'Content-Type':'application/json',
        'x-bypass-token': API_KEY
        }
      })
      .then((res)=>{
        if(!res.ok) throw new Error('Response failed')
        return res.json()
      })
      .then((data)=>setResponse(data))
      .catch(err => setError(err))
      .finally(()=>setLoading(false))


       return ()=> {
        setResponse(null),
        setError(null)
        setLoading(null)
    }
  }, [url, method])

 useEffect(()=>{
    onFetch()
 },[onFetch])
   

  return {response, error, loading, resendRequest : onFetch}
}

export default useFetch