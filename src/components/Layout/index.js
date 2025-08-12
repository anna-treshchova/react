import { Outlet } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'

export default function Layout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}


/*

 <Outlet /> — це спеціальний компонент з React Router

  Його:
        1. імпортують з react-router-dom

        2. вставляють у JSX розмітку компонента-обгортки (зазвичай Layout) на місце де буде рендеритись вміст дочірніх
           маршрутів (nested routes) — підмаршрутів головного маршруту 

*/