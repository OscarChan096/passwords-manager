import React from 'react'
import { Navigate } from 'react-router-dom';
import Main from './Main';

const ProtectedRoute = ({
    isAuth,
    redirectTo = '/login',
    userLogged
}) => {

    if(!isAuth){
        return <Navigate to={redirectTo} replace />
    }

    return <Main isAuth={isAuth} userLogged={userLogged} />
}

export default ProtectedRoute;
