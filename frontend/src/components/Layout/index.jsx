import { Outlet } from 'react-router';
import { AppBar, Toolbar, Typography, Box, Container } from '@mui/material';

const Layout = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", width: "100%", fontFamily: 'inherit'}}>
            <AppBar position="static"
                    style={{
                        backgroundColor: '#eff1f5',
                        width: "100%",
                        color: "inherit",
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
            }}>
                <Toolbar>
                    <Typography>Header</Typography>
                </Toolbar>
            </AppBar>
            <Container
                maxWidth='lg'
                sx={{
                    flexGrow: 1,
                    mx: {sx: 1, sm: 'auto'}
                }}
            >
                <Outlet />
            </Container>
            <Box component='footer'
                 sx={{
                     backgroundColor: '#eff1f5',
                     width: '100%',
                     color: 'inherit',
                     boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.05)',
                     minHeight: "40px",
                 }}
            >
                <Toolbar>
                    <Typography>
                        Footer
                    </Typography>

                </Toolbar>

            </Box>
        </Box>
    )
}

export default Layout;