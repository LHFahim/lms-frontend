import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import Navbar from '../../Navbar/Navbar';
import AdminViewJob from './AdminViewJob';

const AdminViewJobs = () => {
  let data = useLoaderData();
  data = data.data;

  const { user } = useContext(AuthContext);
  const isAdmin = user.user.user.panelType;

  return (
    <main className="my-10 shadow-2xl">
      <Navbar />

      {isAdmin ? (
        <section className="mt-10 ">
          <div className="grid grid-cols-6 p-5 font-black text-2xl">
            <h1>Title</h1>
            <h1>Description</h1>
            <h1>Reward</h1>
            <h1>Available</h1>
            <h1>Created at</h1>
            <h1>Actions</h1>
          </div>
          {data.map(job => (
            <AdminViewJob key={job.id} job={job}></AdminViewJob>
          ))}
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

export default AdminViewJobs;
