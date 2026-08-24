import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RouterProvider } from 'react-router';

import { baseApi } from '@/shared/api/baseApi.js';

import { selectHasToken } from '@/features/auth';

import { StoreProvider } from './providers/StoreProvider';
import { router } from './providers/RouterProvider/router.jsx';
import { MainAppSkeleton } from './MainAppSkeleton';
import './styles/index.scss';

function AppContent() {
    const dispatch = useDispatch();

    const hasToken = useSelector(selectHasToken);
    const [initialHasToken] = useState(hasToken)

    const [isAuthChecked, setIsAuthChecked] = useState(false);

    useEffect(() => {
        const checkAuth = async() => {
            if (initialHasToken) {
                try {
                    await dispatch(baseApi.endpoints.fetchMe.initiate()).unwrap();
                } catch {
                    // Continue app initialization even if user fetch fails.
                }
            }
            setIsAuthChecked(true);
        }

        void checkAuth();
    }, [initialHasToken, dispatch]);

    // return <MainAppSkeleton />

    if (!isAuthChecked) {
        return <MainAppSkeleton />
    }

    return <RouterProvider router={router} />
}

function App() {
    return (
        <StoreProvider>
            <AppContent />
       </StoreProvider>
   )
}

export default App;