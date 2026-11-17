import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RouterProvider } from 'react-router';

import { userApi } from '@/entities/user';

import { selectHasToken } from '@/features/auth';

import { StoreProvider, useAppDispatch } from './providers/StoreProvider';
import { router } from './providers/RouterProvider/router';
import { MainAppSkeleton } from './MainAppSkeleton';

import './styles/index.scss';

function AppContent() {
    const dispatch = useAppDispatch();

    const hasToken = useSelector(selectHasToken);
    const [initialHasToken] = useState(hasToken)

    const [isAuthChecked, setIsAuthChecked] = useState(false);

    useEffect(() => {
        const checkAuth = async() => {
            if (initialHasToken) {
                try {
                    await dispatch(userApi.endpoints.fetchMe.initiate()).unwrap();
                } catch {
                    // Continue app initialization even if user fetch fails.
                }
            }
            setIsAuthChecked(true);
        }

        void checkAuth();
    }, [initialHasToken, dispatch]);

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