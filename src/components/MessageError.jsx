import React from 'react'

import './../css/Message.css';

const MessageError = ({message}) => {
    return (
        <label className='error'>{message}</label>
    )
}

export default MessageError;
