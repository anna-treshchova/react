import { useNavigate } from 'react-router';
import { useEvents } from '../hooks/useEvents.js';

import EventsFilters from '../components/EventsFilters.jsx';
import EventsList from '../components/EventsList.jsx';

const EventsPage = () => {
    const navigate = useNavigate();

    const {
        events,
        destinations,
        selectedDestination,
        searchQuery,
        loading,
        errors,
        setDestination,
        setSearch,
    } = useEvents();

    return (
        <div className='flex flex-col mt-10 mb-20 mx-10 items-center gap-10'>
            <EventsFilters
                destinations={destinations}
                selectedDestination={selectedDestination}
                searchQuery={searchQuery}
                onDestinationChange={setDestination}
                onSearchChange={e => setSearch(e.target.value)}
            />

            {(loading.destinations || loading.events) && <div>Loading...</div>}
            {(errors.destinations|| errors.events) && <div>Something went wrong..</div>}

            <EventsList
                events={events}
                onCardClick={(id) => navigate(`/events/${id}`)}
            />
        </div>
    )
}

export default EventsPage;

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