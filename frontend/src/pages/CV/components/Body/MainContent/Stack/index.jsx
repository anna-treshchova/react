import { useSelector } from 'react-redux';
import { Grid, Typography, Box } from '@mui/material';

import ToggleButton from '@/components/UI/atoms/ToggleButton';

const styles = {
    wrapper: {
        pl: { xs: 3, sm: 4, md: 6 },
        pr: 1.5,
        py: 2,
    },
    text: {
        fontSize: 12,
        fontWeight: '300',
        letterSpacing: 0.2,
        lineHeight: 1.7,
        whiteSpace: 'pre-wrap',   // дозволяє зберігати кількість пробілів
        wordBreak: 'break-word',  // не дає тексту вилазити
    }
}

const Stack = () => {
    const { items, show } = useSelector((state) => state.sections.stack);

    return (
        <Grid item sx={{minHeight: '100px'}}>
            <ToggleButton section='stack'>Technical stack</ToggleButton>
            <Box sx={{
                ...styles.wrapper,
                display: show ? 'block' : 'none'
            }}>
                <Typography sx={styles.text}>{ items.join(', ') }</Typography>
            </Box>
        </Grid>
    )
}

export default Stack;