import React from 'react'
import { Navigate } from 'react-router-dom';
import Main from './Main';

const ProtectedRoute = ({
    isAuth,
    redirectTo = '/login',
    userLogged
}) => {
    console.log("# PUNTO DE CONTROL 0 | ProtectedRoute | isAuth: "+isAuth);
    if(!isAuth){
        return <Navigate to={redirectTo} replace />
    }

    return <Main isAuth={isAuth} userLogged={userLogged} />
}

export default ProtectedRoute;
