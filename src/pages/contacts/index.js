import { useContext } from 'react'

import { ThemeContext } from '../../contexts/ThemeContext'

export default function Contacts() {
    const { theme } = useContext(ThemeContext);

    return (
        <div
            className='contacts'
            style={{
                color: theme === 'light' ? '#000000' : '#ffffff',
                backgroundColor: theme === 'light' ? 'transparent' : '#1e1f22',
            }}
        >
            <h1>Contacts:</h1>
            <div style={{textAlign: 'start'}}>
                <div>Tel: +38 066 379 5721</div>
                <div>Email: anna.treshchova@gmail.com</div>
            </div>
        </div>
    )
}