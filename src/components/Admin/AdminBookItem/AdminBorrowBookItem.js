import axios from 'axios';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import './adminBookItem.css';

const AdminBorrowBookItem = ({ book }) => {
  const { user } = useContext(AuthContext);

  const {
    title,
    author,
    description,
    tags,
    image,
    borrowedBy,

    id,
  } = book.bookId;

  const { email } = book.borrower;
  const { borrowedDate, returnDate } = book;

  const tempBorrowDate = new Date(borrowedDate);
  const finalBorrowDate =
    tempBorrowDate.getFullYear() +
    '-' +
    (tempBorrowDate.getMonth() + 1) +
    '-' +
    tempBorrowDate.getDate();

  const tempReturnDate = new Date(returnDate);
  const finalReturnDate =
    tempReturnDate.getFullYear() +
    '-' +
    (tempReturnDate.getMonth() + 1) +
    '-' +
    tempReturnDate.getDate();

  // handle book delete
  const handleBookDelete = async id => {
    console.log('id', id);
    try {
      const res = axios.delete(`http://localhost:5000/api/v1/admin-books/a`, {
        headers: {
          Authorization: user.user.accessToken,
        },
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <main>
      <section>
        <div>
          <main>
            <div className="wrapper mb-10 p-5 border-b-2 border-orange-500 hover:bg-aqua">
              <img src={image} alt="" />
              <h1>{title}</h1>
              <h1>{author}</h1>
              <h1>{description}</h1>
              <h1>{tags}</h1>
              <h1>{email}</h1>
              <h1>{finalBorrowDate}</h1>
              <h1>{finalReturnDate}</h1>

              {/* <h1>{updatedAt}</h1> */}
            </div>
          </main>
        </div>
      </section>
    </main>
  );
};

export default AdminBorrowBookItem;
