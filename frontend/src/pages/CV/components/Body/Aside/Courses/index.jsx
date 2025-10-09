import { useSelector } from 'react-redux';
import { Grid, List, ListItem, Typography, Box } from '@mui/material';

import ToggleButton from '@/components/UI/atoms/ToggleButton';

const styles = {
    grid: { flexDirection: 'column', minHeight: '100px' },
    list: {
        fontSize: 12,
        listStyleType: 'disc',
        listStylePosition: 'outside',
        pt: 1,
        pb: 1.5,
        ml: 4.5
    },
    listItem: { display: 'list-item', pl: '2px', py: 1 },
    commonSchool: {
        fontSize: 12,
        fontWeight: '300',
        textTransform: 'uppercase',
        letterSpacing: 1.4,
        textAlign: 'center'
    },
    title: { fontSize: 12, fontWeight: '500' },
    duration: { fontSize: 12, fontWeight: '300' }
}



const Courses = () => {
    const {items, show} = useSelector((state) => state.sections.courses);

    const hasOneSchool = items.length > 0 && items.every(item => item.school === items[0].school);
    const commonSchool = hasOneSchool ? items[0].school : null;

    return (
        <Grid item xs={12} sm={6} md={12} sx={styles.grid}>
            <ToggleButton section='courses'>Courses</ToggleButton>
            <Box sx={{display: show ? 'block' : 'none', pt: 2}}>
                {commonSchool && (
                    <Typography sx={styles.commonSchool} component='h3'>{commonSchool}</Typography>
                )}
                <List sx={styles.list}>
                    {items.map((item) => {
                            return(
                                <ListItem
                                    key={item.title}
                                    sx={styles.listItem}>
                                    <Typography sx={styles.title} component='h4'>
                                        {item.title}
                                    </Typography>
                                    <Typography sx={styles.duration}>
                                        {`${item.duration} (${item.grade})`}
                                    </Typography>
                                    {!commonSchool && <Typography>{item.school}</Typography>}
                                </ListItem>
                            )
                        })
                    }
                </List>
            </Box>
        </Grid>
    )
}

export default Courses;