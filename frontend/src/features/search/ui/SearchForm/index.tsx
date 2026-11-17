import { forwardRef, type FormEvent } from 'react';
import { useNavigate } from 'react-router';

import { useUIStore, selectUIActions } from '@/shared/model/uiStore';

import { mapFormStateToSearchParams, type SearchCriteria } from '@/entities/search';

import { FORM_FIELDS_CONFIG } from '../../model';

import { useSearchForm } from './useSearchForm';
import { DestinationSelect } from './DestinationSelect';
import { DateRangePicker } from './DateRangePicker';
import { GuestsPicker } from './GuestsPicker';
import { Field } from './Field';
import { Footer } from './Footer';

import styles from './SearchForm.module.scss';

export interface SearchFormProps {
    onSubmit: (searchParams: SearchCriteria) => void;
}

export const SearchForm = forwardRef<HTMLFormElement, SearchFormProps>(({
    onSubmit
}: SearchFormProps, ref) => {
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

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        onSubmit(formState)

        const params = mapFormStateToSearchParams(formState);

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
            <Field label={FORM_FIELDS_CONFIG.destination.label}>
                <DestinationSelect
                    destinations={destinations}
                    destination={formState.destination}
                    handleChange={setFields}
                />
            </Field>

            <Field label={FORM_FIELDS_CONFIG.dates.label}>
                <DateRangePicker
                    dates={formState.dates}
                    handleChange={setFields}
                />
            </Field>

            <Field label={FORM_FIELDS_CONFIG.guests.label}>
                <GuestsPicker
                    guestCategories={formState.guestCategories}
                    guests={guests}
                    handleChange={setGuestCategory} />
            </Field>

            <Footer handleClear={resetFormState} />
        </form>
    )
});