import { useContext } from 'react';

import { ThemeContext } from '../../contexts/ThemeContext';

import styles from './Footer.module.css'

export default function Footer() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div
            className={styles.footer}
            style={{
                backgroundColor: theme === 'light' ?'#ffffff' : '#2b2d30',
                color: theme === 'light' ? '#000000' : '#ffffff',
            }}
        >
            <h2>Footer</h2>
            <span>Current theme: <strong>{theme}</strong></span>
            <button onClick={toggleTheme}>Change theme</button>
        </div>
    )
}