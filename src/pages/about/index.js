import { useContext } from 'react';

import { ThemeContext } from '../../contexts/ThemeContext';

export default function About() {
    const { theme } = useContext(ThemeContext);

    return (
        <div
            style={{color: theme === 'light' ? '#000000' : '#ffffff'}}
        >
            <h1>About</h1>
            <p>This page should contain information about the application or the team behind it.</p>
        </div>
    )
}