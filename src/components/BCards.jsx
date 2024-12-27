import React, { useState } from "react";
import axios from "axios";
import MessageError from './MessageError';
import MessageSucces from './MessageSucces';
import { encrypt, desencrypt } from "../encryption";
import ConfirmationModal from './ConfirmationModal';
import { DATA } from '../../properties';

import '../css/BCards.css';

const BCards = ({ infoCards }) => {

    let auxID = '';

    const [editNameBank, setEditNameBank] = useState('');
    const [editAccNum, setEditAccNum] = useState('');
    const [editDate, setEditDate] = useState('');
    const [editCVV, setEditCVV] = useState('');
    const [editNIP, setEditNIP] = useState('');
    const [editAppUserName, setEditAppUserName] = useState('');
    const [editAppPass, setEditAppPass] = useState('');
    const [editTypeCard, setEditTypeCard] = useState('');

    const [auxNameBank, setAuxNameBank] = useState('');
    const [auxDate, setAuxDate] = useState('');
    const [auxTypeCard, setAuxTypeCard] = useState('');

    const [edit, setEdit] = useState(true);
    const [show, setShow] = useState('password');
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const [succes, setSucces] = useState(false);
    const [axId, setAxId] = useState('');

    const [changeNameBank, setChangeNameBank] = useState(false);
    const [changeAccNum, setChangeAccNum] = useState(false);
    const [changeDate, setChangeDate] = useState(false);
    const [changeCVV, setChangeCVV] = useState(false);
    const [changeNIP, setChangeNIP] = useState(false);
    const [changeAppUserName, setChangeAppUserName] = useState(false);
    const [changeAppPass, setChangeAppPass] = useState(false);
    const [changeTypeCard, setChangeTypeCard] = useState(false);

    const BASE_URL = DATA.BASE_URL_PWD+'bank/card';
    console.log('BCards - BASE_URL:',BASE_URL);
    //const BASE_URL = 'http://127.0.0.1:5000/api/pwd/bank/card';

    const handleChangeNameBank = (event) => {
        setChangeNameBank(true);
        setEditNameBank(event.target.value);
    }

    const handleChangeAccNum = (event) => {
        setChangeAccNum(true);
        setEditAccNum(event.target.value);
    }

    const handleChangeDate = (event) => {
        setChangeDate(true);
        setEditDate(event.target.value);
    }

    const handleChangeCVV = (event) => {
        setChangeCVV(true);
        setEditCVV(event.target.value);
    }

    const handleChangeNIP = (event) => {
        setChangeNIP(true);
        setEditNIP(event.target.value);
    }

    const handleChangeAUN = (event) => {
        setChangeAppUserName(true);
        setEditAppUserName(event.target.value);
    }

    const handleChangeAP = (event) => {
        setChangeAppPass(true);
        setEditAppPass(event.target.value);
    }

    const handleChangeType = (event) => {
        setChangeTypeCard(true);
        setEditTypeCard(event.target.value);
    }

    const showPassword = () => {
        if (show == 'password')
            setShow('text');
        else
            setShow('password');
    }

    const editable = (bank_name, account_number, date, cvv, nip, app_user_name, app_password, type, index) => {
        setEditNameBank(bank_name);
        setAuxNameBank(bank_name);
        setEditAccNum(account_number);
        setEditDate(date);
        setAuxDate(date);
        setEditCVV(cvv);
        setEditNIP(nip);
        setEditAppUserName(app_user_name);
        setEditAppPass(app_password);
        setEditTypeCard(type);
        setAuxTypeCard(type);
        setEdit(!edit);
        console.log(index);
    }

    const confirmationModal = async (confirm) => {
        console.log('ENDPOINT:',`${BASE_URL}/${auxID}`);
        if ({ confirm }) {
            await axios.delete(`${BASE_URL}/${auxID}`)
            .then(response => messageResponse(response.status))
            .catch(error => {
                setError(true);
                setMessage(`Error: ${error}`);
            });
        }
    };

    const auxIdModal = ( id ) => {
        //setAxId(id);
        auxID = id;
        console.log('auxID',auxID);
    }

    const messageResponse = (status) => {
        if (status == 204) {
            setSucces(true);
            setMessage('Eliminado con éxito');
            setError(false);
        }
    }

    const update = async (id) => {
        let name_bank = changeNameBank ? editNameBank : auxNameBank;
        let accNum = changeAccNum ? encrypt(editAccNum) : editAccNum;
        let date = changeDate ? editDate : auxDate;
        let cvv = changeCVV ? encrypt(editCVV) : editCVV;
        let nip = changeNIP ? encrypt(editNIP) : editNIP;
        let appUserName = changeAppUserName ? encrypt(editAppUserName) : editAppUserName;
        let userPasswordApp = changeAppPass ? encrypt(editAppPass) : editAppPass;
        let typeCard = changeTypeCard ? editTypeCard : auxTypeCard;
        let load = { bank_name: name_bank, account_number: accNum, date: date, cvv: cvv, nip: nip, app_user_name: appUserName, app_password: userPasswordApp, type: typeCard }
        await axios.put(`${BASE_URL}/${id}`, load)
            .then(response => console.log(response))
            .catch(error => {
                setError(true);
                setMessage(error);
            });
        setEdit(!edit);
        setMessage('Actualizado');
        setSucces(true);
        setChangeNameBank(false);
        setChangeAccNum(false);
        setChangeDate(false);
        setChangeCVV(false);
        setChangeNIP(false);
        setChangeAppUserName(false);
        setChangeAppPass(false);
        setChangeTypeCard(false);
    }

    /*const del = async (id) => {
        await axios.delete(`${BASE_URL}/${id}`)
            .then(response => console.log(response))
            .catch(error => {
                setError(true);
                setMessage(error);
            });
    }*/

    return (
        infoCards.map(({ id, bank_name, account_number, date, cvv, nip, app_user_name, app_password, type }, index) => (
            <div key={index} className='BCards'>
                <div className='info-card'>
                    <ul>
                        <li><span className='id'>id: </span>{id}</li>
                        <li>
                            <span className='span-banco'>Banco:</span>
                            <input className='infoCardInput' type='text' value={edit ? bank_name : editNameBank} onChange={handleChangeNameBank} placeholder='Banco' disabled={edit} />
                        </li>
                        <li>
                            <span className='span-acc'>Número de tarjeta:</span>
                            <input className='infoCardInput' type='text' value={edit ? desencrypt(account_number) : desencrypt(editAccNum)} onChange={handleChangeAccNum} placeholder='Numero de tarjeta' disabled={edit} />
                        </li>
                        <li>
                            <div className="div-infCard">
                                <input className='date' type='text' value={edit ? date : editDate} onChange={handleChangeDate} placeholder='Fecha de vencimiento' disabled={edit} />
                                <span className='span-CVV'>CVV:</span>
                                <input className='cvv' type={show} value={edit ? desencrypt(cvv) : desencrypt(editCVV)} onChange={handleChangeCVV} placeholder='CVV' disabled={edit} />
                                <span className='span-NIP'>NIP:</span>
                                <input className='nip' type={show} value={edit ? desencrypt(nip) : desencrypt(editNIP)} onChange={handleChangeNIP} placeholder='NIP' disabled={edit} />
                                <button id='show' className='btn-edit' onClick={showPassword}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                    </svg>
                                </button>
                            </div>
                        </li>
                        <li>
                            <span className='span-aun'>Usuario:</span>
                            <input className='infoCardInput' type='text' value={edit ? desencrypt(app_user_name) : desencrypt(editAppUserName)} onChange={handleChangeAUN} placeholder='Usuario' disabled={edit} />
                        </li>
                        <li>
                            <span className='span-ap'>Contraseña:</span>
                            <input className='infoCardInput' type={show} value={edit ? desencrypt(app_password) : desencrypt(editAppPass)} onChange={handleChangeAP} placeholder='Contraseña' disabled={edit} />
                        </li>
                    </ul>
                </div>
                <div className='edit-card'>
                    {edit ?
                        (<button id='edit' className='btn-edit' onClick={() => editable(bank_name, account_number, date, cvv, nip, app_user_name, app_password, type, index)}>Editar</button>)
                        :
                        (<button id='save' className='btn-edit' onClick={() => update(id)}>Guardar</button>)
                    }
                    <ConfirmationModal id={id} confirmModal={confirmationModal} auxIdModal={auxIdModal}/>
                </div >
                {!edit && <button id='cancel' className='btn-edit' onClick={editable}>Cancelar</button>}
                {error && <MessageError message={message} />}
                {succes && <MessageSucces message={message} />}
            </div>
        ))
    )
}

export default BCards;