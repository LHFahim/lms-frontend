import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import AdminDonateBook from '../AdminDonateBook/AdminDonateBook';
import AdminListDonatedBooksCard from './AdminListDonatedBooksCard';

const AdminListDonatedBooks = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = user.user.user.panelType;

  const [donatedBooks, setDonatedBooks] = useState([]);

  const fetchDonatedBooks = async event => {
    event.preventDefault();

    const form = event.target;
    const search = form.search.value;

    console.log(value);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/donate-book/list?page=1&pageSize=20&search=${search}&sortBy=createdAt&sort=${value}`,
        {
          headers: {
            Authorization: user.user.accessToken,
          },
        }
      );

      if (response.data.success) {
        setDonatedBooks(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // fetchDonatedBooks();

  // console.log(donatedBooks);

  const { author, title, description, image, tags } = donatedBooks;

  // sort query
  const [value, setValue] = useState();
  const handleSortQueryChange = async e => {
    setValue(e.target.value);
  };

  // sortBy query
  const [sortByValue, setSortByValue] = useState();
  const handleSortByQueryChange = async e => {
    setSortByValue(e.target.value);
  };

  return (
    <main>
      {isAdmin === 'ADMIN' ? (
        <div>
          <section className=" mx-auto mb-10 ">
            <h1 className="uppercase text-center font-black text-2xl mb-10">
              Filter donated books
            </h1>
            <form onSubmit={fetchDonatedBooks} className="flex space-x-5">
              <input type="text" name="search" className="bg-aqua py-1 px-3" />
              {/* sort query */}
              <div>
                <select
                  value={value}
                  onChange={handleSortQueryChange}
                  name="query"
                  id="query"
                  className="py-3 px-1 bg-aqua"
                >
                  <option value="">Select</option>
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
              {/* sortBy query */}
              {/* <div>
                <select
                  value={sortByValue}
                  onChange={handleSortByQueryChange}
                  name="query"
                  id="query"
                  className="py-3 px-1 bg-aqua"
                >
                  <option value="">Select</option>
                  <option value="quantity">Quantity</option>
                  <option value="createdAt">Create date</option>
                </select>
              </div> */}
              <div className="flex justify-end">
                <button className="bg-zinc-800 text-white py-2 px-3 text-xl  rounded-md">
                  Submit
                </button>
              </div>
            </form>
          </section>
          <main className="">
            <div className="wrapper p-5 font-black text-2xl">
              <h1>Image</h1>
              <h1>Title</h1>
              <h1>Author</h1>
              <h1>Description</h1>
              <h1>Tags</h1>
              <h1>Accepted</h1>
              <h1>Created at</h1>
            </div>
            {donatedBooks.map(item => (
              <AdminListDonatedBooksCard
                key={item.id}
                item={item}
              ></AdminListDonatedBooksCard>
            ))}
          </main>
        </div>
      ) : (
        <div className="mb-52">
          <h1 className="text-center mt-10 text-red-500">
            Sorry, this is only for admin!
          </h1>
        </div>
      )}
    </main>
  );
};

export default AdminListDonatedBooks;
