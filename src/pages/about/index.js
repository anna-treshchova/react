import { useContext } from 'react';
import { useNavigate } from 'react-router';

import { ThemeContext } from '../../contexts/ThemeContext';

export default function About() {
    const { theme } = useContext(ThemeContext);

    const navigate = useNavigate();

    const goToContacts = () => {
        navigate('/contacts')
    }

    return (
        <div
            className='about'
            style={{
                color: theme === 'light' ? '#000000' : '#ffffff',
                backgroundColor: theme === 'light' ? 'transparent' : '#1e1f22',
            }}
        >
            <h1>About</h1>
            <div>This page was created to test routs</div>

            <button
                onClick={goToContacts}
                style={{marginTop: '20px'}}
            >Contact us</button>
        </div>
    )
}


/*——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————*/