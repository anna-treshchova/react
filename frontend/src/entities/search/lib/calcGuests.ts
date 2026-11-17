import type { GuestCategories } from '../model/types.js';

export const calcGuests = (guestCategories: GuestCategories): number =>
    guestCategories.adults + guestCategories.children;
