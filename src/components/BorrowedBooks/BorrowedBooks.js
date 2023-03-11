import axios from 'axios';
import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import Book from '../Book/Book';

const BorrowedBooks = () => {
  const { user } = useContext(AuthContext);
  let borrowdBookData = useLoaderData();

  if (borrowdBookData.success) {
    borrowdBookData = borrowdBookData?.data;
  }

  let mapKey = 0;

  // extend borrow
  const handleExtendBorrow = async id => {
    console.log(
      '🚀 ~ file: BorrowedBooks.js:16 ~ handleExtendBorrow ~ id:',
      id
    );

    try {
      const res = await axios.patch(
        `http://localhost:5000/api/v1/borrow-books/${id}/extend-duration`,
        {},
        { headers: { Authorization: user.user.accessToken } }
      );
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <main className="grid grid-cols-3 gap-5">
      {borrowdBookData.length ? (
        borrowdBookData.map(book => {
          return (
            <div key={mapKey++} className="">
              <Book book={book.book}></Book>
              <h1>Remaining days: {book.remainingDays.days}</h1>

              <article className="mt-5">
                <h1>Extend borrow duration?</h1>
                <button onClick={() => handleExtendBorrow(book.borrowId)}>
                  Click here
                </button>
              </article>
            </div>
          );
        })
      ) : (
        <p>No book was borrowed</p>
      )}
    </main>
  );
};

export default BorrowedBooks;
