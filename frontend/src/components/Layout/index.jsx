import { Outlet } from 'react-router';

import Header from './components/Header';
import SideBar from './components/SideBar';
import Footer from './components/Footer';

import styles from './layout.module.css';

const Layout = () => {
    return (
        <div className={styles.layout}>
            <Header />
            <div className={styles['layout__main']}>
                <SideBar />
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Layout;