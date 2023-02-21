import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Leftbar from '../components/Leftbar/Leftbar';
import Navbar from '../components/Navbar/Navbar';
import Rightbar from '../components/Rightbar/Rightbar';
import './Main.css';

const Main = () => {
  return (
    <div className="w-11/12 mx-auto mr-0">
      <Navbar></Navbar>
      <div className="mt-10 flex">
        <section className="w-3/4  shadow-2xl p-10 border rounded-3xl">
          <div className="grid grid-cols-[1fr_3fr]">
            <Leftbar className="" />
            <Outlet className=""></Outlet>
          </div>
        </section>
        <Rightbar />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Main;
