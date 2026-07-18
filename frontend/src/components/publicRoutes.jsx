import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router'

const PublicRoutes = ({children}) => {
    const{user,loading} = useContext(AuthContext);

    if(loading){
        return(
             <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
        );
    }

    if(user){
        return <Navigate to="/" replace />;
    }
  return children;  
};

export default PublicRoutes;