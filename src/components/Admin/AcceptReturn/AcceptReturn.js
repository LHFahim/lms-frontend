import axios from 'axios';
import React, { useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const AcceptReturn = ({ book }) => {
  const { user } = useContext(AuthContext);
  // console.log(book);

  const { title, author, image } = book.book;
  const { firstName, email, avatarURL } = book.borrower;

  const bookId = book.book.id;
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

  const [fine, setFine] = useState(0);

  const handleReducePoints = async userId => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/admin-wallet/${userId}/fine`,
        { fine },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: user.user.accessToken,
          },
        }
      );

      if (response.data.success) {
        fineToast();
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const fineToast = () =>
    toast('Balance has been reduced!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  return (
    <main>
      <section className="grid grid-cols-4 justify-center items-center border-b-2   border-orange-500 ">
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
        <div className="space-y-2">
          <form>
            <input
              className="bg-aqua"
              type="number"
              name="fine-points"
              id=""
              onChange={e => setFine(e.target.value)}
            />
          </form>
          <button
            onClick={() => handleReducePoints(userId)}
            className="px-3 rounded-lg bg-zinc-800 text-white"
          >
            Reduce points
          </button>
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </main>
  );
};

export default AcceptReturn;
