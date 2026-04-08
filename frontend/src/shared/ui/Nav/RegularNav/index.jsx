import PropTypes from 'prop-types';
import { NAV_ROUTES } from '../navigation.constants.js';
import NavItem from './NavItem';
import styles from './RegularNav.module.scss';


const RegularNav = () => {
    return (
        <nav className={styles.nav}>
            { NAV_ROUTES.map(route => (
                <NavItem
                    key={route.id}
                    route={route}
                />
            ))}
        </nav>
    )
}

// Nav.propTypes = {
//     isSearchOpen: PropTypes.bool.isRequired,
// }

export default RegularNav;