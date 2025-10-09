import { useSelector } from 'react-redux';

import { Grid, Box } from '@mui/material';

import SkillCategory from './components/Category.jsx';
import ToggleButton from '@/components/UI/atoms/ToggleButton';

const styles = {
    grid: {
        pb: 1,
        minHeight: '200px',
    },
    wrapper: {
        position: 'relative',
        mt: 3,
        ml: { xs: 3.5, sm: 5 },
        pr: 1.5,
        '&::before': {
            content: '""',
            width: '1px',
            height: 'calc(100% - 16px)',
            backgroundColor: '#5d6064',
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translate(-50%, -50%)',
        },
        '&::after': {
            content: '""',
            width: '6px',
            height: '6px',
            backgroundColor: '#5d6064',
            position: 'absolute',
            left: 0,
            bottom: 0,
            transform: 'translate(-50%,-50%)',
        }
    }
}

const Skills = () => {
    const { items, show } = useSelector((state) => state.sections.skills);

    return (
        <Grid item sx={styles.grid}>
            <ToggleButton section='skills' noTopBorder>Technical skills</ToggleButton>
            <Box  sx={{...styles.wrapper, display: show ? 'block' : 'none'}}>
                {items.map(category => (
                    <SkillCategory
                        key={category.title}
                        category={category.title}
                        items={category.items}
                    />
                ))}
            </Box>
        </Grid>
    )
}

export default Skills;