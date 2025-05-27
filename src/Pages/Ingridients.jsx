import React, { useEffect, useState } from 'react'
import FormCard from '../Components/FormCard'
import Table from '../Components/Table'
import Header from '../Components/Header'


const BASE_URL = 'http://localhost:5000/api/v1'
const API_KEY = 'YXBpS2V5U2VjcmV0'


const Ingredients = () => {

// Get ingredient form server
const[ingr, setIngr] = useState([])
const [ingrAdded, setIngrAdded] = useState([])


// Get data on render
useEffect(()=>{
  const fetchData = async ()=>{
  try {
    const ingrResp = await fetch(`${BASE_URL}/resource/ingredients`, {
      method: 'GET',
      headers: {
        'Content-Type':'application/json',
        'x-bypass-token': API_KEY,
        }
      })
    const jsonData = await ingrResp.json()
    setIngr(jsonData)
   
  } catch (error) {
    console.log('Error:', error.message)
  } 
};
fetchData()
}, [ingrAdded])


// Post data to server
  const postIngridients = async (formData)=>{
   
    const data = {
      data:[formData]
    }
    try {
    const response = await fetch(`${BASE_URL}/resource/ingredients`, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        "x-bypass-token": API_KEY,
      },
      body: JSON.stringify(data)
     
    })

    if (!response.ok) {
    throw new Error('Failed to post ingredients');
    }
    const result = await response.json()
    console.log(result)
    setIngrAdded(result)

   } catch (error) {
    console.log('Error:', error.message)
   }
  }



// Delete function logic
  const deleteIngr = (id)=>{
    setIngr(prev=> prev.filter(item => item.id !==id))
  }



return (
    <div className='mainContent'>
      <Header />
      <Table data={ingr} onDelete={deleteIngr} />
      <FormCard onFormSubmit={postIngridients} setIngr={setIngr}/>
    
    </div>
  )
}

export default Ingredients