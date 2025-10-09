import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const MIN_TIME = dayjs().hour(9).minute(0).second(0);
const MAX_TIME = dayjs().hour(18).minute(1).second(0);

const InterviewTimePicker = ({ selectedTime, setSelectedTime = () => {} }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
                value={selectedTime}
                onChange={(newTime) => newTime?.isValid() && setSelectedTime(newTime)}
                views={['hours', 'minutes']}
                ampm={false}
                minutesStep={5}
                minTime={MIN_TIME}
                maxTime={MAX_TIME}
                slotProps={{
                    popper: {
                        placement: 'right-start',
                    },
                }}
            />
        </LocalizationProvider>
    )
}
export default InterviewTimePicker;