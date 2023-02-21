import React from 'react';
import { Link } from 'react-router-dom';

const Book = ({ book }) => {
  const { id, title, author, image, tags } = book;
  return (
    <div>
      <div className="border border-gray-200 p-3 shadow-md rounded-lg">
        <div className="flex justify-center">
          <img className="w-3/4" src={image} alt="" />
        </div>
        <div className="mt-10 space-y-3">
          <div className="border border-b-2 w-2/4 mx-auto border-orange-500"></div>
          <div>
            <h1 className="font-semibold">{title}</h1>
            <h1 className="italic">{author}</h1>
          </div>
          <div className="border border-b-2 border-orange-500"></div>
          <div className="flex justify-between items-center">
            <Link to={`/book/${id}`} className="text-orange-500">
              Find out more...
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
