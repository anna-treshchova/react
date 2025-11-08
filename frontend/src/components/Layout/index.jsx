import { Outlet } from 'react-router'
import { NavLink } from 'react-router'

import { SIDE_ROUTES } from '@/helpers/sideRoutes.jsx';

import { Layout as AntLayout } from 'antd';
const { Header, Footer, Sider, Content } = AntLayout;

import styles from './Layout.module.css';

const Layout = () => (
    <AntLayout className={styles.layout}>
        <Header className={styles.header}>
            <h1 className='text-[26px] font-bold text-blue-600 tracking-wide text-start'>Logo</h1>
        </Header>
        <AntLayout>
            <Sider className={styles.sider}>
                <div className='flex flex-col gap-2'>
                    {SIDE_ROUTES.map(({ label, path, icon }) => (
                        <NavLink
                            key={label}
                            to={path}
                            className={({ isActive }) => isActive ? `${styles.link} ${styles.activeLink}`: styles.link}
                        >
                            <span>{icon}</span>
                            <span>{label}</span>
                        </NavLink>
                    ))}
                </div>
            </Sider>
            <Content className={styles.content}>
                <Outlet />
            </Content>
        </AntLayout>
        <Footer className={styles.footer}>Footer</Footer>
    </AntLayout>
);
export default Layout;



// import { Outlet } from 'react-router';
// import { NavLink } from 'react-router';
//
// const Layout = () => {
//     return (
//         <div className='flex flex-col bg-gray-100 text-gray-900'>
//             <header className='flex justify-between items-center py-4 px-14 bg-white shadow-md'>
//                 <h1 className='text-[26px] font-bold text-blue-600 tracking-wide'>Logo</h1>
//                 <nav className='space-x-5'>
//                     <NavLink to='/' className='font-light text-gray-700 hover:text-blue-600'>Home</NavLink>
//                     <NavLink to='/about-us' className='font-light text-gray-700 hover:text-blue-600'>About Us</NavLink>
//                     <NavLink to='/contacts' className='font-light text-gray-700 hover:text-blue-600'>Contacts</NavLink>
//                 </nav>
//             </header>
//             <Outlet/>
//         </div>
//     )
// }
//
// export default Layout;