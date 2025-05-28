import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import  routes  from './Routes/routes'

function App() {

  return (
    <>
    <RouterProvider router={createBrowserRouter(routes)}></RouterProvider>
    </>
  )
}

export default App
