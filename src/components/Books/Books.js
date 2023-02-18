import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Book from '../Book/Book';

const Books = () => {
  let books = useLoaderData();
  books = books.data;

  return (
    <div>
      <main className="w-8/12 mx-auto my-10 shadow-2xl">
        <section className="grid grid-cols-4 p-5 gap-5">
          {books.map(book => (
            <Book key={book.id} book={book} />
          ))}
        </section>
      </main>
    </div>
  );
};

export default Books;
