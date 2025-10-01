import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getHotels } from '@/store/thunks/hotelsThunk.js'
import { setNightsCount } from '@/store/slices/hotelsSlice.js'

import DestinationSelect from './components/DestinationSelect';
import DateRangePicker from './components/DateRangeRicker';
import GuestPicker from './components/GuestPicker';
import SearchButton from './components/SearchButton';

import styles from './SearchForm.module.scss'


const SearchForm = () => {
    const dispatch = useDispatch();

    const [selectedDestinationId, setSelectedDestinationId] = useState(null);

    const [dates, setDates] = useState([null, null]);
    const [nights, setNights] = useState(2);

    const [guests, setGuests] = useState(1);
    const [pets, setPets] = useState(0);

    const destinations = useSelector((state) => state.destinations.items)

    const handleSearch = (e) => {
        e.preventDefault();

        if (!selectedDestinationId) return

        const selectedDestination = destinations.find(des => des.id === selectedDestinationId);
        if (!selectedDestination) return

        dispatch(getHotels({
            city: selectedDestination.label,
            guests,
            pets,
            dates,
        }));

        dispatch(setNightsCount(nights))
    }

    return (
        <form className={styles.form} onSubmit={handleSearch}>
            <DestinationSelect onChange={setSelectedDestinationId} />
            <DateRangePicker
                setDates={setDates}
                setNights={setNights}
            />
            <GuestPicker
                guests={guests}
                setGuests={setGuests}
                pets={pets}
                setPets={setPets}
            />
            <SearchButton />
        </form>
    )
}

export default SearchForm;