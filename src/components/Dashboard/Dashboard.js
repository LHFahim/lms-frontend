import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [toastMessage, setToastMessage] = useState('');

  let data = useLoaderData();
  data = data.data;

  const {
    firstName,
    lastName,
    createdAt,
    phoneNumber,
    email,
    shortBio,
    avatarURL,
  } = data;

  const tempDate = new Date(createdAt);
  const finalDate =
    tempDate.getFullYear() +
    '-' +
    (tempDate.getMonth() + 1) +
    '-' +
    tempDate.getDate();

  // extend borrow limit
  // const extendBorrowLimit = async () => {
  //   try {
  //     const response = await axios.patch(
  //       `http://localhost:5000/api/v1/borrow-books/extend-limit`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: user.user.accessToken,
  //         },
  //       }
  //     );

  //     limitExtendToast();
  //   } catch (error) {
  //     console.log(error.response);
  //     // setToastMessage(error.response.data.message);
  //     limitErrorToast();
  //   }
  // };

  // toasts
  const limitErrorToast = () =>
    toast('Borrow limit is already 5', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  const limitExtendToast = () =>
    toast('Borrow limit has been extended to 5', {
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
    <main className="border grid grid-cols-[2fr_2fr]">
      <section className="flex space-x-5 items-center ">
        <div className="w-2/4">
          <img src={avatarURL} alt="" />
        </div>
        <div className=" flex flex-col space-y-2">
          <article className="text-xl font-bold">
            <label htmlFor="name">Name: </label>
            <h1 className="inline" id="name">
              {firstName} {lastName}
            </h1>
          </article>
          <p className="font-bold">Bio: {shortBio}</p>
          <p className="font-bold">Email: {email}</p>
          <p className="font-bold">Phone: {phoneNumber}</p>
          <p className="font-bold">Joined: {finalDate}</p>
        </div>
      </section>
      <section className="space-y-3">
        <div>
          <p>
            If you want to donate book, click{' '}
            <Link to={`donate-book`}>here</Link>{' '}
          </p>
        </div>
        <div>
          <h1>
            Your default borrow limit is 3. The system will automatically
            upgrade your borrow limit if your balance points reach 50!
          </h1>
          {/* <h1> If you want to increase borrow limit, click</h1>
          <button className="bg-aqua py-2 px-3" onClick={extendBorrowLimit}>
            here
          </button> */}
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

export default Dashboard;
