import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setSelectedCity, setSearchQuery } from '@/store/slices/destinationsSlice';
import { getEvents } from '@/store/thunks/eventsThunk.js';
import useDebounce from '@/hooks/useDebounce.js'

import Event from './components/Event.jsx';

import { Select, Input } from 'antd';

const { Option } =  Select;

const Events = () => {
    const dispatch = useDispatch();

    const {
        selectedCity,
        searchQuery,
        items: cities,
        loading: citiesLoading,
        error: citiesError
    } =  useSelector((state) => state.destinations);

    const {
        items: events,
        loading: eventsLoading,
        error: eventsError
    } =  useSelector((state) => state.events);

    const debouncedQuery = useDebounce(searchQuery);  // Custom hook — це не окрема сутність, а просто частина тіла компонента, винесена в функцію

    useEffect(() => {
        if(selectedCity) {
            dispatch(getEvents({ destinationId: selectedCity, query: debouncedQuery }));
        }
    }, [selectedCity, debouncedQuery]);

    return (
        <div className='flex flex-col mt-10 mb-20 mx-10 items-center gap-10'>
            <div className='flex gap-1'>
                <Select
                    value={selectedCity}
                    className='min-w-48'
                    placeholder='Select city'
                    onChange={value => dispatch(setSelectedCity(value))}
                >
                    {cities.map(item => (
                        <Option key={item.id} value={item.id}>{item.label}</Option>
                    ))}
                </Select>
                <Input
                    placeholder='Search by title or instructor...'
                    value={searchQuery}
                    onChange={e => dispatch(setSearchQuery(e.target.value))}
                    style={{width: 215}}
                />
            </div>

            {(citiesLoading || eventsLoading) && <div>Loading...</div>}

            <div className='flex gap-3 flex-wrap justify-center w-full'>
                {events.map(({ id, title, imageUrl, instructor, price, date, location }) => (
                    <Event
                        key={id}
                        id={id}
                        title={title}
                        imageUrl={imageUrl}
                        instructor={instructor}
                        price={price}
                        date={date}
                        location={location}
                    />
                   ))
                }
            </div>
        </div>

    )
}

export default Events;

/*——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

  ❗️useState не створює state при кожному rerender компонента

  ❗Він створює state лише під час першого рендера

  ❗️Надалі state змінюється лише через setState, а не через повторний виклик useState


  useState при rerender:

      ◦ функція викликається, але initial value ігнорується

      ◦ React повертає збережене з минулих рендерів


  useEffect при rerender:

      ◦ його callback викликається тільки якщо змінилась залежність

      ◦ старий effect спочатку викликає cleanup (return)

      ◦ потім запускається новий effect

————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

  ❗️Зміна props ніколи не викликає unmount/mount. Лише rerender

  ❗️Unmount/Mount відбувається тільки коли компонент зникає з JSX

————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

function useDebounce(value) {
  const [v, setV] = useState(value);
  return v;
}

function Events() {
  const debounced = useDebounce(searchQuery);
  return <div />;
}


function Events() {
  const [v, setV] = useState(searchQuery);
  const debounced = v;
  return <div />;
}

*/