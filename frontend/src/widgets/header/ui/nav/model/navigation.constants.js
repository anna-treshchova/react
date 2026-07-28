import homesAnimation from '../../../../../shared/assets/animations/house-flip.json';
import expAnimation from '../../../../../shared/assets/animations/hot-air-balloon.json';
import servicesAnimation from '../../../../../shared/assets/animations/hotel-bell.json';

export const NAV_ROUTES = [
    {
        id: 'homes',
        label: 'Homes',
        path: '/',
        animation: homesAnimation,
        iconSize: 50,
        mobileWidth: 45,
    },
    {
        id: 'experiences',
        label: 'Experiences',
        path: '/experiences',
        animation: expAnimation,
        iconSize: 55,
        mobileWidth: 72,
    },
    {
        id: 'services',
        label: 'Services',
        path: '/services',
        animation: servicesAnimation,
        iconSize: 55,
        mobileWidth: 50,
    },
];