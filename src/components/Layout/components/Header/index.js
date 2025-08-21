import { useContext } from 'react';
import { NavLink } from 'react-router';

import { ThemeContext } from '../../../../contexts/ThemeContext';

import styles from './Header.module.css';

export default function Header() {
    const { theme } = useContext(ThemeContext);

    const getLinkClass = ({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link;

    return (
        <header
            className={`${styles.header} ${styles[`mode-${theme}`]}`}
        >
            <NavLink to='/' className={getLinkClass}>Home</NavLink>
            <NavLink to='/about' className={getLinkClass}>About us</NavLink>
            <NavLink to='/contacts' className={getLinkClass}>Contacts</NavLink>
            <NavLink to='/todo' className={getLinkClass}>Todo</NavLink>
        </header>
    )
}