import { NavLink } from 'react-router';

import styles from './Header.module.css'

const Header = () => {
    return (
        <header className={styles.header}>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='about-us'>About us</NavLink>
        </header>
    )
}

export default Header;