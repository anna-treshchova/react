
import SmileProvider from './contexts/SmileContext';

import SmileVoting from './pages/smiles';

import Header from './components/Header';
import Footer from './components/Footer';


function App() {
  return (
    <>
        <Header />
        <SmileProvider>
            <SmileVoting />
        </SmileProvider>

        <Footer />
    </>
  );
}

export default App;


/*‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

                              ІМПОРТИ:

 1. Імпорти бібліотек (React, ReactDOM, uuid, тощо)

      import React from 'react';
      import { v4 as uuidv4 } from 'uuid';

 2. Імпорти наших утиліт або функцій

      import { calculateVotes } from '../utils/voteUtils';

 3. Імпорти контекстів (створених нами)

      import { ThemeContext } from '../contexts/ThemeContext';

 4. Імпорти компонентів (створених нами)

      import Header from '../components/Header';
      import SmileList from '../components/SmileList';

 5. Імпорти сторонніх компонентів із бібліотек (наприклад, з `@mui/material`)

      import { Button } from '@mui/material';

 6. Імпорти зображень
      import smileImage from '../assets/smile.png';

 7. Імпорти стилів (CSS, SCSS, тощо)
      import './App.css';


‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾*/


