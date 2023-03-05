import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const BookDetails = book => {
  const { user } = useContext(AuthContext);

  let bookData = useLoaderData();
  bookData = bookData.data;
  const {
    author,
    title,
    description,

    quantity,
    tags,
    image,
    shelf,
    id,
    discussion,
  } = bookData;

  const [isBorrowed, setIsBorrowed] = useState(false);

  const borrowedToast = () =>
    toast('You have requested to borrow this book succesfully!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  const failedBorrowedToast = () =>
    toast('You have already borrowed this book!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  const handleBorrowBook = async id => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/borrow-request-books/${id}/request-to-borrow`,
        {},
        { headers: { Authorization: user.user.accessToken } }
      );
      console.log(
        '🚀 ~ file: BookDetails.js:58 ~ handleBorrowBook ~ response:',
        response
      );

      if (response.data.success) {
        borrowedToast();
        let tempBorrowedBook = JSON.parse(localStorage.getItem('borrowedBook'));

        if (!tempBorrowedBook) {
          const tempArray = [id];
          tempBorrowedBook = tempArray;

          localStorage.setItem(
            'borrowedBook',
            JSON.stringify(tempBorrowedBook)
          );
          setIsBorrowed(true);
        } else {
          tempBorrowedBook.push(id);
          localStorage.setItem(
            'borrowedBook',
            JSON.stringify(tempBorrowedBook)
          );
        }
      }
    } catch (error) {
      console.log(error);
      failedBorrowedToast();
    }
  };

  useEffect(() => {
    const retrievedBorrowedBook = JSON.parse(
      localStorage.getItem('borrowedBook')
    );
    if (retrievedBorrowedBook?.find(book => book === id)) setIsBorrowed(true);
  }, [id]);

  // comments
  const [comments, setComments] = useState();

  // fetch comments
  useEffect(() => {
    const getCommentsData = async () => {
      let commentsData = await axios.get(
        `http://localhost:5000/api/v1/discussion/${id}`,
        { headers: { Authorization: user.user.accessToken } }
      );

      if (commentsData.data.success) {
        setComments(commentsData.data.data.comments);
      }
    };

    getCommentsData();
  });

  // post comments
  const handleComment = async event => {
    event.preventDefault();

    const form = event.target;
    const comment = form.comment.value;

    if (comment.length > 3) {
      console.log(discussion.id);
      try {
        const response = await axios.post(
          `http://localhost:5000/api/v1/comment/${id}/${discussion.id}`,
          { comment: comment },
          { headers: { Authorization: user.user.accessToken } }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  // delete comment
  const deleteComment = async id => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/comment/${discussion.id}/${id}`,
        { headers: { Authorization: user.user.accessToken } }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* book detail section starts */}
      <section>
        <div className="border border-gray-200 p-3 shadow-md rounded-lg">
          <div className="flex  justify-center ">
            <img className="w-2/5" src={image} alt="" />
          </div>
          <div className="mt-10 space-y-3">
            <div className="border border-b-2 w-2/4 mx-auto border-orange-500"></div>
            <div>
              <h1 className="font-semibold">{title}</h1>
              <div className="inline space-x-3">
                <small>Genres:</small>
                <small>{tags[0]}</small>
                <small>{tags[1]}</small>
              </div>

              <h1 className="italic">{author}</h1>
              <small>Shelf: {shelf}</small>
            </div>
            <div>
              <p>{description}</p>
            </div>

            <div className="border border-b-2 border-orange-500"></div>
            <div className="flex justify-between items-center">
              <div>
                <h2>Available: {quantity}</h2>
              </div>

              <button
                onClick={() => handleBorrowBook(id)}
                className="py-2 px-3 bg-zinc-800 rounded-lg text-white"
              >
                Request this book
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* book detail section ends */}

      {/* comments section starts */}
      <section>
        <h1 className="text-2xl font-bold mt-20 mb-5">Comments section</h1>

        <div className="mb-5 ">
          <form
            className="flex justify-around items-center"
            onSubmit={handleComment}
          >
            <textarea
              name="comment"
              className="bg-aqua focus:outline-none p-2 rounded"
              rows="4"
              cols="70"
            />
            <button className="py-2 px-3 rounded-lg bg-zinc-800 text-white">
              Post
            </button>
          </form>
        </div>

        {/* comments */}
        <div>
          {comments ? (
            comments.map(el => {
              return (
                <div
                  key={el.id}
                  className="border-l-4 py-3 grid grid-cols-[4fr_1fr] bg-aqua mb-5"
                >
                  <div className="pl-5 flex flex-col items-start justify-between ">
                    <h1>{el.comment}</h1>
                    <input
                      className="bg-[#345DA7] hover:bg-red-800  py-2 px-3"
                      type="button"
                      onClick={() => deleteComment(el.id)}
                      value="Delete"
                    />
                  </div>
                  <div>
                    <img
                      className="w-1/2 rounded-full"
                      src={el.madeBy.avatarURL}
                      alt=""
                    />
                    <h1>
                      {el.madeBy.firstName} {el.madeBy.lastName}
                    </h1>
                    <small>{el.createdAt}</small>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No comments yet</p>
          )}
        </div>
      </section>
      {/* comments section ends */}

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
    </div>
  );
};

export default BookDetails;
