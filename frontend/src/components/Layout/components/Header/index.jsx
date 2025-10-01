import { NavLink } from 'react-router';
import { ConfigProvider, Button } from 'antd';
import { LoginOutlined } from '@ant-design/icons';

import AirbnbLogo from '/src/assets/AirbnbLogo.svg';

import styles from './Header.module.scss'

const Header = () => {
    return (
        <header className={styles.header}>
            <img src={AirbnbLogo} alt="Airbnb Logo" width={100} height={48} />
            <nav>
                <NavLink
                    to='/'
                    className={({ isActive }) =>
                        `${isActive ? `${styles.navLink} ${styles.active}` : styles.navLink }`
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to='about'
                    className={({ isActive }) =>
                        `${isActive ? `${styles.navLink} ${styles.active}` : styles.navLink }`
                    }
                >About</NavLink>
            </nav>
            <div className={styles['header__btn-box']}>
                <ConfigProvider
                    theme={{
                        components: {
                            Button: {
                                defaultHoverBorderColor: '#ff385b',
                                defaultHoverColor: '#ff385b',
                                defaultBackgroundColor: '#000000',
                            }
                        }
                    }}
                >
                    <Button
                        shape='circle'
                        size='large'
                        icon={<LoginOutlined />}
                        component={NavLink}
                        to="/about"
                    />
                </ConfigProvider>
            </div>
        </header>
    )
}

export default Header;