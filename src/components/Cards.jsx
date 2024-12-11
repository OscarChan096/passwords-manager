import React, { useState } from 'react';
import axios from 'axios';
import MessageError from './MessageError';
import MessageSucces from './MessageSucces';
import { desencrypt, encrypt } from '../encryption';
import { getFecha } from '../sysdate';
import ConfirmationModal from './ConfirmationModal';
import { DATA } from '../../properties';

import './../css/Cards.css';

const Cards = ({ pwd }) => {

    const [editTitle, setEditTitle] = useState('');
    const [editUser, setEditUser] = useState('');
    const [editPassword, setEditPassword] = useState('');
    const [edit, setEdit] = useState(true);
    const [show, setShow] = useState('password');
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const [succes, setSucces] = useState(false);
    const [changeTitle, setChangeTitle] = useState(false);
    const [changeUser, setChangeUser] = useState(false);
    const [changePass, setChangePass] = useState(false);
    const [auxId, setAuxId] = useState('');

    const BASE_URL = DATA.BASE_URL_PWD;
    console.log('Cards - BASE_URL:',BASE_URL);
    //const BASE_URL = 'http://127.0.0.1:5000/api/pwd/';
    //const BASE_URL = 'https://apex.oracle.com/pls/apex/oskdev/APIPWD/pwds';
    //console.log('cards.pwd: ', pwd);

    const handleChangeTitle = (event) => {
        setChangeTitle(true);
        setEditTitle(event.target.value);
    }

    const handleChangeUser = (event) => {
        setChangeUser(true);
        setEditUser(event.target.value);
    }

    const handleChangePassword = (event) => {
        setChangePass(true);
        setEditPassword(event.target.value);
    }

    const editable = (title, username, userpassword, index) => {
        setEditTitle(title);
        setEditUser(username);
        setEditPassword(userpassword);
        setEdit(!edit);
        console.log(index);
    }

    const showPassword = () => {
        if (show == 'password')
            setShow('text');
        else
            setShow('password');
    }

    const confirmationModal = async (confirm) => {
        if ({ confirm }) {
            await axios.delete(`${BASE_URL}${auxId}`)
                .then(response => messageResponse(response.status))
                .catch(error => {
                    setError(true);
                    setMessage(error);
                });
        }
    };

    const auxIdModal = ({id}) => {
        setAuxId(id);
    }

    const messageResponse = (status) => {
        if(status == 204){
            setSucces(true);
            setMessage('Eliminado con éxito');
        }
    }

    const update = async (id) => {
        if (changeTitle || changeUser || changePass) {
            let fechmodif = getFecha();
            let password = changePass ? encrypt(editPassword) : editPassword;
            //let user = changeUser ? encrypt(editUser) : editUser;
            let load = { TITLE: editTitle, USERNAME: editUser, USERPASSWORD: password, FECHMODIF: fechmodif }
            await axios.put(`${BASE_URL}/${id}`, load)
                .then(response => console.log(response))
                .catch(error => {
                    setError(true);
                    setMessage(error);
                });
            setEdit(!edit);
            setMessage('Actualizado');
            setSucces(true);
            setChangeTitle(false);
            setChangeUser(false);
            setChangePass(false);
        }
    }

    return (
        pwd.map(({ ID, TITLE, USERNAME, USERPASSWORD, FECHMODIF }, index) => (
            <div key={index} className='card'>
                <div className='info-card'>
                    <ul>
                        <li>
                            <span className='id'>id: </span>{ID}
                            <span className='fechaModif'>{FECHMODIF}</span>
                        </li>
                        <li>
                            <span className='title'>Title:</span>
                            <input type='text' value={edit ? TITLE : editTitle} onChange={handleChangeTitle} placeholder='title' disabled={edit} />
                        </li>
                        <li>
                            <span className='user'>User:</span>
                            <input type='text' value={edit ? desencrypt(USERNAME) : desencrypt(editUser)} onChange={handleChangeUser} placeholder='user' disabled={edit} />
                        </li>
                        <li>
                            <span className='password'>Password:</span>
                            <div className='box-password'>
                                <input type={show} value={edit ? desencrypt(USERPASSWORD) : desencrypt(editPassword)} onChange={handleChangePassword} placeholder='password' disabled={edit} />
                                <button id='show' className='btn-edit' onClick={showPassword}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                    </svg>
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='edit-card'>
                    {edit ?
                        (<button id='edit' className='btn-edit' onClick={() => editable(TITLE, USERNAME, USERPASSWORD, index)}>Editar</button>)
                        :
                        (<button id='save' className='btn-edit' onClick={() => update(ID)}>Guardar</button>)
                    }
                    <ConfirmationModal id={ID} confirmModal={confirmationModal} auxIdModal={auxIdModal}/>
                </div >
                {!edit && <button id='cancel' className='btn-edit' onClick={editable}>Cancelar</button>}
                {error ? <MessageError message={message} /> : ''}
                {succes && <MessageSucces message={message} />}
            </div>
        ))
    )
}

export default Cards;
