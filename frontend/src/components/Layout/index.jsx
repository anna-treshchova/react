import { Outlet } from 'react-router';

import Header from './components/Header';
import Footer from './components/Footer';

import styles from './Layout.module.css';

const Layout = () => {
    return (
        <div className={styles.layot}>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout;