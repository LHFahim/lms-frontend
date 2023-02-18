import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Leftbar from '../components/Leftbar/Leftbar';
import Navbar from '../components/Navbar/Navbar';
import './Main.css';

const Main = () => {
  return (
    <div>
      <Navbar></Navbar>
      <section className="w-3/4 mx-auto mt-20 shadow-2xl p-10 border rounded-3xl">
        <div className="grid grid-cols-[1fr_3fr]">
          <Leftbar className="" />
          <Outlet className=""></Outlet>
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
};

export default Main;
