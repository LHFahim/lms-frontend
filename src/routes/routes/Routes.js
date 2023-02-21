import axios from 'axios';
import { useContext } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import BookDetails from '../../components/BookDetails/BookDetails';

import Books from '../../components/Books/Books';
import BorrowedBooks from '../../components/BorrowedBooks/BorrowedBooks';
import Error from '../../components/Error/Error';
import FilteredResults from '../../components/FilteredResults/FilteredResults';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import Main from '../../layout/Main';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import ProtectedRoutes from '../ProtectedRoutes/ProtectedRoutes';

const user = JSON.parse(localStorage.getItem('user'));
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
          // const user = JSON.parse(localStorage.getItem('user'));

          return await fetch('http://localhost:5000/api/v1/books', {
            method: 'GET',
            headers: { Authorization: user?.accessToken },
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
          // const user = JSON.parse(localStorage.getItem('user'));
          return await fetch(
            `http://localhost:5000/api/v1/books/${params.id}`,
            {
              method: 'GET',
              headers: { Authorization: user?.accessToken },
            }
          );
        },
        element: (
          <ProtectedRoutes>
            <BookDetails />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/book/filteredResults',
        element: (
          <ProtectedRoutes>
            <FilteredResults />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/borrowed-books',
        loader: async () => {
          return await fetch(`http://localhost:5000/api/v1/borrow-books`, {
            method: 'GET',
            headers: { Authorization: user?.accessToken },
          });
        },
        element: (
          <ProtectedRoutes>
            <BorrowedBooks />
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
