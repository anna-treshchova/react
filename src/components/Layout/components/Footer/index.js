import { useContext } from 'react';

import { ThemeContext } from '../../../../contexts/ThemeContext';

import styles from './Footer.module.css'

export default function Footer() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <footer
            className={styles.footer}
            style={{
                backgroundColor: theme === 'light' ?'#ffffff' : '#2b2d30',
                color: theme === 'light' ? '#000000' : '#ffffff',
            }}
        >
            <h1>Footer</h1>
            <span>Current theme: <strong>{theme}</strong></span>
            <button onClick={toggleTheme}>Change theme</button>
        </footer>
    )
}