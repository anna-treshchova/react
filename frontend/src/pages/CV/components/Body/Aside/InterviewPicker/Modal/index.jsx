import { useState } from 'react';
import { Box, Modal } from '@mui/material';
import dayjs from 'dayjs';

import InterviewDayPicker from './components/DayPicker.jsx';
import InterviewTimePicker from './components/TimePicker.jsx';
import InterviewActions from './components/Actions.jsx';

const styles = {
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        borderRadius: 2,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        minWidth: 450,
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
        transition: 'background-color .3s ease',
    }
}


const InterviewModal = ({ open, handleToggle }) => {
    const [selectedDate, setSelectedDate] = useState(dayjs().add(1, 'day'));
    const [selectedTime, setSelectedTime] = useState(dayjs().hour(9).minute(0));
    const [modalBg, setModalBg] = useState('#ffffff');

    return (
        <Modal
            open={open}
            onClose={handleToggle}
            aria-labelledby='schedule-interview-modal'
            sx={styles.modal}
        >
            <Box sx={{...styles.container, bgcolor: modalBg }}>
                <InterviewDayPicker
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                />
                <InterviewTimePicker
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                />
                <InterviewActions
                    handleToggle={handleToggle}
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    setModalBg={setModalBg}

                />
            </Box>
        </Modal>
    )
}

export default InterviewModal;