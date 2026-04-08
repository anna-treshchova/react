import { createBrowserRouter, RouterProvider, Navigate } from 'react-router';

//Loaders
import { destinationsLoader } from './entities/destinations';

import ExperiencesPage from './pages/Experiences';
import ServicesPage from './pages/Services';

import {
  HotelsPage,
  HotelPage,
  hotelsLoader,
  hotelDetailsLoader,
} from './features/hotels';

//Components
import Layout from './app/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    loader: destinationsLoader,
    shouldRevalidate: ({ currentUrl, nextUrl }) => {
      return currentUrl.pathname !== nextUrl.pathname;
    },
    children: [
      {
        index: true,
        element: <HotelsPage />,
        loader: hotelsLoader,
      },
      {
        path: 'hotels/:id',
        element: <HotelPage />,
        loader: hotelDetailsLoader,
      },
      {
        path: 'experiences',
        element: <ExperiencesPage />,
      },
      {
        path: 'services',
        element: <ServicesPage />,
      }
    ]
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App;
