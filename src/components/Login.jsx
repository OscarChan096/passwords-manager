import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import './../css/Login.css';
import MessageError from './MessageError';

const Login = ({userLogged}) => {

    const navigate = useNavigate();
    const [pin, setPin] = useState('');
    const [show, setShow] = useState(false);

    const handleChangePin = (event) => {
        setPin(event.target.value);
    }

    const validatePin = (event) => {
        event.preventDefault();
        if(pin == '9609'){
            userLogged(true);
            navigate('/sp');
        }else{
            setShow(true);
        }
    }

    return (
        <div className='login-content'>
            <div className='form-login'>
            <span className='logo-text login-logo'>~/0SKR&gt;PASSWORDS_</span>
                <form>
                    <input
                        className='pin-login'
                        type='password'
                        placeholder='NIP'
                        maxLength='4'
                        onChange={handleChangePin}
                        value={pin} 
                        autoFocus />
                    <input
                        className='submit-login'
                        type='submit'
                        value='ACEPTAR'
                        onClick={validatePin}
                        onKeyUp={validatePin} />
                </form>
                {show && <MessageError message={'NIP incorrecto'}/>}
            </div>
        </div>
    )
}

export default Login;
