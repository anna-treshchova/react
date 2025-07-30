// import { useState } from 'react';

// import FunctionalCounter from './components/FunctionalCounter';

//import MemoizeFunctionExample from './pages/memo/MemoizeFunctionExample';
// import MemoExample from './pages/memo';


import Header from './components/Header';
import Footer from './components/Footer';

import Todo from './pages/todo';

// ПОРЯДОК ІМПОРТІВ


function App() {
  return (
    <>
      {/*<MemoizeFunctionExample />*/}
      {/*<MemoExample />*/}

        <Header />
        <Todo />
        <Footer />
    </>
  );
}

export default App;




