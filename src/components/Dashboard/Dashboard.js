import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Dashboard = () => {
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

  return (
    <main className="border grid grid-cols-[2fr_2fr]">
      <section className="flex space-x-5 items-center ">
        <div className="w-2/4">
          <img src={avatarURL} alt="" srcset="" />
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
      <section className="">
        <div>
          <p>
            If you want to donate book, click{' '}
            <Link to={`donate-book`}>here</Link>{' '}
          </p>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
