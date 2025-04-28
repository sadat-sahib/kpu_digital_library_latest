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
import StudentPrivateRoute from "../components/student-profile/StudentPrivateRoute"
import StudentProfile from "../components/student-profile/StudentProfile"
import BookDetailPage from "../components/cart/BookDetailsPage";
import React from "react";
import BookLibrary from "../components/books-page/BooksPage";


export const Router = createBrowserRouter([
    {
        path: '/',
        element: <LandingLayout/>,
        children: [
            {
                path: '/',
                element: <Home/>,
            },
            {
                path: 'book-details/:id',
                element: <BookDetailPage />
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
                path: 'books',
                element: <BookLibrary/>
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
            {
                element: <StudentPrivateRoute/>,
                children: [
                    {
                        path: '/student-profile',
                        element: <StudentProfile/>
                    }
                ]
            }


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

