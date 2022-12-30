import React, { useState } from 'react';
import axios from 'axios';

import './../css/Add.css';
import MessageError from './MessageError';
import MessageSucces from './MessageSucces';

const Add = () => {

    const [limitChar, setLimitChar] = useState(8);
    const [passwordG, setPasswordG] = useState('');
    const [title, setTitle] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const [succes, setSucces] = useState(false);

    const BASE_URL = 'http://127.0.0.1:5000/api/pwd/';

    const generatePassword = () => {
        let pwd = '';
        const arr = ['~-+:_#.@', '0123456789', 'abcdefghijklmnopqrstuvwxyz', ''];
        if (passwordG.length > 0)
            setPasswordG('');

        for (let i = 0; i < limitChar; i++) {
            let index = Math.floor(Math.random() * 4);
            let char = arr[index];
            let size = char.length;
            pwd += index == 3 ? String.fromCharCode(arr[2].charCodeAt(Math.random() * 26) - 32) : char.charAt(Math.random() * size);
        }

        setPasswordG(pwd);
    }

    const changeLimit = (event) => {
        if (event.target.value >= 8)
            setLimitChar(event.target.value);
    }

    const handleChangePwd = (event) => {
        setPasswordG(event.target.value);
    }

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    }

    const handleChangeUser = (event) => {
        setUsername(event.target.value);
    }

    const save = async () => {
        if (title.length != 0 && passwordG.length != 0) {
            let load = { title: title, username: username, userpassword: passwordG };
            await axios.post(BASE_URL, load)
                //.then(response => console.log(response.data))
                .catch(error => {
                    setError(true);
                    setMessage(error);
                });
            setError(false);
            setSucces(true);
            setMessage('guardado con exito');
        } else {
            setSucces(false);
            setError(true);
            setMessage('Hay espacios vacios en el formulario');
        }
    }

    return (
        <>
            <div className='form-add'>
                <div className='form'>
                    <input className='form-title'
                        type='text'
                        placeholder='Title'
                        onChange={handleChangeTitle}
                        value={title}
                    />
                    <input className='form-user'
                        type='text'
                        placeholder='User'
                        onChange={handleChangeUser}
                        value={username}
                    />
                    <input className='form-password'
                        type='text'
                        placeholder='Password'
                        onChange={handleChangePwd}
                        value={passwordG}
                    />
                    <div className='generate-pwds'>
                        <input className='limit-password' type='number' id='limit' name='limit' placeholder='8' onChange={changeLimit} value={limitChar} />
                        <div className='gener-btn' onClick={generatePassword}>Generate Password</div>
                    </div>
                    <button className='form-submit' type='submit' value='Save' onClick={save}>Save</button>
                </div>
            </div>
            {error && <MessageError message={message} />}
            {succes && <MessageSucces message={message} />}
        </>
    )
}

export default Add;
