import React, { useState } from 'react';
import axios from 'axios';
import { encrypt } from './../encryption';

import './../css/AddCards.css';
import MessageSucces from './MessageSucces';

const AddCard = () => {

    const BASE_URL = 'http://127.0.0.1:5000/api/pwd/bank/card';

    const [nameBank, setNameBank] = useState('');
    const [accNum, setAccNum] = useState('');
    const [date, setDate] = useState('');
    const [cvv, setCVV] = useState('');
    const [nip, setNIP] = useState('');
    const [appUserName, setAppUserName] = useState('');
    const [appPassword, setAppPassword] = useState('');
    const [type, setType] = useState('');

    const [limitChar, setLimitChar] = useState(8);

    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const handleChangeNameBank = (event) => {
        //setChangeNameBank(true);
        setNameBank(event.target.value);
    }

    const handleChangeAccNum = (event) => {
        //setChangeAccNum(true);
        setAccNum(event.target.value);
    }

    const handleChangeDate = (event) => {
        //setChangeDate(true);
        setDate(event.target.value);
    }

    const handleChangeCVV = (event) => {
        //setChangeCVV(true);
        setCVV(event.target.value);
    }

    const handleChangeNIP = (event) => {
        //setChangeNIP(true);
        setNIP(event.target.value);
    }

    const handleChangeAUN = (event) => {
        //setChangeAppUserName(true);
        setAppUserName(event.target.value);
    }

    const handleChangeAP = (event) => {
        //setChangeAppPass(true);
        setAppPassword(event.target.value);
    }

    const handleChangeType = (event) => {
        //setChangeTypeCard(true);
        setType(event.target.value);
    }

    const changeLimit = (event) => {
        if (event.target.value >= 8)
            setLimitChar(event.target.value);
    }

    const generatePassword = () => {
        let pwd = '';
        const arr = ['~-+:_#.@', '0123456789', 'abcdefghijklmnopqrstuvwxyz', ''];
        if (appPassword.length > 0)
            setAppPassword('');

        for (let i = 0; i < limitChar; i++) {
            let index = Math.floor(Math.random() * 4);
            let char = arr[index];
            let size = char.length;
            pwd += index == 3 ? String.fromCharCode(arr[2].charCodeAt(Math.random() * 26) - 32) : char.charAt(Math.random() * size);
        }

        setAppPassword(pwd);
    }

    const save = async () => {
        if (nameBank.length != 0 && accNum.length != 0 && date.length != 0 && cvv.length != 0 && nip.length != 0) {
            let cifradoAccNum = encrypt(accNum);
            let cifradoCVV = encrypt(cvv);
            let cifradoNIP = encrypt(nip);
            let cifradoAppPass = encrypt(appPassword);
            let object = { bank_name: nameBank, account_number: cifradoAccNum, date: date, cvv: cifradoCVV, nip: cifradoNIP, app_user_name: appUserName, app_password: cifradoAppPass, type: type };
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
            }
        } else {
            setMessage('Hay campos vacios en el formulario');
        }
    }

    return (
        <>
            <div className='content-addCards'>
                <div className='AddCards'>
                    <div className='info-card'>
                        <ul>
                            <li>
                                <select id="tipo-tarjeta" name="tipo-tarjeta" value={type} onChange={handleChangeType}>
                                    <option value="0">Fisica</option>
                                    <option value="1">Virtual</option>
                                </select>
                            </li>
                            <li>
                                <input className='infoCardInput' type='text' value={nameBank} onChange={handleChangeNameBank} placeholder='Banco' />
                            </li>
                            <li>
                                <input className='infoCardInput' type='text' value={accNum} onChange={handleChangeAccNum} placeholder='Numero de tarjeta' />
                            </li>
                            <li>
                                <div className="div-infCard">
                                    <input className='date' type='text' value={date} onChange={handleChangeDate} placeholder='MM/YY' maxLength='5' />
                                    <input className='cvv' type='text' value={cvv} onChange={handleChangeCVV} placeholder='CVV' maxLength='3'/>
                                    <input className='nip' type='text' value={nip} onChange={handleChangeNIP} placeholder='NIP' maxLength='4'/>
                                </div>
                            </li>
                            <li>
                                <input className='infoCardInput' type='text' value={appUserName} onChange={handleChangeAUN} placeholder='Usuario' />
                            </li>
                            <li>
                                <div className='pass'>
                                    <input className='infoCardInput' type='text' value={appPassword} onChange={handleChangeAP} placeholder='Contraseña' />
                                    <input className='limit-password-addc' type='number' id='limit' name='limit' placeholder='8' onChange={changeLimit} value={limitChar} />
                                </div>
                                <div className='gener-btn' onClick={generatePassword}>Generate Password</div>
                            </li>
                        </ul>
                    </div>
                    <button className='form-submit' type='submit' value='Save' onClick={save}>Save</button>
                    <MessageSucces message={message} />
                </div>
            </div>
        </>
    )
}

export default AddCard;
