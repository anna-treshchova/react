import { createBrowserRouter, RouterProvider } from 'react-router';

//Loaders
import { destinationsLoader } from './loaders/destinationsLoader.js';
import { eventLoader } from './loaders/eventsLoader.js';

//Pages
import Events from './pages/events';
import AboutUs from './pages/about-us';
import Event from './pages/event';

//Components
import Layout from './components/Layout';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Events />,
                loader: destinationsLoader,
            },
            {
                path: 'about-us',
                element: <AboutUs />,
            },
            {
                path: 'events/:id',
                element: <Event />,
                loader: eventLoader,
            },
            {
                path: '*',
                element: <div style={{marginTop: '30px', fontSize: '22px', fontWeight: 200}}>404 Page</div>
            }
        ]
    }
])

function App() {
  return (<RouterProvider router={router}/>)
}

export default App
