import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { useSelector } from 'react-redux';

import { useRecentSearchStore } from '@/shared/modal/useRecentSearchStore.js';
import { calcTotalGuests, parseSearchParams, generateSearchId } from '@/shared/utils';

import Container from '@/app/layout/components/Container';
import HotelsList from './HotelsList.jsx';
import RecentSearch from '@/features/search/ui/RecentSearch';

import { EmptyState, noResults } from '@/shared/ui/EmptyState';

const HotelsPage = () => {
    const [searchParams] = useSearchParams();
    const hotels = useSelector((state) => state.hotels.items);

    const { clearRecentSearch, updateRecentStoreImages } = useRecentSearchStore();

    useEffect(() => {
        const recentSearch = useRecentSearchStore.getState().recentSearch;

        if (!recentSearch?.id) return;

        const { destination, guestCategories, dates } = parseSearchParams(searchParams);
        const { adults, children } = guestCategories;

        const guests = calcTotalGuests(adults, children);

        const currentSearchId = generateSearchId({
            destinationId: destination.id,
            dates,
            guests,
        });

        if (currentSearchId === recentSearch.Id) return;

        if (!hotels?.length) {
            clearRecentSearch()
            return;
        }

        if (!recentSearch?.images?.length) {
            const images = hotels.slice(0, 3).map(hotel => hotel.image)
            updateRecentStoreImages(images)
        }
    }, [searchParams, hotels, clearRecentSearch, updateRecentStoreImages ]);

    const isEmpty = !hotels?.length;

    return (
        <div>
            <RecentSearch />
            <Container>
                {isEmpty
                    ? <EmptyState
                        image={noResults}
                        imageWidth={300}
                        title='No places found'
                        description='Try adjusting your search or clearing the filters.'
                    />
                    : <HotelsList hotels={hotels} />
                }
            </Container>
        </div>
    )
}

export default HotelsPage;