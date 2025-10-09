import { Grid } from '@mui/material';

import CVHeader from './components/Header';
import CVBody from './components/Body';

const styles = {
    grid: {
        maxWidth: '730px',
        mx: 'auto',
        my: 6,
        bgcolor: '#ffffff',
        boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
    }
}

const CV = () => {
 return (
     <Grid container sx={styles.grid}>
         <CVHeader />
         <CVBody />
     </Grid>
 );
}

export default CV;



