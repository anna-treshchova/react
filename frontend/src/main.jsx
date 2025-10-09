import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './index.css'
import App from './App.jsx'

const theme = createTheme({
    typography: {
        fontFamily: 'Montserrat, sans-serif',
    },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ThemeProvider theme={theme}>
          <Provider store={store}>
              <App />
          </Provider>
      </ThemeProvider>
  </StrictMode>,
)
