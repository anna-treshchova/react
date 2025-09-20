import { createBrowserRouter, RouterProvider } from 'react-router';

//Loaders

//Pages
import Destinations from './pages/destinations';
import AboutUs from './pages/about-us';

//Components
import Layout from './components/Layout';

const API_URL = 'http://localhost:4000';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Destinations />,
                loader: async () => {
                    try {
                        const res = await fetch(`${API_URL}/destinations`)
                        if (!res.ok) {
                            throw new Error('Failed to get destinations');
                        }
                        return await res.json();
                    } catch (err) {
                        console.error(err.message);
                    }
                }
            },
            {
                path: 'about-us',
                element: <AboutUs />,
                loader: () => {
                    console.log(`Loading data`)
                    return 'My data'
                }
            },
            {
                path: '*',
                element: <div>404 Page</div>
            }
        ]
    }

])

function App() {
  return (<RouterProvider router={router}/>)
}

export default App
