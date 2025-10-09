import { List, ListItem, Typography } from '@mui/material';

const styles = {
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        fontSize: 10,
        listStyleType: 'disc',
        ml: 3,
        py: 0,
        fontWeight: '300',
    },
    listItem: {
        fontSize: 12,
        lineHeight: '1.5',
        display: 'list-item',
        pl: '2px',
        py: 0
    },
    text: {
        fontSize: 12,
        fontWeight: '300',
        position: 'relative',
        pl: 1.5,
        ml: 1.5,
        '&::before': {
            content: '""',
            height: '4px',
            width: '4px',
            borderRadius: '50%',
            backgroundColor: '#5d6064',
            position: 'absolute',
            left: '0',
            top: '45%',
        }
    }
}

const SkillItems = ({ items }) => {
    if (items.length > 5) {
        return (
            <List sx={styles.list} >
                {items.map((item) => (
                    <ListItem key={item} sx={styles.listItem}>
                        {item}
                    </ListItem>
                ))}
            </List>
        )
    }

    return (
        <Typography sx={styles.text}>{ items.join(', ') }</Typography>
    )
}

export default SkillItems;