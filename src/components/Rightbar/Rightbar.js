import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Rightbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const [previousBook, setPreviousBook] = useState();
  // const [previousBook, setPreviousBook] = useState({
  //   title: '',
  //   author: '',
  //   tags: '',
  // });

  const [recommendedBook, setRecommendedBook] = useState({
    title: '',
    author: '',
    tags: '',
    image: '',
  });

  // search query use state
  const [query, setQuery] = useState('');
  const [searchedData, setSearchedData] = useState([]);

  useEffect(() => {
    const searchQuery = async () => {
      const localStorageUser = JSON.parse(localStorage.getItem('user'));

      const searchedData = await axios.get(
        `http://localhost:5000/api/v1/books/search?key=${query}`,
        { headers: { Authorization: localStorageUser.accessToken } }
      );

      if (searchedData?.data?.success) {
        setSearchedData(searchedData?.data?.data);
      }
    };

    // if search input bar has no text,
    // it clears previously searched book data
    if (!query.length) setSearchedData([]);

    // to prevent from infinite api call
    if (query.length > 0) searchQuery();
  }, [query]);

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
    <main className="space-y-5 ml-2">
      {/* search book section starts */}

      <section className="w-11/12 mx-auto space-y-4">
        <div>
          <div className="text-center">
            <h1>Search book</h1>
          </div>
          <div className="flex justify-center">
            <input
              type="text"
              className="px-10 py-2 bg-aqua focus:outline-none"
              onChange={event => setQuery(event.target.value)}
            />
          </div>
        </div>
        {/* result */}
        <div className="">
          {searchedData.map(book => {
            return (
              <div
                className="border border-orange-500  text-center w-11/12 mx-auto py-2 hover:bg-zinc-500 hover:text-zinc-800 text-lg hover:font-extrabold"
                key={book.id}
              >
                <Link to={`/book/${book.id}`}>{book.title}</Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* recommend book section starts */}
      {previousBook ? (
        <section className="space-y-3">
          <div className="shadow-2xl w-11/12 mx-auto bg-aqua">
            <section>
              <div className="p-2 space-y-3">
                <h1>
                  Hey{' '}
                  <strong className="text-orange-500">
                    {user.user.firstName}
                  </strong>
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
        </section>
      ) : (
        <></>
      )}
    </main>
  );
};

export default Rightbar;
