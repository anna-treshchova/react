import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';

import PropTypes from 'prop-types';

import dayjs from 'dayjs'

import { Grid } from 'antd';

import SearchIcon from '@/assets/icons/Search.svg?react'
import HomeIcon from '@/assets/icons/Home.svg?react'

import styles from './HeaderSearchBar.module.scss';

const { useBreakpoint } = Grid;

const SearchBar = ({ isSearchOpen, setIsSearchOpen }) => {
    const { pathname } = useLocation();
    const screens = useBreakpoint();

    const { dates, guests, destination } = useSelector((state) => state.filters);

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

    const destinationContent = destination.label ? destination.label : 'Hotels nearby';

    const datesContent = Array.isArray(dates) && dates[0] && dates[1]
        ? formatDates(dates)
        : 'Any week'

    const guestsContent = guests === 0
        ? 'Add guests'
        : `${guests} guest${guests > 1 ? 's' : ''}`;

    return (
        <div className={styles.searchBar} onClick={handleClick}>
            <HomeIcon className={styles.homeIcon} />
            <div className={styles.searchItemsWrapper}>
                <SearchItem>
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

SearchBar.propTypes = {
    isSearchOpen: PropTypes.bool.isRequired,
    setIsSearchOpen: PropTypes.func.isRequired,
}

export default SearchBar;