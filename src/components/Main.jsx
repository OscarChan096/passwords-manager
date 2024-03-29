import React, { useState } from 'react';
import { Outlet , useNavigate} from 'react-router-dom';

import './../css/Main.css';

const main = () => {

    const [menuActive, setMenuActive] = useState(false);
    const navigate = useNavigate();
    
    const toggleMenu = () => {
        setMenuActive(!menuActive);
    }

    const main = () => {
        navigate('/sp');
    }

    const add = () => {
        navigate('/add');
    }

    const cards = () => {
        navigate('/cards');
    }

    const about = () => {
        navigate('/about');
    }

    return (
        <>
            <header>
                <span className='logo-text'>~/0SKR&gt;PASSWORDS_</span>

                <button
                    onClick={toggleMenu}
                    className='header-bttn'>
                    <svg className='menu-svg' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                    </svg>
                </button>

                <nav className={`header-nav ${menuActive ? 'isActive' : ''}`}>
                    <ul className='header-ul'>
                        <li className='header-li' onClick={main}>Inicio</li>
                        <li className='header-li' onClick={add}>Add</li>
                        <li className='header-li' onClick={cards}>Cards</li>
                        <li className='header-li' onClick={about}>About</li>
                    </ul>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>

            <footer></footer>
        </>
    )
}

export default main;