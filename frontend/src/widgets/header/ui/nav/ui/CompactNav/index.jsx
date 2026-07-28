import { NavLink } from 'react-router';
import { NAV_ROUTES } from '../../model/navigation.constants.js';
import styles from './CompactNav.module.scss';

export const CompactNav = () => {
    const getLinkClasses = (isActive) => [
        styles.link,
        isActive && styles.active,
    ].filter(Boolean).join(' ');

    return (
        <nav className={styles.nav}>
            { NAV_ROUTES.map(route => (
                <NavLink
                    key={route.id}
                    to={route.path}
                    className={({ isActive }) => getLinkClasses(isActive)}
                    style={{width: `${route.mobileWidth}px`}}
                >
                    {route.label}
                </NavLink>
            ))}
        </nav>
    )
}