import { useContext } from 'react';

import { ThemeContext } from '../../contexts/ThemeContext';

import styles from './Header.module.css';

export default function Header() {
    const { theme } = useContext(ThemeContext);

    return (
        <div
            className={styles.header}
            style={{
                backgroundColor: theme === 'light' ?'#ffffff' : '#2b2d30',
                color: theme === 'light' ? '#000000' : '#ffffff',
            }}
        >
            <h2>Header</h2>
        </div>
    )
}