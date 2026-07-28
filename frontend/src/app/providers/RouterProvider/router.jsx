import { createBrowserRouter } from 'react-router';

import { ErrorBoundary } from '@/shared/ui/ErrorBoundary';

import { mapSearchParamsToFormState } from '@/entities/search';

import { PrivateRoute } from '@/features/auth';
import { useSearchFormStore} from '@/features/search';

import { Layout } from '../../layouts/Layout';
import { MainAppSkeleton } from '../../MainAppSkeleton';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        hydrateFallbackElement: <MainAppSkeleton />,
        children: [
            {
                errorElement: <ErrorBoundary/>,
                children: [
                    {
                        index: true,
                        lazy: async () => {
                            const [{ HotelsPage }, { hotelsLoader }] = await Promise.all([
                                import('@/pages/HotelsPage'),
                                import('../../model/hotelsLoader.js')
                            ])

                            return {
                                Component: HotelsPage,
                                loader: hotelsLoader,
                            }
                        },
                    },
                    {
                        path: 'hotels/:id',
                        lazy: async () => {
                            const [{ HotelDetailsPage }, { hotelDetailsLoader }] = await Promise.all([
                                import('@/pages/HotelDetailsPage'),
                                import('../../model/hotelDetailsLoader.js')
                            ])

                            return {
                                Component: HotelDetailsPage,
                                loader: hotelDetailsLoader,
                            }
                        },
                    },
                    {
                        path: 'experiences',
                        lazy: async () => {
                            const { ExperiencesPage } = await import('@/pages/ExperiencesPage');
                            return { Component: ExperiencesPage };
                        },
                    },
                    {
                        path: 'services',
                        lazy: async () => {
                            const { ServicesPage } = await import('@/pages/ServicesPage');
                            return { Component: ServicesPage };
                        },
                    },
                    {
                        element: <PrivateRoute />,
                        children: [
                            {
                                path: 'wishlist',
                                lazy: async () => {
                                    const { WishlistPage } = await import('@/pages/WishlistPage');
                                    return { Component: WishlistPage };
                                },
                            },
                        ]
                    }
                ]
            }
        ]
    },
])

router.subscribe(({ location }) => {
    const { search } = location;

    const { setFormState, resetFormState } = useSearchFormStore.getState().actions;

    if (search) {
        setFormState(mapSearchParamsToFormState(search))
    } else {
        resetFormState();
    }
})
