import React from 'react'
import { useAuthStore } from '../../Store/useAuthStore'
import { Navigate, Outlet } from 'react-router-dom'


const StudentPrivateRoute = () => {
    const { token } = useAuthStore()

    if(!token){
        return <Navigate to={'/login'} replace/>
    }
  return <Outlet />

  
}

export default StudentPrivateRoute

