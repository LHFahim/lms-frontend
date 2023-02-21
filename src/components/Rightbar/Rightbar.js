import axios from 'axios';
import React, { useState } from 'react';
import Book from '../Book/Book';

const Rightbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const [previousBook, setPreviousBook] = useState({
    title: '',
    author: '',
    tags: '',
  });
  const [recommendedBook, setRecommendedBook] = useState({
    title: '',
    author: '',
    tags: '',
    image: '',
  });

  const getReadBooks = async () => {
    let response = await axios.get(
      `http://localhost:5000/api/v1/user-interests`,
      { headers: { Authorization: user?.accessToken } }
    );

    const bookPreviouslyRead = response.data.data.previousRead;
    const recommendedBook = response.data.data.recommendedBook;

    setPreviousBook({
      title: bookPreviouslyRead.title,
      author: bookPreviouslyRead.author,
      tags: bookPreviouslyRead.tags,
    });

    setRecommendedBook({
      title: recommendedBook.title,
      author: recommendedBook.author,
      tags: recommendedBook.tags,
      image: recommendedBook.image,
    });
  };

  getReadBooks();

  return (
    <main className="space-y-5">
      <div className="shadow-2xl w-11/12 mx-auto bg-zinc-800 hover:bg-zinc-50 hover:text-zinc-800 hover:rounded-2xl hover:duration-300">
        <section>
          <div className="p-2 space-y-3">
            <h1>
              Hey{' '}
              <strong className="text-orange-500">{user.user.firstName}</strong>
              , you previously read {previousBook.title} by{' '}
              {previousBook.author}!
            </h1>
            <h1>You might like the book below 😉</h1>
          </div>
          <div></div>
        </section>
      </div>
      <div className="shadow-2xl w-8/12 mx-auto bg-yellow-700 text-yellow-300">
        <div className="grid grid-rows-3 text-center">
          <strong>{recommendedBook.title}</strong>
          <h1>{recommendedBook.author}</h1>
          <h1>{recommendedBook.tags}</h1>
        </div>
        <div className="w-2/4 mx-auto">
          <img src={recommendedBook.image} alt="" />
        </div>
      </div>
    </main>
  );
};

export default Rightbar;
