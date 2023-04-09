import { createBrowserRouter } from 'react-router-dom';
import AcceptReturnBook from '../../components/Admin/AcceptReturnBook/AcceptReturnBook';
import AddBook from '../../components/Admin/AddBook/AddBook';
import DonateBook from '../../components/Admin/AddBook/DonateBook';

import ApproveBorrowRequest from '../../components/Admin/ApproveBorrowRequest/ApproveBorrowRequest';

import AdminBooks from '../../components/Admin/AdminBooks/AdminBooks';
import AdminDonatePage from '../../components/Admin/AdminDonatePage/AdminDonatePage';
import AdminModifyBook from '../../components/Admin/AdminModifyBook/AdminModifyBook';

import BookDetails from '../../components/BookDetails/BookDetails';

import Books from '../../components/Books/Books';
import BorrowedBooks from '../../components/BorrowedBooks/BorrowedBooks';
import Dashboard from '../../components/Dashboard/Dashboard';
import Error from '../../components/Error/Error';
import FilteredResults from '../../components/FilteredResults/FilteredResults';

import AdminBorrowedList from '../../components/Admin/AdminBooks/AdminBorrowedList';
import AdminListDonatedBooks from '../../components/Admin/AdminDonatePage/AdminListDonatedBooks';
import AdminJobs from '../../components/Admin/AdminJobs/AdminJobs';
import Jobs from '../../components/Jobs/Jobs';
import Main from '../../layout/Main';
import WithoutSidebar from '../../layout/WithoutSidebar';
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
    path: `add-book`,
    element: (
      <ProtectedRoutes>
        <AddBook />,
      </ProtectedRoutes>
    ),
  },
  {
    path: `accept-return-book`,
    element: (
      <ProtectedRoutes>
        <AcceptReturnBook />,
      </ProtectedRoutes>
    ),
  },
  {
    path: `books`,
    element: (
      <ProtectedRoutes>
        <AdminBooks />
      </ProtectedRoutes>
    ),
  },
  {
    path: `books/borrowed-list`,
    element: (
      <ProtectedRoutes>
        <AdminBorrowedList />
      </ProtectedRoutes>
    ),
  },
  {
    path: '/admin-books/:id',
    loader: async ({ params }) => {
      return await fetch(
        `http://localhost:5000/api/v1/admin-books/${params.id}`,
        {
          method: 'GET',
          headers: { Authorization: user?.accessToken },
        }
      );
    },
    element: (
      <ProtectedRoutes>
        <AdminModifyBook />
      </ProtectedRoutes>
    ),
  },

  // job request for admin
  {
    path: '/admin/job-requests',
    loader: async () => {
      return await fetch(`http://localhost:5000/api/v1/admin-jobs/requests`, {
        method: 'GET',
        headers: { Authorization: user?.accessToken },
      });
    },
    element: (
      <ProtectedRoutes>
        <AdminJobs />
      </ProtectedRoutes>
    ),
  },

  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/home',
        loader: async () => {
          return await fetch(`http://localhost:5000/api/v1/books`, {
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
      {
        path: `approve-borrow-request`,
        element: (
          <ProtectedRoutes>
            <ApproveBorrowRequest />
          </ProtectedRoutes>
        ),
      },
      {
        path: `jobs`,
        loader: async () => {
          return await fetch(`http://localhost:5000/api/v1/jobs`, {
            method: 'GET',
            headers: { Authorization: user?.accessToken },
          });
        },
        element: (
          <ProtectedRoutes>
            <Jobs />
          </ProtectedRoutes>
        ),
      },
    ],
  },

  {
    path: '',
    element: <WithoutSidebar />,
    children: [
      {
        path: 'profile',
        loader: async () => {
          return await fetch(`http://localhost:5000/api/v1/auth/me`, {
            method: 'GET',
            headers: { Authorization: user?.accessToken },
          });
        },
        element: (
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        ),
      },
      {
        path: `profile/donate-book`,
        element: (
          <ProtectedRoutes>
            <DonateBook />
          </ProtectedRoutes>
        ),
      },
      {
        path: `profile/donated-books`,
        element: (
          <ProtectedRoutes>
            <AdminDonatePage />
          </ProtectedRoutes>
        ),
      },
      {
        path: `donated-books-list`,
        element: (
          <ProtectedRoutes>
            <AdminListDonatedBooks />
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
