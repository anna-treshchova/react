import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

import { Grid } from 'antd';

import { getHotels } from '@/store/thunks/hotelsThunk.js'
import { setNightsCount } from '@/store/slices/hotelsSlice.js'

import DestinationSelect from './components/DestinationSelect';
import DateRangePicker from './components/DateRangeRicker';
import GuestPicker from './components/GuestPicker';
import SearchButton from './components/SearchButton';
import ClearAllButton from './components/ClearAllButton';

import styles from './HeroSearch.module.scss'

const { useBreakpoint } = Grid;

const HeroSearch = ({
    form,
    setForm = () => {},
    initialState,
    isSearchOpen,
    setIsSearchOpen = () => {},
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const screens = useBreakpoint();

    useEffect(() => {
        if (isSearchOpen && !screens.md) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isSearchOpen, screens.md]);


    if (!isSearchOpen) return null;

    const setGuests = (field, value) => {
        setForm((prev => ({
            ...prev,
            [field]: value}
        )));
    }

    const setDestination = (id, label) => {
        setForm((prev => ({
            ...prev,
            destinationId: id,
            destinationLabel: label,
        })))
    }

    const setDates = (value) => {
        setForm(prev => ({
            ...prev,
            dates: value,
            nights: value && value.length === 2
                ? Math.max(value[1].diff(value[0], 'day'), 0)
                : 2
        }));
    }

    const handleClear = () => setForm(initialState);

    const handleSearch = (e) => {
        e.preventDefault();

        if (!form.destinationId) return

        dispatch(getHotels({
            destinationId: form.destinationId,
            guests: form.guests,
            pets: form.pets,
            dates: form.dates,
        }));

        dispatch(setNightsCount(form.nights))

        setIsSearchOpen(false);
        navigate('/search');
    }

    return (
        <form className={styles.form} onSubmit={handleSearch}>
            <FormField
                title={`Where${screens.md ? '' : '?'}`}
                className={styles.destination}
            >
                <DestinationSelect
                    value={form.destinationId}
                    onChange={(value, option) => setDestination(value,  option.label)}
                />
            </FormField>

            <FormField title='When'>
                <DateRangePicker value={form.dates} onChange={setDates} />
            </FormField>

            <FormField title='Who'>
                <GuestPicker
                    guests={form.guests}
                    adults={form.adults}
                    children={form.children}
                    infants={form.infants}
                    pets={form.pets}
                    onChange={(key, value) => setGuests(key, value)}
                />
            </FormField>

            <div className={styles.btnBox}>
                {!screens.md && (
                    <ClearAllButton onClick={handleClear} />
                )}
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

export default HeroSearch;