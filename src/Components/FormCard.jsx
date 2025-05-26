import React, { useContext, useEffect, useState } from 'react'
import { IngredientsContext } from '../Contexts/IngredientContext';

const FormCard = ({onFormSubmit, onUpdate}) => {
    const { editableIngredient, setEditableIngredient } = useContext(IngredientsContext);

    const initialState = {     
        name:'',
        price:'',
        description: '',
        strength: '',
        flavor: ''
    }
   

    const [formData, setFormData] = useState(initialState)

    // Here we need use effect to track if editable is true(if table sends editable data) then set inputs
    useEffect(()=>{
        if(editableIngredient){
            setFormData(editableIngredient)
        }else{
            setFormData(initialState)
        }
    },[editableIngredient])



    
    const handleInputChange =(e)=>{
        const {name, value} = e.target;
        setFormData((prevData)=>({
            ...prevData,
            [name]: value
        }))
    }



    const BASE_URL = 'http://localhost:5000/api/v1'
    const API_KEY = 'YXBpS2V5U2VjcmV0'

    const handleSubmit = async (e)=>{
        e.preventDefault()

    // Check if the changes hapenned then make PUT fetch
    const data = {
      data: formData
    }
        if(editableIngredient){
            const id=editableIngredient.id;
            try {
                const response = await fetch(`${BASE_URL}/resource/ingredients/${id}`, {
                    method:'PUT',
                    headers: {
                    'Content-Type': 'application/json',
                    'x-bypass-token': API_KEY,
                    },
                    body: JSON.stringify(data)
                })
                if (!response.ok) throw new Error('Failed to update ingredient');
                const updatedData = await response.json();
                setEditableIngredient(null);
                // Trigger parent update if needed
                onUpdate(id,  updatedData);
            } catch (error) {
                console.error(error);
            }
        } else{
                // Add new ingredient
                onFormSubmit(formData)
        }

                // Reset form     
                setFormData(initialState)
    }

    const handleCancel = () => {
    setEditableIngredient(null);
    setFormData(initialState);
  };


    // validate if allinputs are populated
    const [isFormValid, setIsFormValid] = useState(false);
    useEffect(()=>{
       const allInputsPopulated = Object.values(formData).every(value => value.trim() !== '');
       setIsFormValid(allInputsPopulated);
    }, [formData])





  return (
    <div className="formDiv">
        
    
        <form onSubmit={handleSubmit}>
            <div className="inputsContainer">
        <div className="inputgroup">
             <div className="inputDiv">
                <label htmlFor="name">Ingredient Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
            </div>
             <div className="inputDiv">
                <label htmlFor="price">Price ($)</label>
                <input type="number" name="price" value={formData.price} onChange={handleInputChange}/>
            </div>
        </div>
            <div className="inputDiv">
                <label htmlFor="description">Description</label>
                <input className= "descrInput" type="text" name="description" value={formData.description} onChange={handleInputChange}/>
            </div>
        <div className="inputgroup">
            <div className="inputDiv">
                <label htmlFor="strength">Strength</label>
                <input type="text" name="strength" value={formData.strength} onChange={handleInputChange}/>
            </div>
            <div className="inputDiv">
                <label htmlFor="flavor">Flavor Profile</label>
                <input type="text" name="flavor" value={formData.flavor} onChange={handleInputChange}/>
            </div>
        </div>
            </div>
            <div className="cardFooter">
              <button className = "btnPrimary" type="submit" disabled={!isFormValid} style={{marginTop: '24px'}}>{editableIngredient ? 'Update Ingredient' : 'Add Ingredient'}</button>
              {editableIngredient && (
                <button className= "btnCancel" onClick={handleCancel} style={{marginTop: '24px'}}>Cancel</button>
               )}
            </div>
        </form>
    </div>
  )
}

export default FormCard