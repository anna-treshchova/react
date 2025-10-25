import { useLocation } from 'react-router';
import dayjs from 'dayjs'

import { Grid } from 'antd';

import SearchIcon from '@/assets/icons/Search.svg?react'
import HomeIcon from '@/assets/icons/Home.svg?react'

import styles from './HeaderSearchBar.module.scss';

const { useBreakpoint } = Grid;

const SearchBar = ({ form, isSearchOpen, setIsSearchOpen = () => {} }) => {
    const { pathname } = useLocation();
    const screens = useBreakpoint();

    if (!pathname.startsWith('/search')) return null;
    if ((!screens.md && pathname.startsWith('/search/')) || isSearchOpen) return null;


    const handleClick = () => setIsSearchOpen(true);

    const formatDates = (dates) => {
        const [start, end] = dates.map(d => dayjs(d));

        const sameMonth = start.month() === end.month();

        return sameMonth
            ? `${start.format('MMM D')} – ${end.format('D')}`
            : `${start.format('MMM D')} – ${end.format('MMM D')}`
    }

    const destinationContent = form.destinationLabel ? form.destinationLabel : 'Hotels nearby';

    const datesContent = Array.isArray(form.dates) && form.dates[0] && form.dates[1]
        ? formatDates(form.dates)
        : 'Any week'

    const guestsContent = form.guests === 0
        ? 'Add guests'
        : `${form.guests} guest${form.guests > 1 ? 's' : ''}`;

    return (
        <div className={styles.searchBar} onClick={handleClick}>
            <HomeIcon className={styles.homeIcon} />
            <div className={styles.searchItemsWrapper}>
                <SearchItem className={styles.searchDestination}>
                    {destinationContent}
                </SearchItem>
                <SearchItem className={styles.searchDates}>
                    {datesContent}
                </SearchItem>
                <SearchItem className={styles.searchGuests}>
                    {guestsContent}
                </SearchItem>
            </div>
            <div className={styles.searchButton}>
                <SearchIcon className={styles.searchIcon} />
            </div>
        </div>

    )
}

const SearchItem = ({ children, className }) => (
    <div className={styles.searchItem}>
        <span className={className}>{children}</span>
    </div>
)

export default SearchBar;