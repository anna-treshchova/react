import { Grid } from '@mui/material';

import ProfileInfo from './ProfileInfo';
import InteractiveAvatar from './InteractiveAvatar';

const CVHeader = () => {
    return (
        <Grid item xs={12} >
            <Grid container sx={{backgroundColor: '#fafafa'}}>
                <ProfileInfo />
                <InteractiveAvatar />
            </Grid>
        </Grid>

    )
}
export default CVHeader;