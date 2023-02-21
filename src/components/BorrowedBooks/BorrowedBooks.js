import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Book from '../Book/Book';

const BorrowedBooks = () => {
  let borrowdBookData = useLoaderData();

  borrowdBookData = borrowdBookData?.data;

  return (
    <main>
      {borrowdBookData ? (
        <>
          <div className="w-2/6">
            <Book book={borrowdBookData.book} />
            <h2>You borrowed it on {borrowdBookData.borrowedDate}</h2>
            <small>Remaining: {borrowdBookData.remainingDays.days} days</small>
          </div>
        </>
      ) : (
        <p>No book was borrowed</p>
      )}
    </main>
  );
};

export default BorrowedBooks;
