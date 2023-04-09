import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Job from './Job';

const Jobs = () => {
  let jobs = useLoaderData();
  jobs = jobs.data.data;

  return (
    <main className="my-10 shadow-2xl">
      <section className="grid grid-cols-2 p-5 gap-5">
        {jobs.map(job => (
          <Job key={job.id} job={job}></Job>
        ))}
      </section>
    </main>
  );
};

export default Jobs;
