import React from 'react'
import logo from './../assets/img/logo.png';

import './../css/About.css';

const About = () => {
    return (
        <div className='content-about'>
            <div className='about'>
                <h1 className='title'>~/0SKR&gt;PASSWORDS_V2</h1>
                <img className='logo' src={logo} alt='logo' />
                <label className='by'>By Oscar Chan</label>
                <label className='edition'>Edition LH</label>
            </div>
        </div>
    )
}

export default About;
