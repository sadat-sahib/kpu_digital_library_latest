import { createBrowserRouter } from "react-router-dom";
import About from "../components/about/About";
import Contact from "../components/contact/Contact";
import LandingLayout from "../Layout/LandingLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import UserRegistration from "../Pages/UserRegistration";
import PrivateRoute from "../components/PrivateRoute";
import Dashboard from "../Pages/Dashboard";
import OnlyAdminPrivateRoute from "../components/OnlyAdminPrivateRoute";


export const Router = createBrowserRouter([
    {
        path: '/',
        element: <LandingLayout/>,
        children: [
            {
                path: '/',
                element: <Home/>,
                children: [
                    
                ]
            },
            {
                path: 'contact',
                element: <Contact/>
            },
            {
                path: 'about',
                element: <About/>
            },
            {
                element: <PrivateRoute/>,
                children: [
                    {
                        path: '/dashboard',
                        element: <Dashboard/>
                    }
                ]
            },
            {
                element: <OnlyAdminPrivateRoute/>,
                children: [
                    {
                        path: '/user-registration',
                        element: <UserRegistration/>
                    }
                ]
            },


        ]
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/register',
        element: <UserRegistration/>
    },
 
    
]);

