import React from 'react'
import { IngredientProvider } from '../Contexts/IngredientContext'
import { Link, Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className='Content'>
        <IngredientProvider>
           <nav className='sideBar'>
            <div className='sideBarHeader'>
                <h1>Coffee Admin</h1>
                <p>Management panel</p>
            </div>
            <ul className='navMenu'>
              <Link to={'/'}>Dashboard</Link>
              <Link to={'/add_coffee'}>Add Coffee</Link>
            <Link to={'/manage_ingredients'}>Manage ingredients</Link>
            </ul>
           </nav>
           <Outlet />
        </IngredientProvider>
    </div>
  )
}

export default AdminLayout