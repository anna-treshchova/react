import { Box, Typography } from '@mui/material';

import SkillItems from './Items.jsx';

const styles = {
    container: { mb:2, pl: 2 },
    text: {
        fontSize: 12,
        textTransform: 'uppercase',
        fontWeight: 600,
        mb: 2,
        position: 'relative',
        '&::before': {
            content: '""',
            width: '6px',
            height: '6px',
            backgroundColor: '#5d6064',
            position: 'absolute',
            left: '-16px',
            top: '50%',
            transform: 'translate(-50%,-50%)',
        }
    }
}

const SkillCategory = ({ category, items }) => {
    return (
        <Box sx={styles.container}>
            <Typography sx={styles.text}>{category}</Typography>
            <SkillItems items={items}/>
        </Box>
    )
}
export default SkillCategory;