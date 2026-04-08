import { forwardRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router';

import { useLayoutStore } from '@/app/layout/useLayoutStore.js';
import { parseSearchParams, calcTotalGuests, pluralize } from '@/shared/utils';
import { formatDates, getDestLabel } from '@/features/search/lib/utils.js';

import Placeholder from './Placeholder/index.jsx';
import Content from './Content/index.jsx';

import styles from './SearchSummary.module.scss';

const SearchSummary = forwardRef(({ openSearch }, ref) => {
    const [searchParams] = useSearchParams();
    const destinations = useSelector((state) => state.destinations.items);
    const isHub = useLayoutStore(state => state.isHub);

    const summaryData = useMemo(() => {
        const { destination, guestCategories, dates } = parseSearchParams(searchParams)
        const { adults, children } = guestCategories;

        const destLabel = getDestLabel(destinations, destination.id);
        const formattedDates = formatDates(dates[0], dates[1]);
        const guests = calcTotalGuests(adults, children);

        const destText = destLabel
            ? `Homes in ${destLabel}`
            : (isHub ? 'Anywhere' :'Hotels nearby');

        const datesText = formattedDates
            ? formattedDates
            : (isHub ? 'Anytime' : 'Any week');

        const guestsText = guests > 0
            ? pluralize(guests, 'guest')
            : 'Add guests';

        return {
            destination: destText,
            dates: datesText,
            guests: guestsText,
        };
    }, [searchParams, isHub, destinations]);

    return (
        <div
            ref={ref}
            className={styles.summaryLayout}
            onClick={openSearch}
        >
            <Placeholder />
            <Content {...summaryData} />
        </div>
    )
});

export default SearchSummary;