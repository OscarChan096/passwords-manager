import '../css/Add.css';
import { useNavigate } from 'react-router-dom';

const Add = () => {

    const navigate = useNavigate();

    const addPwd = () => {
        navigate('/add/pwd');
    }

    const addCard = () => {
        navigate('/add/card');
    }

    return (
        <>
            <div className="content-adds">
                <div className="col-1">
                    <span onClick={addPwd} className='addpwd-span'>ADD PWD</span>
                </div>
                <div className="col-2">
                    <span onClick={addCard} className='addcard-span'>ADD CARD</span>
                </div>
            </div>
        </>
    )
}

export default Add;
