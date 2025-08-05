import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router";
import MainLayaut from "./Layaut/MainLayaut.jsx";
import Homepage from "./routes/Homepage.jsx";
import Login from "./routes/Login.jsx";
import Register from "./routes/Register.jsx";
import { Toaster } from 'react-hot-toast';
import Dashboard from "./routes/Dashboard.jsx";



const routes = createBrowserRouter([{
    element: <MainLayaut />,
    children:[
        {
            path:"/",
            element: <Homepage />,
        },
        {
            path:"/login",
            element: <Login />,
        },
        {
            path:"/register",
            element: <Register />,
        },
        {
            path:"/dashboard",
            element: <Dashboard />,
        }
    ]
}])


createRoot(document.getElementById('root')).render(

      <StrictMode>
        <RouterProvider router={routes} />
          <Toaster  />
      </StrictMode>
)
