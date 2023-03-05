import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const AcceptReturn = ({ book }) => {
  const { user } = useContext(AuthContext);

  const { title, author, image } = book.bookId;
  const { firstName, email, avatarURL } = book.borrower;

  const bookId = book.bookId.id;
  const userId = book.borrower.id;

  const handleAcceptReturn = async (bookId, userId) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/admin-borrow-books/${bookId}/${userId}/accept`,
        {},
        {
          headers: {
            Authorization: user.user.accessToken,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main>
      <section className="flex items-center">
        <div>
          <h1>{title}</h1>
          <h1>{author}</h1>
          <img className="w-2/12" src={image} alt="" />
        </div>

        <div>
          <h1>{firstName}</h1>
          <h1>{email}</h1>
          <img className="w-2/12" src={avatarURL} alt="" />
        </div>
        <div>
          <button
            onClick={() => handleAcceptReturn(bookId, userId)}
            className="py-2 px-3 rounded-lg bg-zinc-800 text-white"
          >
            Accept return
          </button>
        </div>
      </section>
    </main>
  );
};

export default AcceptReturn;
