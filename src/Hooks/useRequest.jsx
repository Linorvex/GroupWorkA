import { useState } from "react"

const useRequest = ({url, method})=> {
const [loading, setLoading] = useState(false)

const sendRequest = async (body, custom) =>{

    const  API_KEY = 'YXBpS2V5U2VjcmV0'
    setLoading(true)
const res = await fetch( url || custom , {
    method,
    headers: {
        'Content-Type':'application/json',
        'x-bypass-token': API_KEY
        },
        body: !!body && method !== 'GET' ? JSON.stringify(body) : undefined
})
    const jsonData = res.json()
    setLoading(false)
    return jsonData
}
    return {loading, sendRequest}

}

export default useRequest