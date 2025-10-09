import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';

const InterviewDayPicker = ({ selectedDate, setSelectedDate = () => {} }) => {
    return (
        <DayPicker
            mode='single'
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={{ before: new Date() }}
            navLayout='around'
            showOutsideDays
            style={{
                fontSize: '0.9rem',
                minHeight: '340px',
            }}
        />
    )
}
export default InterviewDayPicker;