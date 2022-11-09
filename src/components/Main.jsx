import React from 'react';
import { useState } from 'react';
import './../css/Main.css';
import Dashboard from './Dashboard';

const main = () => {

    const [menuActive, setMenuActive] = useState( false );
    const toggleMenu = () => {
        setMenuActive( !menuActive );
    }

    return (
        <>
            <header>
                <span className='logo-text'><a href='#'>~/SC&gt;PASSWORDS_</a></span>
                
                <button
                    onClick={toggleMenu}
                    className='header-bttn'>
                    <svg className='menu-svg' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                    </svg>
                </button>

                <nav className={`header-nav ${ menuActive ? 'isActive':''}`}>
                    <ul className='header-ul'>
                        <a href='#'><li className='header-li'>Add</li></a>
                        <a href='#'><li className='header-li'>Settings</li></a>
                        <a href='#'><li className='header-li'>Login</li></a>
                        <a href='#'><li className='header-li'>About</li></a>
                    </ul>
                </nav>
            </header>
            <Dashboard />
        </>
    )
}

export default main;