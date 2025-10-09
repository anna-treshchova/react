import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, ButtonBase } from '@mui/material';
import TouchRipple from '@mui/material/ButtonBase/TouchRipple';

import { getAllSections } from '@/store/thunks/sectionsThunk.js';
import { toggleAllSections } from '@/store/slices/sectionsSlice.js';

const styles = {
    grid: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        pt: 2,
        position: 'relative',
    },
    avatarWrapper: {
        position: 'relative',
        width: '145px',
        height: '145px',
        borderRadius: '50%',
        border: '1px solid #000000',
        overflow: 'hidden',
        margin: '0 auto',
        mb: 5,
        zIndex: 2,
        '.MuiTouchRipple-root': {
            zIndex: 3,
            color: 'rgba(255,255,255,0.73)',
        }
    },
    overlay: {
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 1,
    },
    image:{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: 2,
        position: 'relative',
        display: 'block',
        cursor: 'pointer',
    },
    ripple: {
        position: 'absolute',
        inset: 0,
        borderRadius: '50%',
        overflow: 'hidden',
        color: 'rgba(255,255,255,0.29)',
        zIndex: 3,
    }
}

const InteractiveAvatar = () => {
    const rippleRef = useRef(null);
    const intervalRef = useRef(null);

    const [showOverlay, setShowOverlay] = useState(true);

    const sections = useSelector((state) => state.sections);
    const avatar = useSelector((state) => state.profile.data?.avatar);
    const dispatch = useDispatch();

    useEffect(() => {
        const ripple = rippleRef.current;

        if (ripple) {
            intervalRef.current = setInterval(() => {
                ripple.start({}, { center: true });
                setTimeout(() => ripple.stop(), 600);
            }, 1200)
        }

        return () => clearInterval(intervalRef.current);
    }, []);

    const allSectionsLoaded = () => Object.values(sections).every(s => s.items.length !== 0)

    const handleToggleAllSections = () => {

        if (allSectionsLoaded()) {
            dispatch(toggleAllSections());
        } else {
            dispatch(getAllSections());
            setShowOverlay(false);
            clearInterval(intervalRef.current);
        }
    }

    return (
        <Grid item xs={12} sm={4} sx={styles.grid}>
            {showOverlay && <Box sx={styles.overlay} />}
            <ButtonBase
                disableRipple={showOverlay}
                onClick={handleToggleAllSections}
                sx={styles.avatarWrapper}>
                <Box component='img' src={avatar} sx={styles.image} />
                <TouchRipple ref={rippleRef} center style={styles.ripple} />
            </ButtonBase>

        </Grid>
    );
};

export default InteractiveAvatar;


