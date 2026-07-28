import { useEffect, useState } from 'react';

import { HUB_PATHS, DETAILS_PATHS, WISHLIST_PATH } from '@/shared/constants/paths.js';

import { HeaderSkeleton } from '@/widgets/header';

import { HotelsPageSkeleton } from '@/pages/HotelsPage';
import { HotelDetailsSkeleton } from '@/pages/HotelDetailsPage';
import { WishlistSkeleton } from '@/pages/WishlistPage';

const getScreen = () => {
    if (typeof window === 'undefined') return 'desk';
    if (window.innerWidth < 768) return 'mob';
    if (window.innerWidth < 992) return 'tab';
    return 'desk';
}

const getPageType = () => {
    if (typeof window === 'undefined') return 'hub';
    const pathname = window.location.pathname;
    const search = window.location.search;

    const isHub = HUB_PATHS.includes(pathname) && !search;
    const isDetails = DETAILS_PATHS.some(path => pathname.startsWith(path));
    const isWishlist = pathname === WISHLIST_PATH;

    if (isHub) return 'home';
    if (isDetails) return 'details';
    if (isWishlist) return 'wishlist';

    return 'catalog';
}

export const MainAppSkeleton = () => {
    const [screen, setScreen] = useState(getScreen);
    const pageType = getPageType();

    const isHub = pageType === 'home';

    useEffect(() => {
        const handleResize = () => setScreen(getScreen());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    const isHeaderHidden = pageType === 'details' && screen === 'mob';

    const renderContentSkeleton = () => {
        switch (pageType) {
            case 'details':
                return <HotelDetailsSkeleton isMobile={screen === 'mob'} />
            case 'wishlist':
                return <WishlistSkeleton />
            case 'home':
            case 'catalog':
                return <HotelsPageSkeleton />
        }
    }
    return (
        <div
            data-screen={screen}
            data-hub={isHub}
            data-page-type={pageType}
        >
            {!isHeaderHidden && <HeaderSkeleton isHub={isHub} />}

            <main>
                {renderContentSkeleton()}
            </main>
        </div>
    )
}