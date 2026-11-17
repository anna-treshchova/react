import { navRoutesConfig } from '../../model';
import { NavItem } from './NavItem';
import styles from './RegularNav.module.scss';

export const RegularNav = () => {
    return (
        <nav className={styles.nav}>
            {navRoutesConfig.map((route, index) => (
                <NavItem
                    key={route.id}
                    route={route}
                    index={index}
                />
            ))}
        </nav>
    )
}