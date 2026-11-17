import { forwardRef } from 'react';

import { usePageContext } from '@/shared/hooks/usePageContext';
import { pluralize } from '@/shared/lib/text';
import { EMPTY_ARRAY } from '@/shared/constants/empty';

import { useGetDestinationsQuery } from '@/entities/destinations';
import { useSearchFormParams, formatDates, calcGuests } from '@/entities/search';

import { getDestLabel } from '../../lib';
import { SummaryPlaceholder } from './Placeholder';
import { SummaryContent }from './Content';

import styles from './SearchSummary.module.scss';

export interface SearchSummaryProps {
    onClick: () => void
}

export const SearchSummary = forwardRef<
    HTMLDivElement,
    SearchSummaryProps
>(({ onClick }, ref) => {
    const { destination, guestCategories, dates } = useSearchFormParams();
    const [checkin, checkout] = dates;

    const { data } = useGetDestinationsQuery();
    const destinations = data ?? EMPTY_ARRAY;

    const { isHub } = usePageContext();

    const destLabel = getDestLabel(destinations, destination.id);
    const formattedDates = formatDates(checkin, checkout);
    const guests = calcGuests(guestCategories);

    const destContent = destLabel
        ? `Homes in ${destLabel}`
        : (isHub ? 'Anywhere' : 'Hotels nearby');

    const datesContent = formattedDates
        ? formattedDates
        : (isHub ? 'Anytime' : 'Any week');

    const guestsContent = guests > 0
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
                destContent={destContent}
                datesContent={datesContent}
                guestsContent={guestsContent}
            />
        </div>
    )
});