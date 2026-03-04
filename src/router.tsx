import { createBrowserRouter } from 'react-router'
import { HomePage } from './screens/home-page'
import { NotFoundPage } from './screens/not-found-page'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
