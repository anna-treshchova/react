import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { useDispatch } from 'react-redux';

//loaders, thunks
import { fetchCurrentUser } from '@/store/thunks/authThunk.js';
import { destinationsLoader } from '@/loaders/destinationsLoader.js';
import { eventLoader } from '@/loaders/eventsLoader.js';

//pages
import Login from '@/pages/login';
import Signup from '@/pages/signup';
import Events from '@/pages/events';
import AboutUs from '@/pages/about-us';
import Event from '@/pages/event';
import Wishlist from '@/pages/wishlist';

//components
import Layout from '@/components/Layout';
import PrivateRoute from '@/components/PrivateRoute';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'signup',
                element: <Signup />,
            },
            {
                index: true,
                element: <Events />,
                loader: destinationsLoader,
            },
            {
                path: 'about-us',
                element: <AboutUs />,
            },
            {
                path: 'events/:id',
                element: <Event />,
                loader: eventLoader,
            },
            {
               path: 'wishlist',
                element: (
                    <PrivateRoute>
                        <Wishlist />
                    </PrivateRoute>
                ),
            },
            {
                path: '*',
                element: <div
                    style={{
                        marginTop: '30px',
                        fontSize: '22px',
                        fontWeight: 200
                    }}
                >
                    404 Page
                </div>
            }
        ]
    }
])

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCurrentUser());
    }, [dispatch]);

  return (<RouterProvider router={router}/>)
}

export default App
