import { Grid } from '@mui/material';

import MainContent from './MainContent';
import Aside from './Aside';

const CVBody = () => {
    return (
        <Grid item xs={12}>
            <Grid container>
                <MainContent />
                <Aside />
            </Grid>
        </Grid>
    );
}
export default CVBody;