import { createContext, useState } from "react";

export const IngredientsContext = createContext();

export const IngredientProvider =({children})=>{
    const [editableIngredient, setEditableIngredient] = useState(null)
    
    
    return(
    <IngredientsContext.Provider value={{editableIngredient, setEditableIngredient}}>
        {children}
    </IngredientsContext.Provider>
    )

}