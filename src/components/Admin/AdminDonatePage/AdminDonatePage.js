import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import AdminDonateBook from '../AdminDonateBook/AdminDonateBook';

const AdminDonatePage = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = user.user.user.panelType;

  const [donatedBooks, setDonatedBooks] = useState([]);

  const fetchDonatedBooks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/donate-book`,
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
  fetchDonatedBooks();

  // console.log(donatedBooks);

  const { author, title, description, image, tags } = donatedBooks;

  // console.log(author);

  return (
    <main>
      {isAdmin === 'ADMIN' ? (
        <main className="grid grid-cols-4">
          {donatedBooks.map(item => (
            <AdminDonateBook key={item.id} item={item}></AdminDonateBook>
          ))}
        </main>
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

export default AdminDonatePage;
