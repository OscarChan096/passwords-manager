import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './../css/Login.css';
import MessageError from './MessageError';

const Login = ({ userLogged }) => {

    const BASE_URL = 'http://127.0.0.1:5000/api/pwd/uapwd/';

    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [pin, setPin] = useState('');
    const [pinAux, setPinAux] = useState('');
    const [show, setShow] = useState(false);

    useEffect(() => {
        let URL_REST = `${BASE_URL}${user.toLocaleLowerCase()}`;
        console.log('URL_REST: ', URL_REST);
        if (user) {
            axios.get(URL_REST)
                .then(({ data }) => setPinAux(data.passpwd))
                .catch((error) => console.log('error calling pwd', error))
        }
    }, [pin]);

    const handleChangeUser = (event) => {
        setUser(event.target.value);
    }

    const handleChangePin = (event) => {
        setPin(event.target.value);
    }

    const validateLogin = (event) => {
        event.preventDefault();
        if (pin == pinAux) {
            userLogged(true);
            navigate('/sp');
        } else {
            setShow(true);
        }
    }

    return (
        <div className='login-content'>
            <div className='form-login'>
                <span className='logo-text login-logo'>~/0SKR&gt;PASSWORDS_</span>
                <form>
                    <input
                        className='user-login'
                        type='text'
                        placeholder='USER'
                        onChange={handleChangeUser}
                        value={user}
                        autoFocus />
                    <input
                        className='pin-login'
                        type='password'
                        placeholder='NIP'
                        maxLength='4'
                        onChange={handleChangePin}
                        value={pin} />
                    <input
                        className='submit-login'
                        type='submit'
                        value='ACEPTAR'
                        onClick={validateLogin}
                        onKeyUp={validateLogin} />
                </form>
                {show && <MessageError message={'Credenciales incorrectas'} />}
            </div>
        </div>
    )
}

export default Login;
