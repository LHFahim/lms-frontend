import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/AuthProvider/AuthProvider';
import Nav from '../Nav/Nav';

const Navbar = () => {
  return (
    <main className="grid grid-cols-[2fr,3fr] items-center">
      <section className="">
        <header className="w-10/12 mx-auto bg-aqua">
          <div className="flex justify-center mt-10 py-5 shadow-2xl">
            <h1 className="text-2xl font-black ">
              Online Library Management System
            </h1>
          </div>
        </header>
      </section>
      <section>
        <Nav />
      </section>
    </main>
  );
};

export default Navbar;
{
}
