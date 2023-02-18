import React from 'react';

const Book = () => {
  return (
    <div>
      <div className="border border-gray-200 p-3 shadow-md rounded-lg">
        <div className="flex justify-center">
          <img
            className="w-3/4"
            src="https://i5.walmartimages.com/asr/c9e295c7-0187-427e-aff1-7e24a31f1997.657f9e5d49be4695c28ec272be1447ea.jpeg"
            alt=""
          />
        </div>
        <div className="mt-10 space-y-3">
          <div className="border border-b-2 w-2/4 mx-auto border-orange-500"></div>
          <div>
            <h1>Title: Competitive Programming 4</h1>
            <h1 className="text-zinc-400">Author: Steven Halim</h1>
          </div>
          <div className="border border-b-2 border-orange-500"></div>
          <div className="flex justify-between items-center">
            <h1 className="text-zinc-400">Cost: 100 pts</h1>
            <button className="py-2 px-3 bg-orange-500 rounded-lg text-white">
              Borrow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
