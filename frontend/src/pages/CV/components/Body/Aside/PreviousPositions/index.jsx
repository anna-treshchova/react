import { useSelector } from 'react-redux';
import { Grid, List, ListItem, Typography, Box, useTheme, useMediaQuery } from '@mui/material';

import ToggleButton from '@/components/UI/atoms/ToggleButton';

const styles = {
    grid: {
        minHeight: '100px',
        borderRight: { xs: 'none', sm: '1px solid #ebebeb', md: 'none'}
    },
    wrapper: { pr: 1.5, py: 2 },
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        p: 0,
        pl: 3
    },
    listItem: { display: 'block', p: 0, pl: 0.25 },
    textWrapper: { display: 'flex', gap: 0.5 },
    title: {
        fontSize: '12px',
        fontWeight: '500',
        letterSpacing: 0.4,
        pb: 0.25
    },
    duration: {
        fontSize: '12px',
        fontWeight: '300',
        letterSpacing: 0.8
    },
    company: {
        fontSize: '12px',
        fontWeight: '300'
    }
}

const PreviousPosition = () => {
    const { items, show } = useSelector((state) => state.sections.previousPositions);

    const theme = useTheme();
    const isWideScreen = useMediaQuery(theme.breakpoints.up('sm'));

    const buttonLabel = isWideScreen ? 'Prev Positions' : 'Previous Positions';

    return (
        <Grid item xs={12} sm={6} md={12} sx={styles.grid}>
            <ToggleButton section='previousPositions'>{buttonLabel}</ToggleButton>
            <Box sx={{...styles.wrapper, display: show ? 'block' : 'none'}}>
                <List sx={styles.list}>
                    {items.map((item) => (
                        <ListItem key={item.title} sx={styles.listItem}>
                            <Box sx={styles.textWrapper}>
                                <Typography component='h3' sx={styles.title}>{item.title}</Typography>
                                <Typography component='p' sx={styles.company}>at {item.company}</Typography>
                            </Box>
                            <Typography sx={styles.duration}>{item.duration}</Typography>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Grid>
    )
}

export default PreviousPosition;