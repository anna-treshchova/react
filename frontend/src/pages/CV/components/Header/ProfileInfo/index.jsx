import { useSelector } from 'react-redux';

import { Box, Grid, Typography } from '@mui/material';

const styles = {
    grid: {
        borderRight: { sm: 'none', md: '1px solid #ebebeb'}
    },
    wrapper: {
        textAlign: { xs: 'center', sm: 'start' },
        pt: { xs: 4, sm: 5 },
        pr: { xs: 1, sm: 2 },
        pb: { xs: 2, sm: 4 },
        pl: { xs: 1, sm: 6 },
    },
    heading: {
        fontSize: 34,
        textTransform: 'uppercase',
        fontWeight: 400,
        letterSpacing: '3px',
        lineHeight: '1.2em',
        mb: 2
    },
    subheading: {
        fontSize: 14,
        textTransform: 'uppercase',
        letterSpacing: 5,
        fontWeight: 300
    }
}

const ProfileInfo = () => {
    const { fullName, specialisation } =  useSelector((state) => state.profile.data);

    return (
        <Grid item xs={12} sm={8} sx={styles.grid}>
            <Box sx={styles.wrapper}>
                <Typography component='h1' sx={styles.heading}>{fullName}</Typography>
                <Typography component='h2' sx={styles.subheading}>{specialisation}</Typography>
            </Box>
        </Grid>
    )
}

export default ProfileInfo;