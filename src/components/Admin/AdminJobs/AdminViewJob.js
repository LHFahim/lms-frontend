import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const AdminViewJob = ({ job }) => {
  console.log(job);
  const { user } = useContext(AuthContext);

  const { title, description, isAvailable, createdAt, id, reward } = job;

  const tempDate = new Date(createdAt);

  const finalDate =
    tempDate.getFullYear() +
    '-' +
    (tempDate.getMonth() + 1) +
    '-' +
    tempDate.getDate();

  // handle book delete
  const handleJobDelete = async id => {
    console.log('id', id);
    try {
      const res = axios.delete(
        `http://localhost:5000/api/v1/admin-jobs/${id}`,
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
    <div className="grid grid-cols-6 mb-10 p-5 border-b-2 border-orange-500 hover:bg-aqua">
      <h1>{title}</h1>

      <h1>{description}</h1>
      <h1>{reward}</h1>

      <h1>{isAvailable ? <p>Yes</p> : <p>No</p>}</h1>

      <h1>{finalDate}</h1>

      <div>
        {' '}
        <button onClick={() => handleJobDelete(id)}>Delete</button>{' '}
        {/* <Link to={`/admin-books/${id}`}>Modify</Link> */}
      </div>
    </div>
  );
};

export default AdminViewJob;
