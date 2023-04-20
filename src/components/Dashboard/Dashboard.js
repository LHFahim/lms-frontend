import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
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

  const sendResetEmail = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/auth/reset-password/send`,
        { email: user.user.user.email },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: user.user.accessToken,
          },
        }
      );

      if (res.data.success) OtpToast();
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleChangePassword = async event => {
    event.preventDefault();

    const form = event.target;
    const newPassword = form.new_password.value;
    const confirmNewPassword = form.confirm_password.value;
    const code = form.otp.value;

    console.log(newPassword, confirmNewPassword, code);

    try {
      const res = await axios.patch(
        `http://localhost:5000/api/v1/auth/reset-password`,
        {
          email: user.user.user.email,
          newPassword,
          confirmNewPassword,
          code,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: user.user.accessToken,
          },
        }
      );

      if (res.data.success) {
        passwordChangeToast();
      }
    } catch (error) {
      console.log(error.response);
    }
  };

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

  const OtpToast = () =>
    toast('An OTP has been sent to your email!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  const passwordChangeToast = () =>
    toast('Password has been changed successfully!', {
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
    <main className=" grid grid-cols-[2fr_2fr]">
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

        {/* borrow prompt & reset pass */}
        <div className="space-y-3">
          <h1 className="border border-orange-500 hover:bg-aqua p-2 rounded">
            Your default borrow limit is 3. The system will automatically
            upgrade your borrow limit if your balance points reach 50!
          </h1>
          <h1>
            If you forgot your password, click{' '}
            <button
              onClick={() => sendResetEmail()}
              className="hover:font-black px-2 bg-aqua rounded"
            >
              here
            </button>{' '}
            to get reset email! Please logout and login again after reseting
            password.
          </h1>

          {/* password change */}
          <section className="w-4/6">
            {/* The button to open modal */}
            <label
              htmlFor="my-modal-4"
              className="uppercase bg-zinc-800 text-white py-2 text-xl w-2/12 rounded-md"
            >
              Reset Password
            </label>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <label htmlFor="my-modal-4" className="modal cursor-pointer">
              <label className="modal-box relative" htmlFor="">
                <form onSubmit={handleChangePassword} className="space-y-3">
                  <div className="grid grid-cols-[1fr_2fr]">
                    <label className="" htmlFor="new_password">
                      New password
                    </label>
                    <input
                      type="text"
                      name="new_password"
                      id="new_password"
                      className="border border-orange-500 rounded-md"
                    />
                  </div>
                  <div className="grid grid-cols-[1fr_2fr]">
                    <label className="" htmlFor="confirm_password">
                      Confirm password
                    </label>
                    <input
                      type="text"
                      name="confirm_password"
                      id="confirm_password"
                      className="border border-orange-500 rounded-md"
                    />
                  </div>
                  <div className="grid grid-cols-[1fr_2fr]">
                    <label className="" htmlFor="otp">
                      OTP
                    </label>
                    <input
                      type="text"
                      name="otp"
                      id="otp"
                      className="border border-orange-500 rounded-md"
                    />
                  </div>
                  <button className="bg-zinc-800 text-white py-2 text-xl w-2/12 rounded-md">
                    Submit
                  </button>
                </form>
              </label>
            </label>
          </section>
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
