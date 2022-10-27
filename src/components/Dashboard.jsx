import React from 'react';
import './../css/Dashboard.css';

export default function Dashboard() {
    return (
        <>
            <div className='search-content'>
                <div className='bar-btn'>
                    <div className='search-bar'>
                        <input className='search' type='search' placeholder='Search' />
                    </div>
                    <button className='submit'>
                        <svg className='btn-search-svg' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </button>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>title</th>
                        <th>user</th>
                        <th>password</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </>
    )
}