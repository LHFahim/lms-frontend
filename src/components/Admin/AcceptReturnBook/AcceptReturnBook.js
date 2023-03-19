import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import AcceptReturn from '../AcceptReturn/AcceptReturn';
import Navbar from '../../Navbar/Navbar';

const AcceptReturnBook = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = user.user.user.panelType;

  const [borrowedBooks, setBorrowedBooks] = useState([]);

  const fetchBorrowedBooks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/admin-borrow-books`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: user.user.accessToken,
          },
        }
      );

      if (response.data.success) {
        setBorrowedBooks(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  fetchBorrowedBooks();

  return (
    <main>
      <Navbar />
      {isAdmin === 'ADMIN' ? (
        <div className="w-6/12 mx-auto shadow-2xl">
          {borrowedBooks.map(book => (
            <AcceptReturn key={book.id} book={book}></AcceptReturn>
          ))}
        </div>
      ) : (
        <>
          <h1 className="text-center mt-10 text-red-500">
            Sorry, this is only for admin!
          </h1>
        </>
      )}
    </main>
  );
};

export default AcceptReturnBook;
