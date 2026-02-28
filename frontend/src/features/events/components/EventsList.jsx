import EventCard from '../components/EventCard.jsx';

const EventsList = ({ events, onCardClick }) => {
    return (
        <div className='flex gap-3 flex-wrap justify-center w-full'>
            {events.map(event => (
                <EventCard
                    key={event.id}
                    event={event}
                    onClick={() => onCardClick(event.id)}
                />
            ))
            }
        </div>
    )
}

export default EventsList;