import type { ComponentType, SVGProps } from 'react';

import SelfCheckInIcon from '@/shared/assets/icons/self-checkin.svg?react';
import CancellationIcon from '@/shared/assets/icons/cancellation.svg?react';
import PetsIcon from '@/shared/assets/icons/pets.svg?react';
import CityViewIcon from '@/shared/assets/icons/city-view.svg?react';
import WifiIcon from '@/shared/assets/icons/wifi.svg?react';
import LocationIcon from '@/shared/assets/icons/location.svg?react';

interface Amenity {
    title: string;
    description: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const AMENITIES_MAP = {
    'Self check-in': {
        title: 'Self check-in',
        description: 'Check yourself in with the lockbox.',
        icon: SelfCheckInIcon
    },
    'City view': {
        title: 'City view',
        description: 'Soak up the view during your stay.',
        icon: CityViewIcon
    },
    'Free cancellation up to two weeks': {
        title: 'Free cancellation up to two weeks',
        description: 'Get a full refund if you change your mind.',
        icon: CancellationIcon
    },
    'Fast wifi': {
        title: 'Fast wifi',
        description: 'At 57 Mbps, you can take video calls and stream videos.',
        icon: WifiIcon
    },
    'Great location': {
        title: 'Great location',
        description: 'Guests who stayed here in the past year loved the location.',
        icon: LocationIcon
    },
    'Pets allowed': {
        title: 'Furry friends welcome',
        description: 'Bring your pets along for the stay.',
        icon: PetsIcon
    }
} as const satisfies Record<string, Amenity>;


type AmenitiesKey = keyof typeof AMENITIES_MAP;

export const isAmenity = (amenity: string): amenity is AmenitiesKey => {
    return Object.hasOwn(AMENITIES_MAP, amenity);
}