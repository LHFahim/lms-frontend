import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import Navbar from '../../Navbar/Navbar';
import AdminJob from './AdminJob';
import Completion from './Completion';

const AdminJobs = () => {
  let jobRequest = useLoaderData();
  jobRequest = jobRequest.data;

  const { user } = useContext(AuthContext);
  const isAdmin = user.user.user.panelType;

  const [completion, setCompletion] = useState([]);

  const fetchJobsRequestForCompletion = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/admin-jobs/completion/requests`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: user.user.accessToken,
          },
        }
      );

      if (response.data.success) setCompletion(response.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <main className="my-10 shadow-2xl">
      <Navbar />

      {isAdmin ? (
        <section className="mt-10 ">
          <h1 className="inline ml-10">In order to create a job, </h1>
          <Link to={`/admin/create-job`}>click here</Link>
          <section className="grid grid-cols-2 mt-10 ml-3">
            <div>
              <h1 className="uppercase font-black text-xl text-center">
                Accept Job Requests
              </h1>
              <article className="grid grid-cols-2 p-5 ">
                {jobRequest.map(jr => (
                  <AdminJob key={jr.id} jobRequest={jr}></AdminJob>
                ))}
              </article>
            </div>
            <div>
              <h1 className="uppercase font-black text-xl text-center">
                Mark jobs done
              </h1>
              <button onClick={fetchJobsRequestForCompletion}>Refresh</button>

              <article className="grid grid-cols-2 p-5 ">
                {completion.map(item => (
                  <Completion key={item.id} jobRequest={item}></Completion>
                ))}
              </article>
            </div>
          </section>
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

export default AdminJobs;
