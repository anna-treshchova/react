import { createBrowserRouter, RouterProvider } from 'react-router';

//Loaders
import {destinationsLoader} from './pages/Destinations';

//Pages
import Destinations from './pages/Destinations';
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
        element: <Destinations />,
        loader: destinationsLoader
      },
      {
        path: 'about-us',
        element: <AboutUs />,
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App;
