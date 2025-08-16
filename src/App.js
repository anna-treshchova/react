import { Routes, Route, Navigate } from 'react-router';


import Layout from './components/Layout';
import Todo from './pages/todo';
import About from './pages/about';
import Contacts from './pages/contacts';
import Posts from './pages/posts';
import PostDetails from './pages/post-details';
import CounterRedux from './pages/counter-redux';



function App() {
  return (
    <>
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Todo />}/>
                <Route path='about' element={<About />}/>
                <Route path='contacts' element={<Contacts />}/>
                <Route path='posts'>
                    <Route index element={<Posts />}/>
                    <Route path=':id' element={<PostDetails />}/>
                </Route>
                <Route path='counter-redux' element={<CounterRedux />}/>
                <Route path='*' element={<Navigate to='/'/>}/>
            </Route>
        </Routes>
    </>
  );
}

export default App;


