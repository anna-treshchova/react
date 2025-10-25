import { Outlet } from 'react-router';

import Header from './components/Header';
import Footer from './components/Footer';

import styles from './Layout.module.scss';

const Layout = () => {
    return (
        <div className={styles.layout}>
            <Header/>
            <Outlet />
            {/*<Footer />*/}
        </div>
    )
}

export default Layout;