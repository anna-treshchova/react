import homesAnimation from '@/assets/animations/house-flip.json';
import expAnimation from '@/assets/animations/hot-air-balloon.json';
import servicesAnimation from '@/assets/animations/hotel-bell.json';


export const NAV_ROUTES = [
    { label: 'Home', path: '/', animation: homesAnimation, size: 50 },
    { label: 'Experiences', path: '/experiences', animation: expAnimation, size: 55 },
    { label: 'Services', path: '/services', animation: servicesAnimation, size: 55 },
];