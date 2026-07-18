import React from 'react'
import { useContext } from 'react'
import { Navigate } from 'react-router'
import { AuthContext } from '../context/AuthContext'

const ProtectedRoutes = ({children}) => {
    const{user,loading} = useContext(AuthContext);
    if(loading){
        return(
             <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
        );
    }

    if(!user){
          return <Navigate to="/login" replace />;
    }
  return children;
};

export default ProtectedRoutes;