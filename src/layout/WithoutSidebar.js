import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Leftbar from '../components/Leftbar/Leftbar';
import Navbar from '../components/Navbar/Navbar';
import Rightbar from '../components/Rightbar/Rightbar';
import './Main.css';

const WithoutSidebar = () => {
  return (
    <>
      <div className="w-11/12 mx-auto mr-0 mb-10">
        <Navbar></Navbar>
        <div className="mt-10 flex">
          <section className="shadow-2xl p-10  rounded-3xl">
            <div className="">
              {/* grid grid-cols-[2fr_5fr] */}
              <Outlet className=""></Outlet>
            </div>
          </section>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default WithoutSidebar;
