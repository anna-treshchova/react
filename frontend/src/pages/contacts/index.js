import { useContext } from 'react';
import { NavLink } from 'react-router';

import { ThemeContext } from '../../contexts/ThemeContext';

import styles from './Contacts.module.css';

export default function Contacts() {
    const { theme } = useContext(ThemeContext);

    return (
        <div className={`${styles.contacts} ${styles[`mode-${theme}`]}`}>
            <h1>Contacts</h1>
            <ul>
                <li>
                    <NavLink
                        to='/contacts/ua'
                        className={styles['contacts__option']}
                    >
                        Ukrainian Speaking Support
                    </NavLink>
                </li>
                <li >
                    <NavLink
                        to='/contacts/en'
                        className={styles['contacts__option']}
                    >
                        English Speaking Support
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}