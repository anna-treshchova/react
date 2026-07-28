import { forwardRef } from 'react'
import { useNavigate } from 'react-router';

import { useLayoutStore, selectLayoutActions } from '@/shared/model';

import { mapFormStateToSearchParams } from '@/entities/search';

import { useRecentSearchStore, selectRecentSearchActions } from '../../model';

import { useSearchForm } from './useSearchForm';
import { DestinationSelect } from './components/DestinationSelect';
import { DateRangePicker } from './components/DateRangePicker';
import GuestPicker from './components/GuestsPicker/index.jsx';
import { Field } from './components/Field';
import Footer from './components/Footer/index.jsx';

import styles from './SearchForm.module.scss'

export const SearchForm = forwardRef((props, ref) => {
    const navigate = useNavigate();

    const { setHeaderState } = useLayoutStore(selectLayoutActions);
    const { initRecentSearch } = useRecentSearchStore(selectRecentSearchActions);

    const {
        formState,
        guests,
        destinations,
        setFields,
        setGuestCategory,
        resetFormState,
    } = useSearchForm();

    const onSubmit = (e) => {
        e.preventDefault();

        initRecentSearch(formState);

        const params = mapFormStateToSearchParams(formState);
        params.set('page', '1');

        navigate({
            pathname: '/',
            search: params.toString()
        });

        setHeaderState({ isHeaderCollapsed: true });
    }

    return (
        <form
            ref={ref}
            className={styles.form}
            onSubmit={onSubmit}
        >
            <Field title='Where'>
                <DestinationSelect
                    destinations={destinations}
                    destination={formState.destination}
                    handleChange={setFields}
                />
            </Field>

            <Field title='When'>
                <DateRangePicker
                    dates={formState.dates}
                    handleChange={setFields}
                />
            </Field>

            <Field title='Who'>
                <GuestPicker
                    guestCategories={formState.guestCategories}
                    guests={guests}
                    handleChange={setGuestCategory} />
            </Field>

            <Footer handleClear={resetFormState} />
        </form>
    )
});