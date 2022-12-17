import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import './../css/Login.css';

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
                <form>
                    <input
                        className='pin-login'
                        type='password'
                        placeholder='PIN'
                        maxLength='4'
                        onChange={handleChangePin}
                        value={pin} />
                    <input
                        className='submit-login'
                        type='submit'
                        value='ACEPTAR'
                        onClick={validatePin}
                        onKeyUp={validatePin} />
                </form>
                {show && <label className='error'>Contraseña incorrecta</label>}
            </div>
        </div>
    )
}

export default Login;
