import { createBrowserRouter, RouterProvider } from 'react-router';

//Loaders
import { destinationsLoader } from './loaders/destinationsLoader.js';

//Pages
import Events from './pages/events';
import AboutUs from './pages/about-us';

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
