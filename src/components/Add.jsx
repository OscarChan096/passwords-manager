import React from 'react';
import { useState } from 'react';

import './../css/Add.css';

const Add = () => {

    const [isSymbol, setIsSymbol] = useState(true);
    const [isNumber, setIsNumber] = useState(true);
    const [isMayus, setIsMayus] = useState(true);
    const [isMinus, setIsMiuns] = useState(true);

    const changeSymbol = () => {
        setIsSymbol(!isSymbol);
    }

    const changeNumber = () => {
        setIsNumber(!isNumber);
    }

    const changeMayus = () => {
        setIsMayus(!isMayus);
    }

    const changeMinus = () => {
        setIsMiuns(!isMinus);
    }

    return (
        <>
            <div className='form-add'>
                <form>
                    <input className='form-title' type='text' placeholder='Title' />
                    <input className='form-user' type='text' placeholder='User' />
                    <input className='form-password' type='password' placeholder='Password' />
                    <div className='generate-pwds'>
                        <div className='checkbox-generate'>
                            <input className='bx' type='checkbox' id='symbol' name='Symbol' onChange={changeSymbol} checked={isSymbol}/>
                            <label className='lb' htmlFor='symbol'>Symbol</label>
                            <input className='bx' type='checkbox' id='number' name='Number' onChange={changeNumber} checked={isNumber}/>
                            <label className='lb' htmlFor='number'>Number</label>
                        </div>
                        <div className='checkbox-generate'>
                            <input className='bx' type='checkbox' id='mayus' name='Mayus' onChange={changeMayus} checked={isMayus}/>
                            <label className='lb' htmlFor='mayus'>Mayus</label>
                            <input className='bx' type='checkbox' id='minus' name='Minus' onChange={changeMinus} checked={isMinus}/>
                            <label className='lb' htmlFor='minus'>Minus</label>
                        </div>
                        <button className='gener-btn'>Generate Password</button>
                    </div>
                    <input className='form-submit' type='submit' value='Save' />
                </form>

            </div>
        </>
    )
}

export default Add;
