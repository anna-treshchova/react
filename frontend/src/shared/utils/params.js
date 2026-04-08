const getNumber = (value) => Number(value) || 0;

export const parseSearchParams = (params) => ({
    page: Number(params.get('page')) || 1,
    destination: {
        id: Number(params.get('destination')) || null,
        label: null,
    },
    guestCategories: {
        adults: getNumber(params.get('adults')),
        children: getNumber(params.get('children')),
        infants: getNumber(params.get('infants')),
        pets: getNumber(params.get('pets')),
    },
    dates: [
        params.get('checkin'),
        params.get('checkout'),
    ],
})

export const createSearchParams = (data) => {
    const nextParams = new URLSearchParams();

    const { destinationId, adults, children, infants, pets, checkin, checkout } = data;

    nextParams.set('page', '1')

    setParam(nextParams, 'destination', destinationId)

    setParam(nextParams, 'adults', adults)
    setParam(nextParams, 'children', children)
    setParam(nextParams, 'infants', infants)
    setParam(nextParams, 'pets', pets)

    setParam(nextParams, 'checkin', checkin)
    setParam(nextParams, 'checkout', checkout)

    return nextParams;
}

export const setParam = (params, key, value) => {
    if (value) params.set(key, String(value));
}