import { Routes, Route, Navigate } from 'react-router'

import Layout from './components/Layout';

import Smiles from './pages/smiles';
import About from './pages/about';
import Contacts from './pages/contacts';
import ContactOption from './pages/contact-option';
import Todos from './pages/todos';


export default function App() {
  return (
    <Routes>
        <Route path='/' element={<Layout />}>
            <Route index element={<Smiles />}/>
            <Route path='/about' element={<About />}/>
            <Route path='/contacts'>
                <Route index element={<Contacts />}/>
                <Route path=':lang' element={<ContactOption />}/>
            </Route>
            <Route path='/todos' element={<Todos />}/>
            <Route path='*' element={<Navigate to='/' />}/>
        </Route>
    </Routes>
  );
}

