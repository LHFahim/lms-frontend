import React from 'react';
import { FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <main className="bg-zinc-900 py-10 px-5 ">
      <section className="flex justify-between ">
        <div className="">
          <h1 className="text-2xl text-orange-500">
            Online Library Management System
          </h1>
          <small className="italic text-base">
            Our service, your satisfaction!
          </small>
        </div>
        <div className="border-l-4 border-orange-500"></div>

        {/* admin section begins */}
        <div>
          <h1 className="text-center mb-5 text-orange-500 font-black tracking-widest">
            Administrator section
          </h1>
          <div className="flex space-x-20">
            {/* first */}
            <ul>
              <li>
                <Link to={`books`} className="hover:text-orange-500">
                  Books
                </Link>
              </li>
              <li>
                <Link to={`add-book`} className="hover:text-orange-500">
                  Add book
                </Link>
              </li>
              <li>
                <Link
                  to={`approve-borrow-request`}
                  className="hover:text-orange-500"
                >
                  Approve request
                </Link>
              </li>
              <li>
                <Link
                  to={`accept-return-book`}
                  className="hover:text-orange-500"
                >
                  Accept return
                </Link>
              </li>
            </ul>
            {/* second */}
            <ul>
              <li>
                <Link
                  to={`profile/donated-books`}
                  className="hover:text-orange-500"
                >
                  Approve donated books
                </Link>
              </li>
              <li>
                <Link
                  to={`donated-books-list`}
                  className="hover:text-orange-500"
                >
                  Donated books
                </Link>
              </li>
              <li>
                <Link
                  to={`/admin/job-requests`}
                  className="hover:text-orange-500"
                >
                  Jobs
                </Link>
              </li>
              <li>
                <Link to={`/admin/balance`} className="hover:text-orange-500">
                  Balance
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* admin section ends */}
      </section>
    </main>
  );
};

export default Footer;

{
  /* <section>
<div className="mt-10 text-center">
  Developed with ❤ by LH Fahim{' '}
  <a
    target="_blank"
    href="https://twitter.com/LHFahim_"
    rel="noreferrer"
  >
    {' '}
    <FaTwitter className="inline" />{' '}
  </a>{' '}
</div>
</section> */
}
