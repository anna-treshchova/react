import { createBrowserRouter, RouterProvider } from 'react-router';
import profileInfoLoader from './loaders/profileInfoLoader.js';
import Layout from './components/Layout';
import CV from './pages/CV';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <CV />,
                loader: profileInfoLoader
            }
        ]
    }
])

function App() {
  return (
   <RouterProvider router={router} />
  )
}

export default App
