import React from 'react'
import logo from './../assets/img/logo.png';

import './../css/About.css';

const About = () => {
    return (
        <div className='content-about'>
            <div className='about'>
                <h1 className='title'>~/0SKR&gt;PASSWORDS_</h1>
                <img className='logo' src={logo} alt='logo' />
                <label>By Oscar Chan</label>
            </div>
        </div>
    )
}

export default About;
