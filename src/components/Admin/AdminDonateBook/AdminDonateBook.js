import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const AdminDonateBook = ({ item }) => {
  const { author, title, description, image, tags, id } = item;

  const { user } = useContext(AuthContext);

  const addDonatedBookToSystem = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/donate-book/${id}`,
        {
          author,
          title,
          description,
          image,
          tags,
        },
        {
          headers: {
            Authorization: user.user.accessToken,
          },
        }
      );
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <main className="space-y-5">
      <div className="space-y-5">
        <section>
          <img src={image} alt="" />
        </section>
        <section className="space-y-3">
          <div>
            <h1>{title}</h1>
            <h1>{tags}</h1>
            <h1>{author}</h1>
          </div>
          <h1>{description}</h1>
        </section>
      </div>
      <div>
        <button
          onClick={addDonatedBookToSystem}
          className="bg-aqua py-2 px-3 rounded "
        >
          Add to the system
        </button>
      </div>
    </main>
  );
};

export default AdminDonateBook;

// http://localhost:5000/api/v1/donate-book
