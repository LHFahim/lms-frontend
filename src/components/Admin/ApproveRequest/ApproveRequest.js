import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const ApproveRequest = ({ book, requester }) => {
  const { user } = useContext(AuthContext);

  const { title, author, image } = book;
  const { firstName, email, avatarURL } = requester;

  const bookId = book.id;
  const requesterId = requester.id;

  const handleRequestApprove = async (bookId, requesterId) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/admin-borrow-books/${bookId}/${requesterId}/approve`,
        {},
        {
          headers: {
            Authorization: user.user.accessToken,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleRequestDecline = async (bookId, requesterId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/admin-borrow-books/${bookId}/${requesterId}/decline`,

        {
          headers: {
            Authorization: user.user.accessToken,
          },
        }
      );
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
          <button onClick={() => handleRequestApprove(bookId, requesterId)}>
            Approve Request
          </button>
          <button onClick={() => handleRequestDecline(bookId, requesterId)}>
            Decline Request
          </button>
        </div>
      </section>
    </main>
  );
};

export default ApproveRequest;
