import React, { useContext } from 'react'
import { IngredientsContext } from '../Contexts/IngredientContext';

const Table = ({data, onDelete}) => {
const { setEditableIngredient } = useContext(IngredientsContext);

if (!data.length) return <p>No data available.</p>;


// Delete ingredient
const BASE_URL = 'http://localhost:5000/api/v1'
const API_KEY = 'YXBpS2V5U2VjcmV0'

const deleteIngredient = (ingrID)=>{
   fetch(`${BASE_URL}/resource/ingredients/${ingrID}`, {
    method: 'DELETE',
    headers:{
        'Content-Type':'application/json',
        'x-bypass-token': API_KEY,
    },
   })
   .then((res)=>{
    if(!res.ok){
        throw new Error ('something went wrong')
    }
    return res.json()
   })
   .then(()=>{
        console.log('Deleted ingredient:', ingrID)
        onDelete(ingrID)
    })
   .catch((err)=>console.log(err))
}


  return (
  <table>     
    <thead>
        <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Flavour</th>
            <th>Strength</th>
            <th>Description</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        {data.map((item)=>{
            const {id, data: ingredients} = item
        //    console.log('Item:', item);
 

            return(
                <tr key={id}>
                <td>{ingredients.name}</td>
                <td>{ingredients.price}</td>
                <td>{ingredients.flavor}</td>
                <td>{ingredients.strength}</td>
                <td>{ingredients.description}</td>
                <td>
                    <button className='btnPrimary' onClick={()=>setEditableIngredient({id, ...ingredients})}>Edit</button>
                    <button className='btnDanger' onClick={()=>deleteIngredient(id)}>Delete</button>
                </td>
            </tr>
            )
        })}
    </tbody>
  </table>
  )
}

export default Table