import axios from 'axios';
import React, { useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Job = ({ job }) => {
  const { title, description, reward, isAvailable, id } = job;

  const { user } = useContext(AuthContext);

  const handleJobApply = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/jobs/apply`,
        {
          job: id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: user.user.accessToken,
          },
        }
      );

      if (response.data.success) jobApplyToast();
    } catch (error) {
      console.log(error.response);
      alreadyAppliedToast();
    }
  };

  const jobApplyToast = () =>
    toast('You have applied for this job successfully!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  const alreadyAppliedToast = () =>
    toast('You have applied for this job already!', {
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
      <div className="p-3  rounded-lg hover:scale-105 duration-300 hover:shadow-2xl ">
        <div className="mt-10 space-y-3">
          <div className="border border-b-2  mx-auto border-orange-500"></div>
          <div>
            <article className="font-semibold">
              <h1 className="font-black uppercase inline">Job title:</h1>{' '}
              {title}
            </article>
            <h1 className="italic mb-5">{description}</h1>
            <article className="italic">
              {' '}
              <h1 className="font-black uppercase inline">Reward:</h1> {reward}{' '}
              POINTS
            </article>
            <article className="italic">
              {' '}
              <h1 className="font-black uppercase inline">
                Availability:
              </h1>{' '}
              {isAvailable ? 'Yes' : 'No'}
            </article>
          </div>
          <div className="border border-b-2 border-orange-500"></div>
          <div className="flex justify-between items-center">
            <button
              onClick={() => handleJobApply()}
              className="text-orange-500 font-black"
            >
              Apply
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

export default Job;
