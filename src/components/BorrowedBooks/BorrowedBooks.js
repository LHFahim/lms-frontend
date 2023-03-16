import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import Book from '../Book/Book';
import DBook from '../Book/DBook';

const BorrowedBooks = () => {
  const { user } = useContext(AuthContext);
  let borrowdBookData = useLoaderData();

  const [donatedBooks, setDonatedBooks] = useState([]);
  const [returnedBooks, setReturnedBooks] = useState([]);

  if (borrowdBookData.success) {
    borrowdBookData = borrowdBookData?.data;
  }

  let mapKey = 0;

  // extend borrow
  const handleExtendBorrow = async id => {
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

  // donated books
  const getDonatedBooks = async () => {
    try {
      const result = await axios.get(
        `http://localhost:5000/api/v1/donate-book/user-donated`,
        { headers: { Authorization: user.user.accessToken } }
      );

      if (result.data.success) setDonatedBooks(result.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  getDonatedBooks();

  // returned books
  const getReturnedBooks = async () => {
    try {
      const result = await axios.get(
        `http://localhost:5000/api/v1/borrow-books/returned-books`,
        { headers: { Authorization: user.user.accessToken } }
      );

      if (result.data.success) {
        setReturnedBooks(result.data.data);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  getReturnedBooks();

  console.log(returnedBooks);

  return (
    <main>
      <section className="grid grid-cols-3 gap-5">
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
      </section>
      <section className="mt-16 ">
        <h1 className="text-2xl font-black uppercase text-center">
          These are the books you donated
        </h1>
        <div className="grid grid-cols-3 gap-5">
          {donatedBooks.map(book => {
            return <DBook key={book.id} book={book}></DBook>;
          })}
        </div>
      </section>
      <section className="mt-16 ">
        <h1 className="text-2xl font-black uppercase text-center">
          These are the books you returned
        </h1>
        <div className="grid grid-cols-3 gap-5">
          {returnedBooks.map(item => {
            return <DBook key={item.bookId.id} book={item.bookId}></DBook>;
          })}
        </div>
      </section>
    </main>
  );
};

export default BorrowedBooks;
