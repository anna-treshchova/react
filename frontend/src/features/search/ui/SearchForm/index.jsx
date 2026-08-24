import { forwardRef } from 'react'
import { useNavigate } from 'react-router';

import { useUIStore, selectUIActions } from '@/shared/model/uiStore';

import { mapFormStateToSearchParams } from '@/entities/search';

import { useSearchForm } from './useSearchForm';
import { DestinationSelect } from './DestinationSelect';
import { DateRangePicker } from './DateRangePicker';
import { GuestsPicker } from './GuestsPicker';
import { Field } from './Field';
import Footer from './Footer';

import styles from './SearchForm.module.scss';

export const SearchForm = forwardRef(({ onSubmit }, ref) => {
    const navigate = useNavigate();
    const { setHeaderState } = useUIStore(selectUIActions);

    const {
        formState,
        guests,
        destinations,
        setFields,
        setGuestCategory,
        resetFormState,
    } = useSearchForm();

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit(formState)

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
            onSubmit={handleSubmit}
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
                <GuestsPicker
                    guestCategories={formState.guestCategories}
                    guests={guests}
                    handleChange={setGuestCategory} />
            </Field>

            <Footer handleClear={resetFormState} />
        </form>
    )
});