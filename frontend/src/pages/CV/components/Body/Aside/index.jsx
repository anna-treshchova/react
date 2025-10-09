import { Grid } from '@mui/material';

import Contacts from './Contacts';
import Courses from './Courses';
import PreviousPositions from './PreviousPositions';
import Languages from './Languages';
import InterviewPicker from './InterviewPicker';

const Aside = () => {
    const asideDirection = { xs: 'column', sm: 'row', md: 'column' };

    return (
        <Grid item xs={12} md={4}>
            <Grid container direction={asideDirection} sx={{minHeight: '100%'}}>
                <Contacts/>
                <Courses/>
                <PreviousPositions/>
                <Languages/>
                <InterviewPicker/>
            </Grid>
        </Grid>
    );
}
export default Aside;