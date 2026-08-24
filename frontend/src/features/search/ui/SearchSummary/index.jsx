import { forwardRef } from 'react';

import { usePageContext } from '@/shared/hooks/usePageContext';
import { calcGuests} from '@/entities/search';
import { pluralize } from '@/shared/lib/text';
import { EMPTY_ARRAY } from '@/shared/constants/empty';

import { useGetDestinationsQuery } from '@/entities/destinations';
import { useSearchFormParams, formatDates } from '@/entities/search';

import { getDestLabel } from '../../lib';
import { SummaryPlaceholder } from './Placeholder';
import { SummaryContent }from './Content';

import styles from './SearchSummary.module.scss';

export const SearchSummary = forwardRef(({ onClick }, ref) => {
    const { destination, guestCategories, dates } = useSearchFormParams();
    const [checkin, checkout] = dates;

    const { data } = useGetDestinationsQuery();
    const destinations = data ?? EMPTY_ARRAY;

    const { isHub } = usePageContext();

    const destLabel = getDestLabel(destinations, destination.id);
    const formattedDates = formatDates(checkin, checkout);
    const guests = calcGuests(guestCategories);

    const destText = destLabel
        ? `Homes in ${destLabel}`
        : (isHub ? 'Anywhere' :'Hotels nearby');

    const datesText = formattedDates
        ? formattedDates
        : (isHub ? 'Anytime' : 'Any week');

    const guestsText = guests > 0
        ? pluralize(guests, 'guest')
        : 'Add guests';

    return (
        <div
            ref={ref}
            className={styles.summary}
            onClick={onClick}
        >
            <SummaryPlaceholder />
            <SummaryContent
                destination={destText}
                dates={datesText}
                guests={guestsText}
            />
        </div>
    )
});