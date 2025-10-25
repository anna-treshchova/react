import { lazy } from 'react'; //lazy loading
import { createBrowserRouter, RouterProvider } from 'react-router';

//Loaders
import destinationsLoader from './loaders/destinationsLoader.js';
import hotelLoader from './loaders/hotelLoader.js';

//Pages
import Home from './pages/home';
import SearchResults from './pages/search-results';
import Hotel from './pages/hotel/';
const About = lazy(() => import('./pages/about'));


//Components
import Layout from './components/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: destinationsLoader
      },
      {
        path: '/search',
        element: <SearchResults />,
      },
      {
        path: '/search/:id',
        element: <Hotel />,
        loader: hotelLoader
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: '*',
        element: <Home />,
        loader: destinationsLoader
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
