import React from 'react'

import './../css/TableData.css';

const TableData = ({ data }) => {

    console.log('data: ', data);

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>title</th>
                        <th>user</th>
                        <th>password</th>
                    </tr>
                </thead>
                    {data.map(({id,title,username,userpassword},index) => (
                        <tbody key={index}>
                            <td>{id}</td>
                            <td>{title}</td>
                            <td>{username}</td>
                            <td>{userpassword}</td>
                        </tbody>
                    ))}
            </table>
        </>
    )
}

export default TableData;
