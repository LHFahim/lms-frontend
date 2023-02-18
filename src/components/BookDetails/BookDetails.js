import axios from 'axios';
import React from 'react';
import { useLoaderData } from 'react-router-dom';

const BookDetails = () => {
  let bookData = useLoaderData();

  bookData = bookData.data;

  const {
    author,
    title,
    description,
    cost,
    currency,
    quantity,
    category,
    image,
    id,
  } = bookData;

  const handleBorrowBook = async id => {
    console.log('borrowing book with id', id);
    const response = await axios.post(
      `http://localhost:5000/api/v1/books/${id}/borrow`
    );
    console.log(
      '🚀 ~ file: BookDetails.js:27 ~ handleBorrowBook ~ response',
      response
    );
  };
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
            <small>{category}</small>
            <h1 className="italic">{author}</h1>
          </div>
          <div>
            <p>{description}</p>
          </div>
          <div>
            <h2>Available: {quantity}</h2>
          </div>
          <div className="border border-b-2 border-orange-500"></div>
          <div className="flex justify-between items-center">
            <h1 className="text-zinc-400">
              Cost: {cost} {currency}
            </h1>
            <button
              onClick={() => handleBorrowBook(id)}
              className="py-2 px-3 bg-orange-500 rounded-lg text-white"
            >
              Borrow Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
