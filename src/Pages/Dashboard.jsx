import {  useNavigate } from 'react-router-dom';
import useFetch from '../Hooks/useFetch';
import useRequest from '../Hooks/useRequest';
import { useContext } from 'react';
import { IngredientsContext } from '../Contexts/IngredientContext';



const Dashboard = () => {

  const {response, loading, error, resendRequest} = useFetch({url: 'http://localhost:5000/api/v1/resource/coffees', method: 'GET'})
  const {sendRequest} = useRequest({method: 'DELETE'})
  const navigate = useNavigate()
  const { setEditableIngredient } = useContext(IngredientsContext);
  
 
  const onDelete =(coffeeID)=>{
    sendRequest(null, `http://localhost:5000/api/v1/resource/coffees/${coffeeID}`).then(()=> resendRequest())
  }

  const onEdit = (coffee)=> {   
   setEditableIngredient(coffee)
   navigate('/add_coffee')
  }

  
  return (
    <> 
    <div className='form-header'>
        <h1>Dashboard</h1>
        <button 
            onClick={() => navigate('/add_coffee')} 
            className="btnPrimary"
          >
            Add new coffee
          </button>
      </div>
    <table style={{marginLeft: '320px'}}>     
    <thead>
        <tr>
            <th>Name</th>
            <th>Origin</th>
            <th>Caffeine</th>
            <th>Price</th>
            <th>Actions</th>
        </tr>
    </thead>
     <tbody>
        {response && Array.isArray(response) && response.length >0 ? 
        response.map(({id, data:{name, country, caffeine, price}})=>{
          return (
            <tr key={id}>
              <td>{name}</td>
              <td>{country}</td>
              <td>{caffeine}</td>
              <td>{price}</td>
              <td>
                    <button className='btnPrimary' onClick={()=>onEdit({id, data:{name, country, caffeine, price}})}>Edit</button>
                    <button className='btnDanger' onClick={()=>onDelete(id)}>Delete</button>
              </td>
            </tr>
          )
        }) : <tr><td colSpan="4">No data available</td></tr>}
        
      </tbody>
    </table>   
    </>
      
  );
};

export default Dashboard;