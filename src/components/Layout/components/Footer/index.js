import { useContext } from 'react';

import { ThemeContext } from '../../../../contexts/ThemeContext';

import styles from './Footer.module.css'

export default function Footer() {
    const {theme, toggleTheme} = useContext(ThemeContext);

    return (
        <div className={`${styles.footer} ${styles[`mode-${theme}`]}`}>
            <h1>Footer</h1>
            <span>Current theme: <strong>{theme}</strong></span>
            <button onClick={toggleTheme}>Change theme</button>
        </div>
    )
}