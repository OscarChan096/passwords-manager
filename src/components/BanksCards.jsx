import { useEffect, useState } from 'react';
import axios from 'axios';
import BCards from './BCards';

import '../css/BanksCards.css';

const BanksCards = () => {

    const [infCards, setInfCards] = useState([]);

    const BASE_URL = 'http://127.0.0.1:5000/api/pwd/';

    const requests = {
        spTitle: `${BASE_URL}bank/cards`,
    }

    useEffect(() => {
        let URL_REST = `${requests.spTitle}`;
        console.log('URL_REST: ', URL_REST);
        axios.get(URL_REST)
            .then(({ data }) => setInfCards(data))
            .catch((error) => console.log('error calling pwd', error))
    }, []);

    return (
        <>
        <span className='span-title'>TARJETAS</span>
            <div className='container'>
                <div className='content'>
                    <div className='Bdata'>
                        {Object.values(infCards).length == 0 ?
                            (<label>Sin datos</label>)
                            :
                            (<BCards infoCards={infCards} />)
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default BanksCards;