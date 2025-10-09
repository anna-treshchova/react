import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { EventAvailable } from '@mui/icons-material';

const styles = {
    button: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        textTransform: 'none',
        color: '#5d5054',
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 1.5,
        border: '1px solid #adadad',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
        py: 1,
        mb: 1.5,
        transition: 'background .3s ease',
        '&:hover': {
            color: '#3c3c3c',
            backgroundColor: '#efefef',
            border: '1px solid #adadad',
        }
    }
}

const InterviewButton = ({ onClick = () => {} }) => {
    const scheduled = useSelector((state) => state.interview.scheduled);

    return (
        <Button
            disabled={!!scheduled}
            disableRipple
            variant='outlined'
            startIcon={scheduled && <EventAvailable />}
            sx={{...styles.button, backgroundColor: scheduled ? '#ffffff' :'#fafafa'}}
            onClick={onClick}
        >
            {scheduled ? `${scheduled.date} ${scheduled.time}` : 'Schedule Interview'}
        </Button>
    )
}

export default InterviewButton;