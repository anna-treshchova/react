import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import PropTypes from 'prop-types';

import { Grid } from 'antd';

import { setFilter, clearAllFilters } from '@/store/slices/filtersSlice.js'

import { fetchSearchResults } from '@/store/thunks/searchThunk.js';

import DestinationSelect from './components/DestinationSelect';
import DateRangePicker from './components/DateRangeRicker';
import GuestPicker from './components/GuestPicker';
import SearchButton from './components/SearchButton';
import ClearAllButton from './components/ClearAllButton';

import styles from './HeroSearch.module.scss'

const { useBreakpoint } = Grid;

const HeroSearch = ({ isSearchOpen, setIsSearchOpen }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const screens = useBreakpoint();

    const { destination, guests, pets } = useSelector((state) => state.filters);

    const initialGuestForm = { adults: 0, children: 0, infants: 0 };
    const [guestForm, setGuestForm] = useState(initialGuestForm);

    useEffect(() => {
        (isSearchOpen && !screens.md)
            ? document.body.style.overflow = 'hidden'
            : document.body.style.overflow = ''

        return () => {
            document.body.style.overflow = '';
        };
    }, [isSearchOpen, screens.md]);

    const onChange = useCallback((field, value) => {
        const isGuestField = ['adults', 'children', 'infants'].includes(field);

        isGuestField
            ? setGuestForm(prev => ({ ...prev, [field]: value }))
            : dispatch(setFilter({ field, value }));

    }, [dispatch]);

    const handleClear = () => {
        setGuestForm(initialGuestForm)
        dispatch(clearAllFilters());
    };

    const handleSearch = (e) => {
        e.preventDefault();

        if (!destination.id) return;

        dispatch(fetchSearchResults({
            page: 1,
            destinationId: destination.id,
            guests: guests,
            pets: pets,
        }));

        setIsSearchOpen(false);
        navigate('/search');
    }

    if (!isSearchOpen) return null;

    return (
        <form className={styles.form} onSubmit={handleSearch}>
            <FormField
                title={`Where${screens.md ? '' : '?'}`}
                className={styles.destination}
            >
                <DestinationSelect onChange={onChange} />
            </FormField>

            <FormField title='When'>
                <DateRangePicker onChange={onChange} />
            </FormField>

            <FormField title='Who'>
                <GuestPicker guestForm={guestForm} onChange={onChange} />
            </FormField>

            <div className={styles.btnBox}>
                {!screens.md &&  <ClearAllButton onClick={handleClear} />}
                <SearchButton />
            </div>
        </form>
    )
}

const FormField = ({ children, title, className }) => (
    <div className={`${styles.formField} ${className || ''}`}>
        <div className={styles.formTitle}>{title}</div>
        {children}
    </div>
)


HeroSearch.propTypes = {
    isSearchOpen: PropTypes.bool.isRequired,
    setIsSearchOpen: PropTypes.func.isRequired,
}

export default HeroSearch;