import { forwardRef } from 'react'
import { useNavigate } from 'react-router';

import { useLayoutStore } from '@/app/layout/useLayoutStore.js';
import { useRecentSearchStore } from '@/shared/modal/useRecentSearchStore.js';
import { useSearchForm } from './useSearchForm.js';
import { createSearchParams } from '@/shared/utils';

import DestinationSelect from './components/DestinationSelect/index.jsx';
import DatePicker from './components/DatePicker/index.jsx';
import GuestPicker from './components/GuestsPicker/index.jsx';
import Field from './components/Field/index.jsx';
import Footer from './components/Footer/index.jsx';

import styles from './SearchForm.module.scss'

const SearchForm = forwardRef((props, ref) => {
    const navigate = useNavigate();

    const setMode = useLayoutStore(state => state.setMode);
    const setRecentSearch = useRecentSearchStore(state => state.setRecentSearch);

    const {
        destinationId,
        guestCategories,
        guests,
        dates,
        handleChange,
        handleGuestChange,
        handleClear,
        getRecentSearchData,
    } = useSearchForm();

    const onSubmit = (e) => {
        e.preventDefault();

        const recentData = getRecentSearchData();
        if (recentData) setRecentSearch(recentData);

        const params = createSearchParams({
            destinationId,
            ...guestCategories,
            checkin: dates[0],
            checkout: dates[1],
        });

        navigate({
            pathname: '/',
            search: params.toString()
        });

        setMode({ mode: 'collapsed' });
    }

    return (
        <form
            ref={ref}
            className={styles.form}
            onSubmit={onSubmit}
        >
            <Field title='Where'>
                <DestinationSelect
                    destinationId={destinationId}
                    handleChange={handleChange}
                />
            </Field>

            <Field title='When'>
                <DatePicker
                    dates={dates}
                    handleChange={handleChange}
                />
            </Field>

            <Field title='Who'>
                <GuestPicker
                    guestCategories={guestCategories}
                    guests={guests}
                    handleChange={handleGuestChange} />
            </Field>

            <Footer handleClear={handleClear} />
        </form>
    )
});

export default SearchForm;