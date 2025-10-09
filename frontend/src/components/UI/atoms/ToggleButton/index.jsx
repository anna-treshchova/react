import { useDispatch, useSelector } from 'react-redux';

import { ToggleButton as MuiToggleButton, styled } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

import { getSection } from '@/store/thunks/sectionsThunk.js';
import { toggleShow } from '@/store/slices/sectionsSlice.js';

const StyledToggleButton = styled(MuiToggleButton)(({ theme, ownerState }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
    fontWeight: 600,
    fontSize: 16,
    letterSpacing: 3,
    color: 'inherit',
    textTransform: 'uppercase',
    borderRadius: 0,
    border: 'none',
    borderTop: ownerState.noTopBorder ? '1px solid transparent' : '1px solid #ebebeb',
    ...(ownerState.responsiveTopBorder && {
        [theme.breakpoints.down('md')]: {
            borderTop: '1px solid #ebebeb',
        },
    }),
    borderBottom: '1px solid #ebebeb',
    transition: 'color 0.3s ease,  background-color 0.3s ease',
    width: '100%',
    '&:hover': {
        backgroundColor: '#fafafa',
        color: '#000000'
    }
}))

const iconStyle = {
    fontSize: 18,
    ml: 1,
    transition: 'transform .3s ease',
}

const ToggleButton = ({ children, section, noTopBorder, responsiveTopBorder }) => {
    const dispatch = useDispatch();

    const show = useSelector((state) => state.sections[section].show);
    const items = useSelector((state) => state.sections[section].items);

    const handleExpand = () => {
        if (items.length === 0) {
            dispatch(getSection(section));
        } else {
            dispatch(toggleShow(section));
        }
    }

    return (
        <StyledToggleButton
            onClick={handleExpand}
            disableRipple
            ownerState={{ noTopBorder, responsiveTopBorder }}
        >
            {children}
            <ExpandMore sx={{
                ...iconStyle,
                transform: show ? 'rotate(180deg)' : 'rotate(0deg)',

            }} />
        </StyledToggleButton>
    )
}

export default ToggleButton;