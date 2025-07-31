import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext(null);

export default function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('theme')) || 'light';
        } catch {
            return 'light';
        }
    })

    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(theme));
        document.documentElement.className = theme;
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light')
    }

    const themeValue = {
        theme,
        toggleTheme,
    }

    return (
        <ThemeContext.Provider value={themeValue}>
            { children }
        </ThemeContext.Provider>
    )
}