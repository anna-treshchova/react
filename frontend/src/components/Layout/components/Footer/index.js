import { useContext } from 'react';

import { ThemeContext } from '../../../../contexts/ThemeContext';

import styles from './Footer.module.css'

export default function Footer() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <footer
            className={`${styles.footer} ${styles[`mode-${theme}`]}`}
        >
            <span>Current theme: {theme}</span>
            <button onClick={toggleTheme}>Change</button>
        </footer>
    )
}