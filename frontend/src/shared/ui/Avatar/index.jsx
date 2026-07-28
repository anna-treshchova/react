import styles from './Avatar.module.scss';

const AVATAR_THEMES = [
    { bg: '#fbebd6', text: '#c66c04' },
    { bg: '#ffe0e0', text: '#b61c1c' },
    { bg: '#ffe5ff', text: '#9f2da8' },
    { bg: '#eee9ff', text: '#503eb2' },
    { bg: '#dceffb', text: '#316d9e' },
    { bg: '#daf6f3', text: '#127f88' },
    { bg: '#d5f8da', text: '#26833c' },
]

const getAvatarTheme = (stringKey = '') => {
    let hash = 0;

    for (let i = 0; i < stringKey.length; i++) {
        const charCode = stringKey.charCodeAt(i);
        hash = charCode + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % AVATAR_THEMES.length;

    return AVATAR_THEMES[index];
}


export const Avatar = ({ id, label }) => {
    const theme = getAvatarTheme(id);

    return (
        <div
            className={styles.avatar}
            style={{ backgroundColor: theme.bg, color: theme.text }}
        >
            {label}
        </div>
    )
}