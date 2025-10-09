import { useSelector } from 'react-redux';
import { Grid, List, ListItem, Typography, Box, Link } from '@mui/material';
import ToggleButton from '@/components/UI/atoms/ToggleButton';
import { icons } from '@/constants/icons.js'

const styles = {
    grid: {
        flexDirection: 'column',
        minHeight: '100px',
        borderRight: { xs: 'none', sm: '1px solid #ebebeb', md: 'none'},
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        py: 3,
        pl: { xs: 4, md: 2 },
        pr: 3
    },
    listItem: { p: 0 },
    icon: { fontSize: 17, mr: 1.5 },
    text: { fontSize: 12, fontWeight: 300, wordBreak: 'break-word', color: 'inherit', textDecorationColor: 'inherit' },
}

const Contacts = () => {
    const { items, show } = useSelector((state) => state.sections.contacts);

    return (
        <Grid xs={12} sm={6} md={12} sx={styles.grid}>
            <ToggleButton section='contacts' noTopBorder responsiveTopBorder>
                Contacts
            </ToggleButton>
            <Box sx={{display: show ? 'block' : 'none'}}>
                <List sx={styles.list}>
                    {items.map((item) => {
                        const Icon = icons[item.type];
                        return(
                            <ListItem key={item.type} sx={styles.listItem}>
                                {Icon && <Icon size={8} sx={styles.icon}/>}
                                {item.link ? (
                                    <Link
                                        href={item.link}
                                        target='_blank'  // target='_blank' - відкрити посилання в новій вкладці браузера
                                        rel='noopener noreferrer'
                                        sx={styles.text}
                                    >
                                        {item.value}
                                    </Link>
                                )
                                    : (<Typography sx={styles.text}>{item.value}</Typography>)
                                }

                            </ListItem>
                        )
                    })}
                </List>
            </Box>
        </Grid>
    )
}

export default Contacts;