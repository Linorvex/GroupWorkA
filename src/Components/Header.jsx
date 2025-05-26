import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='headerDiv'>
         <h1>Manage Ingredients</h1>
         <Link to={'/'}>Back to Dashboard</Link>
  
    </div>
  )
}

export default Header