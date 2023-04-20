import axios from 'axios';
import React, { useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import Navbar from '../../Navbar/Navbar';

const AdminCreateJob = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = user.user.user.panelType;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [reward, setReward] = useState(0);

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = event => {
    setDescription(event.target.value);
  };

  const handleRewardChange = event => {
    setReward(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    console.log('Submitted:', title, description, reward);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/admin-jobs`,
        {
          title,
          description,
          reward,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: user.user.accessToken,
          },
        }
      );

      if (response.data.success) createJobToast();
    } catch (error) {
      console.log(error.response);
    }
  };

  const createJobToast = () =>
    toast('Job has been created successfully!', {
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
    <main className="my-10 ">
      <Navbar />

      {isAdmin ? (
        <section className="flex h-[25rem] justify-center items-center ">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-[1fr_2fr] items-center">
              <label htmlFor="title">Title:</label>
              <input
                className="px-3 py-1 rounded-md bg-aqua"
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div className="grid grid-cols-[1fr_2fr] items-center">
              <label htmlFor="description">Description:</label>
              <textarea
                className="px-3 py-1 rounded-md bg-aqua"
                type="text"
                id="description"
                name="description"
                value={description}
                onChange={handleDescriptionChange}
                cols="15"
                rows="5"
              ></textarea>
            </div>
            <div className="grid grid-cols-[1fr_2fr] items-center">
              <label htmlFor="reward">Reward:</label>
              <input
                className="px-3 py-1 rounded-md bg-aqua"
                type="number"
                id="reward"
                name="reward"
                value={reward}
                onChange={handleRewardChange}
              />
            </div>
            <button className="border px-3 py-2" type="submit">
              Submit
            </button>
          </form>
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
        </section>
      ) : (
        <>
          <h1 className="text-center mt-10 text-red-500">
            Sorry, this is only for admin!
          </h1>
        </>
      )}
    </main>
  );
};

export default AdminCreateJob;
