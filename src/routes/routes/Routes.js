import { createBrowserRouter } from 'react-router-dom';
import BookDetails from '../../components/BookDetails/BookDetails';

import Books from '../../components/Books/Books';
import Error from '../../components/Error/Error';
import Main from '../../layout/Main';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import ProtectedRoutes from '../ProtectedRoutes/ProtectedRoutes';

export const routes = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },

  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/home',
        loader: async () => {
          return await fetch('http://localhost:5000/api/v1/books', {
            method: 'GET',
            headers: { Authorization: localStorage.getItem('access-token') },
          });
        },
        element: (
          <ProtectedRoutes>
            <Books />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/book/:id',
        loader: async ({ params }) => {
          return await fetch(
            `http://localhost:5000/api/v1/books/${params.id}`,
            {
              method: 'GET',
              headers: { Authorization: localStorage.getItem('access-token') },
            }
          );
        },
        element: (
          <ProtectedRoutes>
            <BookDetails />
          </ProtectedRoutes>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <Error />,
  },
]);
