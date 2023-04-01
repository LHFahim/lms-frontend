import axios from 'axios';
import React, { useContext, useState } from 'react';
import Pdf from 'react-to-pdf';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import Navbar from '../../Navbar/Navbar';
import AdminBorrowBookItem from '../AdminBookItem/AdminBorrowBookItem';

const AdminBorrowedList = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const { user } = useContext(AuthContext);
  const isAdmin = user.user.user.panelType;

  const handleQuery = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/admin-borrow-books`,
        {
          headers: {
            Authorization: user.user.accessToken,
          },
        }
      );

      if (response.data.success) {
        setBorrowedBooks(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleQuery();

  const ref = React.createRef();

  return (
    <main>
      <Pdf targetRef={ref} filename="books.pdf">
        {({ toPdf }) => <button onClick={toPdf}>Generate PDF</button>}
      </Pdf>
      <Navbar />
      {/* <section className="p-5 ">
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
        <div>
          <h1>
            See borrowed book list from <Link to={`borrowed-list`}>here</Link>{' '}
          </h1>
        </div>
      </section> */}
      {isAdmin === 'ADMIN' ? (
        <div ref={ref} className="shadow-2xl ">
          <div className="wrapper p-5 font-black text-2xl">
            <h1>Image</h1>
            <h1>Title</h1>
            <h1>Author</h1>
            <h1>Description</h1>
            <h1>Tags</h1>
            <h1>Borrower</h1>
            <h1>Issued on</h1>
            <h1>Return on</h1>

            {/* <h1>Updated at</h1> */}
          </div>
          {borrowedBooks.map(book => (
            <AdminBorrowBookItem
              key={book.id}
              book={book}
            ></AdminBorrowBookItem>
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

export default AdminBorrowedList;
