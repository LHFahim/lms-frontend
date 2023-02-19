import React from 'react';
import Book from '../Book/Book';

const FilteredResults = () => {
  const filterResults = JSON.parse(localStorage.getItem('filterResults'));

  return (
    <main className="my-10 shadow-2xl">
      <section className="grid grid-cols-4 p-5 gap-5">
        {filterResults?.map(book => (
          <Book key={book.id} book={book} />
        ))}
      </section>
    </main>
  );
};

export default FilteredResults;
