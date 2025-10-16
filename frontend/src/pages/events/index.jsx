import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getEvents } from '@/store/thunks/eventsThunk.js';

import Event from './components/Event.jsx';

import { Select, Input } from 'antd';

// import styles from './Events.module.css';

const { Option } =  Select;

const Events = () => {
    const [selectedCity, setSelectedCity] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const dispatch = useDispatch();

    const {
        items: cities,
        loading: citiesLoading,
        error: citiesError
    } =  useSelector((state) => state.destinations);

    const {
        items: events,
        loading: eventsLoading,
        error: eventsError
    } =  useSelector((state) => state.events);

    useEffect(() => {
        if(selectedCity) {
            dispatch(getEvents({ destinationId: selectedCity, query: searchQuery }));
        }
    }, [selectedCity, searchQuery]);

    return (
        <div className='flex flex-col mt-10 mb-20 mx-10 items-center gap-10'>
            <div className='flex gap-1'>
                <Select
                    className='min-w-48'
                    placeholder='Select city'
                    onChange={value => setSelectedCity(value)}
                >
                    {cities.map(item => (
                        <Option key={item.id} value={item.id}>{item.label}</Option>
                    ))}
                </Select>
                <Input
                    placeholder='Search by title or instructor...'
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    style={{width: 215}}
                />
            </div>

            {(citiesLoading || eventsLoading) && <div>Loading...</div>}

            <div className='flex gap-3 flex-wrap justify-center w-full'>
                {events.map(event => (
                    <Event key={event.id} event={event} />
                   ))
                }
            </div>

        </div>

    )
}

export default Events;