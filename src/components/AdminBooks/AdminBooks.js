import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import AdminBookItem from '../AdminBookItem/AdminBookItem';
import '../AdminBookItem/adminBookItem.css';
import Navbar from '../Navbar/Navbar';

const AdminBooks = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = user.user.user.panelType;

  const [books, setBooks] = useState([]);
  const date = new Date().getDate();

  const [value, setValue] = useState();

  // query
  const handleQueryChange = async e => {
    setValue(e.target.value);
  };

  const handleQuery = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/admin-books?sortBy=${value}`,
        {
          headers: {
            Authorization: user.user.accessToken,
          },
        }
      );

      if (response.data.success) {
        setBooks(response.data.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <Navbar />
      <section className="p-5 ">
        <div>
          <label htmlFor="query">Choose a query: </label>
          <select
            value={value}
            onChange={handleQueryChange}
            name="query"
            id="query"
          >
            <option value="asc">Ascending</option>
            <option value="dsc">Descending</option>
            <option value="quantity">Quantity</option>
            <option value="createdAt">Create date</option>
          </select>
          <button onClick={handleQuery}>Filter</button>
        </div>
      </section>
      {isAdmin === 'ADMIN' ? (
        <div className="shadow-2xl ">
          <div className="wrapper p-5 font-black text-2xl">
            <h1>Image</h1>
            <h1>Title</h1>
            <h1>Author</h1>
            <h1>Description</h1>
            <h1>Tags</h1>
            <h1>Quantity</h1>
            <h1>Shelf</h1>
            <h1>Available</h1>
            <h1>Created at</h1>
            {/* <h1>Updated at</h1> */}
          </div>
          {books.map(book => (
            <AdminBookItem key={book.id} book={book}></AdminBookItem>
          ))}
        </div>
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

export default AdminBooks;
