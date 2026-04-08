import { useMemo } from 'react';
import { useNavigate } from 'react-router';

import { useLayoutStore } from '@/app/layout/useLayoutStore.js';
import { formatDates } from '@/features/search/lib/utils.js';
import {
    pluralize,
    calcTotalGuests,
    loadFromStorage,
    createSearchParams
} from '@/shared/utils';

import ArrowIcon from '@/assets/icons/arrow.svg?react';
import styles from './RecentSearch.module.scss';

const RecentSearch = () => {
    const navigate = useNavigate();

    const isHub = useLayoutStore(state => state.isHub);

    const recentData = useMemo(() => {
        if (!isHub) return null;
       return loadFromStorage('recent_search')
    }, [isHub])

    if (!recentData) return null;

    const { destination, guestCategories, dates, timestamp, images } = recentData;
    const { adults, children } = guestCategories;

    const handleContinueSearch = () => {
        const params = createSearchParams({
            destinationId: destination.id,
            ...guestCategories,
            checkin: dates[0],
            checkout: dates[1],
        });

        navigate({
            pathname: '/',
            search: params.toString()
        });
    }

    const label = destination?.label;

    const guests = calcTotalGuests(adults, children);
    const guestsContent = guests ? pluralize(guests, 'guest') : '';

    const datesContent = formatDates(dates[0], dates[1], timestamp);

    return (
        <div className={styles.recentSearch}>
            <div className={styles.body} onClick={handleContinueSearch}>
                <div className={styles.content}>
                    <h4>Continue searching for homes near {label}</h4>

                    <div className={styles.meta}>
                        <span>{datesContent}</span>
                        <span>{guestsContent}</span>
                    </div>

                    <span className={styles.arrow}>
                <ArrowIcon/>
            </span>
                </div>
                <div className={styles.images}>
                    {images?.map((image, index) => (
                        <div key={index} className={styles.imageFrame}>
                            <img src={image} alt='' />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RecentSearch;