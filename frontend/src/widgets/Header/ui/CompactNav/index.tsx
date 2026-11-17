import { NavLink } from 'react-router';
import { navRoutesConfig } from '../../model';
import styles from './CompactNav.module.scss';

export const CompactNav = () => {
    return (
        <nav className={styles.nav}>
            {navRoutesConfig.map(route => (
                <div
                    key={route.id}
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