export const calcGuests = (guestCategories) => {
    if (!guestCategories) return 0;

    const adults = Number(guestCategories.adults || 0);
    const children = Number(guestCategories.children || 0);

    return adults + children;
}