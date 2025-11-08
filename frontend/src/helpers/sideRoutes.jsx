import HomeIcon from '@/assets/icons/home.svg?react'
import ContactsIcon from '@/assets/icons/contacts.svg?react'
import AboutIcon from '@/assets/icons/about.svg?react'

export const SIDE_ROUTES = [
    { label: 'Home', path: '/', icon: <HomeIcon /> },
    { label: 'My Wishlist', path: '/wishlist', icon: <HomeIcon /> },
    { label: 'Contacts', path: '/contacts', icon: <ContactsIcon /> },
    { label: 'About Us', path: '/about-us', icon: <AboutIcon /> },
]