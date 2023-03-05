import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import ApproveRequest from '../ApproveRequest/ApproveRequest';

const ApproveBorrowRequest = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = user.user.user.panelType;

  const [borrowRequests, setBorrowRequests] = useState([]);

  const fetchBorrowRequests = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/borrow-request-books`,
        {
          headers: {
            Authorization: user.user.accessToken,
          },
        }
      );

      if (response.data.success) {
        setBorrowRequests(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  fetchBorrowRequests();

  // console.log(borrowRequests);

  return (
    <main>
      {isAdmin === 'ADMIN' ? (
        <div className="w-6/12 mx-auto shadow-2xl">
          {borrowRequests.map(request => (
            <ApproveRequest
              key={request.id}
              book={request.book}
              requester={request.requester}
            ></ApproveRequest>
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

export default ApproveBorrowRequest;
