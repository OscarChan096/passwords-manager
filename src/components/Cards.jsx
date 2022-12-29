import React, { useState } from 'react';
import axios from 'axios';

import './../css/Cards.css';

const Cards = ({ pwd }) => {

    const [editTitle, setEditTitle] = useState('');
    const [editUser, setEditUser] = useState('');
    const [editPassword, setEditPassword] = useState('');
    const [edit, setEdit] = useState(true);
    const [show, setShow] = useState('password');

    const BASE_URL = 'http://127.0.0.1:5000/api/pwd/';

    const handleChangeTitle = (event) => {
        setEditTitle(event.target.value);
    }

    const handleChangeUser = (event) => {
        setEditUser(event.target.value);
    }

    const handleChangePassword = (event) => {
        setEditPassword(event.target.value);
    }

    const editable = () => {
        setEdit(!edit);
    }

    const showPassword = () => {
        if (show == 'password')
            setShow('text');
        else
            setShow('password');
    }

    const update = async (id) => {
        console.log("id: ", id);
        let load = { title: editTitle, username: editUser, userpassword: editPassword }
        let res = await axios.put(`${BASE_URL}/${id}`, load);
        let data = res.data;
        console.log(data);
        setEdit(!edit);
    }

    return (
        pwd.map(({ id, title, username, userpassword }, index) => (
            <div key={index} className='card'>
                <div className='info-card'>
                    <ul>
                        <li><span className='id'>id: </span>{id}</li>
                        <li>
                            <span className='title'>Title:</span>
                            <input type='text' value={edit ? title : editTitle} onChange={handleChangeTitle} placeholder='title' disabled={edit} />
                        </li>
                        <li>
                            <span className='user'>User:</span>
                            <input type='text' value={edit ? username : editUser} onChange={handleChangeUser} placeholder='user' disabled={edit} />
                        </li>
                        <li>
                            <span className='password'>Password:</span>
                            <div className='box-password'>
                                <input type={show} value={edit ? userpassword : editPassword} onChange={handleChangePassword} placeholder='password' disabled={edit} />
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
                        (<button id='edit' className='btn-edit' onClick={editable}>Editar</button>)
                        :
                        (<button id='save' className='btn-edit' onClick={() => update(id)}>Guardar</button>)
                    }
                    <button id='delete' className='btn-edit'>Eliminar</button>
                </div >
                {!edit && <button id='cancel' className='btn-edit' onClick={editable}>Cancelar</button>}
            </div>
        ))
    )
}

export default Cards;
