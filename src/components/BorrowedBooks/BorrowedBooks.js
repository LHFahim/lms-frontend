import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Book from '../Book/Book';

const BorrowedBooks = () => {
  let borrowdBookData = useLoaderData();

  if (borrowdBookData.success) {
    borrowdBookData = borrowdBookData?.data;
  }

  let mapKey = 0;

  return (
    <main className="grid grid-cols-3 gap-5">
      {borrowdBookData.length ? (
        borrowdBookData.map(book => {
          return (
            <div key={mapKey++} className="">
              <Book book={book.book}></Book>
              <h1>Remaining days: {book.remainingDays.days}</h1>
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
