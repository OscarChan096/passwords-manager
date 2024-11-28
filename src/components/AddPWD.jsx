import React, { useState } from 'react';
import axios from 'axios';
import { desencrypt, encrypt } from './../encryption';
import { getFecha } from '../sysdate';

import './../css/Add.css';
import MessageSucces from './MessageSucces';

const AddPWD = () => {

    const [limitChar, setLimitChar] = useState(8);
    const [passwordG, setPasswordG] = useState('');
    const [title, setTitle] = useState('');
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const BASE_URL = 'http://127.0.0.1:5000/api/pwd/';
    //const BASE_URL = 'https://apex.oracle.com/pls/apex/oskdev/APIPWD/pwds';
    const requests = {
        spUser: `${BASE_URL}user/`,
    }

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
            let password = encrypt(passwordG);
            //console.log('password encrypt: ',password);
            //console.log('password desencrypt: ',desencrypt(password));
            let user = encrypt(username);
            //console.log('password encrypt: ',user);
            //console.log('password desencrypt: ',desencrypt(user));
            let fechsave = getFecha();
            containsUser();
            /*let object = { TITLE: title, USERNAME: user, USERPASSWORD: password, FECHMODIF: fechsave };
            await axios.post(BASE_URL, object)
                .then(response => response.status == 200 || response.status != '' ? setStatus('succes') : setStatus('error'))
                .catch(error => {
                    setStatus('error');
                    setMessage(error);
                });
            //console.log('status: ',status);
            if (status == 'succes') {
                setMessage('guardado con exito');
                setTimeout(() => setMessage(''), 3000);
            } else {
                setMessage('error al guardar los datos');
            }*/
        } else {
            setMessage('Hay campos vacios en el formulario');
        }
    }

    const containsUser = ()=>{
        let URL_REST = `${requests.spUser}${username.toLocaleLowerCase()}`;
        let userName = '';
        axios.get(URL_REST)
                .then(({ data }) => console.log("containsUser",data))
                .catch((error) => console.log('error calling pwd', error))
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
            <MessageSucces message={message} />
        </>
    )
}

export default AddPWD;
