import axios from 'axios';
import React, { useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const Completion = ({ jobRequest }) => {
  const { user } = useContext(AuthContext);

  const { title, description, reward } = jobRequest.job;
  const { firstName, lastName, email } = jobRequest.requester;

  const handleCompleteJob = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/admin-jobs/${jobRequest.id}/complete`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: user.user.accessToken,
          },
        }
      );

      if (response.data.success) jobCompletedToast();
    } catch (error) {
      console.log(error.response);
    }
  };

  const jobCompletedToast = () =>
    toast('Job has been marked and balance transferred successfully!', {
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
      <div className="p-3 rounded-lg hover:scale-105 duration-300 hover:shadow-2xl ">
        <div className=" space-y-3">
          <div className="border border-b-2  mx-auto border-orange-500"></div>
          <div>
            <article className="font-semibold">
              <h1 className="font-black uppercase inline">Job title:</h1>{' '}
              {title}
            </article>
            <h1 className="italic ">{description}</h1>
            <article className="italic mb-5">
              {' '}
              <h1 className="font-black uppercase inline">Reward:</h1> {reward}{' '}
              POINTS
            </article>
            <article className="italic">
              Applied by {firstName} {lastName}
              <h1 className="font-black uppercase inline"></h1> {email}
            </article>
          </div>
          <div className="border border-b-2 border-orange-500"></div>
          <div className="flex justify-between items-center">
            <button
              onClick={() => handleCompleteJob()}
              className="text-orange-500 font-black"
            >
              Mark as done
            </button>
          </div>
        </div>
      </div>
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

export default Completion;
