import { useMemo } from 'react';
import { useNavigate } from 'react-router';

import { useLayoutStore, selectIsHub } from '@/shared/model';
import { loadFromStorage } from '@/shared/lib/storage.js';
import { calcTotalGuests } from '@/shared/lib/guests.js';
import { pluralize } from '@/shared/lib/text.js';
import ArrowIcon from '@/shared/assets/icons/arrow.svg?react';

import { mapFormStateToSearchParams } from '@/entities/search';

import { formatDates } from '../../lib';

import styles from './RecentSearch.module.scss';

export const RecentSearch = () => {
    const navigate = useNavigate();
    const isHub = useLayoutStore(selectIsHub);

    const recentData = useMemo(() => {
        if (!isHub) return null;
        return loadFromStorage('recent_search')
    }, [isHub])

    if (!recentData) return null;

    const { destination, guestCategories, dates, timestamp, images } = recentData;

    const handleContinueSearch = () => {
        const params = mapFormStateToSearchParams({
            destination,
            guestCategories,
            dates
        })

        navigate({
            pathname: '/',
            search: params.toString()
        });
    }

    const label = destination?.label;

    const guests = calcTotalGuests(guestCategories);
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