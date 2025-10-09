import { Grid } from '@mui/material';

import Skills from './Skills';
import Stack from './Stack';
import Extra from './Extra';

const MainContent = () => {
    return (
        <Grid item xs={12} md={8} sx={{borderRight: {xs: 'none', sm: '1px solid #ebebeb'}}}>
            <Grid container direction='column'>
                <Skills />
                <Stack />
                <Extra />
            </Grid>
        </Grid>
    );
}
export default MainContent;