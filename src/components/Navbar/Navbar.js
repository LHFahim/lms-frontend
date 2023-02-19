import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/AuthProvider/AuthProvider';

const Navbar = () => {
  return (
    <header className="w-4/12 mx-auto bg-zinc-800">
      <div className="flex justify-center mt-10 py-5 shadow-2xl">
        <h1 className="text-3xl  font-black">
          Online Library Management System
        </h1>
      </div>
    </header>
  );
};

export default Navbar;
