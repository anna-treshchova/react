import { useSelector } from 'react-redux';
import { Grid, List, ListItem, Typography, Box } from '@mui/material';

import ToggleButton from '@/components/UI/atoms/ToggleButton';

const styles = {
    grid: {
        flexDirection: 'column',
        minHeight: '100px'
    },
    list: {
        fontSize: 12,
        listStyleType: 'disc',
        pt: 2,
        pb: { sm: 3, md: 2 },
        ml: 5
    },
    listItem: {
        display: 'list-item',
        pl: '2px',
        py: 0.5
    },
    text: {
        fontSize: '12px',
        fontWeight: '300'
    }
}

const Languages = () => {
    const {items, show} = useSelector((state) => state.sections.languages);

    return (
        <Grid xs={12} sm={6} md={12} sx={styles.grid}>
            <ToggleButton section='languages'>Languages</ToggleButton>
            <Box sx={{display: show ? 'block' : 'none'}}>
                <List sx={styles.list}>
                    {items.map((item) => (
                        <ListItem sx={styles.listItem} key={item.name}>
                            <Typography sx={styles.text}>
                                {`${item.name} ${item.levelText !== 'Native' ? `(${item.level})` : ''}`}
                            </Typography>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Grid>
    )
}

export default Languages;