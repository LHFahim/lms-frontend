import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const BookDetails = book => {
  const { user } = useContext(AuthContext);

  let bookData = useLoaderData();

  const [isBorrowed, setIsBorrowed] = useState(false);

  bookData = bookData.data;

  const {
    author,
    title,
    description,

    quantity,
    tags,
    image,
    shelf,
    id,
  } = bookData;

  const handleBorrowBook = async id => {
    const response = await axios.patch(
      `http://localhost:5000/api/v1/books/${id}/borrow`,
      {},
      { headers: { Authorization: user.user.accessToken } }
    );

    if (response.data.success) {
      let tempBorrowedBook = JSON.parse(localStorage.getItem('borrowedBook'));

      if (!tempBorrowedBook) {
        const tempArray = [id];
        tempBorrowedBook = tempArray;

        localStorage.setItem('borrowedBook', JSON.stringify(tempBorrowedBook));
        setIsBorrowed(true);
      } else {
        tempBorrowedBook.push(id);
        localStorage.setItem('borrowedBook', JSON.stringify(tempBorrowedBook));
      }
    }
  };

  const handleReturnBook = async id => {
    const response = await axios.patch(
      `http://localhost:5000/api/v1/books/${id}/return`,
      {},
      { headers: { Authorization: user.user.accessToken } }
    );

    if (response.data.success) {
      let tempBorrowedBook = JSON.parse(localStorage.getItem('borrowedBook'));

      if (tempBorrowedBook) {
        const data = tempBorrowedBook.filter(d => d !== id);

        localStorage.setItem('borrowedBook', JSON.stringify(data));
        setIsBorrowed(false);
      }
    }
  };

  useEffect(() => {
    const retrievedBorrowedBook = JSON.parse(
      localStorage.getItem('borrowedBook')
    );
    if (retrievedBorrowedBook?.find(book => book === id)) setIsBorrowed(true);
  }, [id]);

  return (
    <div>
      <div className="border border-gray-200 p-3 shadow-md rounded-lg">
        <div className="flex  justify-center ">
          <img className="w-2/5" src={image} alt="" />
        </div>
        <div className="mt-10 space-y-3">
          <div className="border border-b-2 w-2/4 mx-auto border-orange-500"></div>
          <div>
            <h1 className="font-semibold">{title}</h1>
            <div className="inline space-x-3">
              <small>Genres:</small>
              <small>{tags[0]}</small>
              <small>{tags[1]}</small>
            </div>

            <h1 className="italic">{author}</h1>
            <small>Shelf: {shelf}</small>
          </div>
          <div>
            <p>{description}</p>
          </div>

          <div className="border border-b-2 border-orange-500"></div>
          <div className="flex justify-between items-center">
            <div>
              <h2>Available: {quantity}</h2>
            </div>

            {isBorrowed ? (
              <button
                onClick={() => handleReturnBook(id)}
                className="py-2 px-3 bg-zinc-800 rounded-lg text-white"
              >
                Return Book
              </button>
            ) : (
              <button
                onClick={() => handleBorrowBook(id)}
                className="py-2 px-3 bg-zinc-800 rounded-lg text-white"
              >
                Borrow Book
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
