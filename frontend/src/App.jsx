import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { useDispatch } from 'react-redux';

import {
    LoginPage,
    SignupPage,
    fetchCurrentUser
} from '@/features/auth';

import {
    EventsPage,
    EventPage,
    destinationsLoader,
    eventLoader
} from '@/features/events';


import { AboutPage } from '@/features/about';
import { WishlistPage } from '@/features/wishlist';
import { FormsPage } from '@/features/formik-forms';

import Layout from '@/app/Layout';
import PrivateRoute from '@/app/PrivateRoute';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'signup',
                element: <SignupPage />,
            },
            {
                index: true,
                element: <EventsPage />,
                loader: destinationsLoader,
            },
            {
                path: 'about',
                element: <AboutPage />,
            },
            {
                path: 'events/:id',
                element: <EventPage />,
                loader: eventLoader,
            },
            {
               path: 'wishlist',
                element: (
                    <PrivateRoute>
                        <WishlistPage />
                    </PrivateRoute>
                ),
            },
            {
                path: 'formik-forms',
                element: <FormsPage />,
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
