import React, {useState} from 'react';

import './../css/Add.css';

const Add = () => {

    const [limitChar, setLimitChar] = useState(8);
    const [passwordG, setPasswordG] = useState('');

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

    const save = () => {
        
    }

    return (
        <>
            <div className='form-add'>
                <form>
                    <input className='form-title' type='text' placeholder='Title' />
                    <input className='form-user' type='text' placeholder='User' />
                    <input className='form-password' type='text' placeholder='Password' onChange={handleChangePwd} value={passwordG}/>
                    <div className='generate-pwds'>
                        <input className='limit-password' type='number' id='limit' name='limit' placeholder='8' onChange={changeLimit} value={limitChar} />
                        <div className='gener-btn' onClick={generatePassword}>Generate Password</div>
                    </div>
                    <input className='form-submit' type='submit' value='Save' onClick={save}/>
                </form>
            </div>
        </>
    )
}

export default Add;
