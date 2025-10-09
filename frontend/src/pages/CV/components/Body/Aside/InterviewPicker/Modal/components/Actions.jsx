import { useDispatch } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { setScheduled } from '@/store/slices/interviewSlice.js';

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        mt: 5
    },
    button: {
        px: 3,
        fontWeight: '500',
        textTransform: 'none',
        color: '#5a5a5a',
        border: '1px solid #0000ff',
        transition: 'background .3s ease, border .3s ease',
        '&:hover': {
            color: '#3c3c3c',
            backgroundColor: '#f7f7ff',
        }
    },
    text: {
        pb: '2px',
        minWidth: '150px',
        textAlign: 'center',
        fontWeight: '400',
        fontSize: 15,
        color: '#2c2c2c',
        width: 'auto',
        borderBottom: '1px solid #0000ff',
    }
}


const InterviewActions = ({
    handleToggle = () => {},
    selectedDate,
    selectedTime,
    setModalBg
}) => {
    const dispatch = useDispatch();

    const formattedDate = dayjs(selectedDate).format('DD.MM.YYYY');
    const formattedTime = dayjs(selectedTime).format('HH:mm');

    const handleSchedule = () => {
        dispatch(setScheduled({ date: formattedDate, time: formattedTime }));
        setModalBg('#f7f7ff');
        setTimeout(handleToggle, 500);
    }

    return (
        <Box sx={styles.container}>
            <Button onClick={handleSchedule} variant='outlined' sx={styles.button}>
                Schedule
            </Button>
            <Typography component='span' sx={styles.text}>
                {`${formattedDate} ${formattedTime}`}
            </Typography>
        </Box>
    )
}
export default InterviewActions;