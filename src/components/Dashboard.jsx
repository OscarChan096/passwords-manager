import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingData from './LoadingData';
import Cards from './Cards';

import './../css/Dashboard.css';

export default function Dashboard() {

    const [pwd, setPwd] = useState({});
    const [title, setTitle] = useState('');

    const BASE_URL = 'http://127.0.0.1:5000/api/pwd/';

    const requests = {
        spTitle: `${BASE_URL}title/`,
    }

    useEffect(() => {
        if (title) {
            axios.get(`${requests.spTitle}${title.toLocaleLowerCase()}`)
                .then(({ data }) => setPwd(data))
                .catch((error) => console.log('error calling pwd', error))
        }
    }, [title]);

    const handleChange = (event) => {
        setTitle(event.target.value);
    }

    return (
        <>
            <div className='search-content'>
                <div className='bar-btn'>
                    <div className='search-bar'>
                        <input
                            className='search'
                            type='search'
                            placeholder='Search'
                            value={title}
                            onChange={handleChange}
                            autoFocus />
                    </div>
                    <button className='submit'>
                        <svg className='btn-search-svg' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className='content'>
                <div className='data'>
                    {Object.values(pwd).length == 0 ?
                        (<LoadingData />)
                        :
                        (<Cards pwd={pwd} />)}
                </div>
            </div>
        </>
    )
}
