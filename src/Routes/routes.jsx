import AdminLayout from "../Layouts/AdminLayout"
import AddCoffee from "../Pages/AddCoffee"
import Dashboard from "../Pages/Dashboard"
import Ingredients from "../Pages/Ingridients"

const routes = [
    {
     element: <AdminLayout />,
     path: '/',
     children:[
         {
            element: <Dashboard />,
            path:'/'
        },
         {
            element: <AddCoffee />,
            path:'add_coffee'
        },
        {
            element: <Ingredients />,
            path:'manage_ingredients'
        },
       
     ]
    }
]

export default routes