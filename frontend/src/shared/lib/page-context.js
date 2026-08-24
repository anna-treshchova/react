export const HUB_PATHS = ['/', '/experiences', '/services'];
export const DETAILS_PATHS = ['/hotels/', '/experiences/', '/services/'];
export const WISHLIST_PATH = '/wishlist';

export const PAGE_TYPES = {
    hub: 'hub',
    details: 'details',
    catalog: 'catalog',
    wishlist: 'wishlist',
}

export const getPageContext = (pathname = '/', search = '') => {
    const isHub = HUB_PATHS.includes(pathname) && !search;
    const isDetails = DETAILS_PATHS.some(path => pathname.startsWith(path));
    const isWishlist = pathname === WISHLIST_PATH;

    const pageType = isHub
        ? PAGE_TYPES.hub
        : isDetails
            ? PAGE_TYPES.details
            : isWishlist
                ? PAGE_TYPES.wishlist
                : PAGE_TYPES.catalog;

    return {
        pageType,
        isHub,
        isWIP: isHub && pathname !== '/'
    }
}