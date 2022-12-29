import React from 'react'

import './../css/MessageError.css';

const MessageError = ({message}) => {
    return (
        <label className='error'>{message}</label>
    )
}

export default MessageError;
