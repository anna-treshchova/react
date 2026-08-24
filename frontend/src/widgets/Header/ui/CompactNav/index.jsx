import { NavLink } from 'react-router';
import { navConfig } from '../../model/nav.config.js';
import styles from './CompactNav.module.scss';

export const CompactNav = () => {
    return (
        <nav className={styles.nav}>
            {navConfig.map(route => (
                <div
                    key={route.id}
                    className={styles.navItem}
                    style={{width: `${route.width.mob}px`}}
                >
                    <NavLink
                        to={route.path}
                        className={({ isActive }) =>
                            `${styles.link} ${isActive && styles.active || ''}`
                        }
                    >
                        {route.label}
                    </NavLink>
                </div>
                ))}
        </nav>
    )
}