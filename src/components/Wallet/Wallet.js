import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Wallet = () => {
  const [wallet, setWallet] = useState();
  const { user } = useContext(AuthContext);

  let localStorageUser = localStorage.getItem('user');
  localStorageUser = JSON.parse(localStorageUser);

  const initializeWallet = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/wallet`,
        {},
        { headers: { Authorization: user.user.accessToken } }
      );
      window.location.reload(true);
    } catch (e) {
      console.log(e);
    }
  };

  const handleWallet = async () => {
    let updatedUserResponse;
    try {
      updatedUserResponse = await axios.get(
        `http://localhost:5000/api/v1/auth/me`,

        { headers: { Authorization: localStorageUser.accessToken } }
      );
    } catch (error) {
      console.log(error);
    }

    try {
      const walletId = updatedUserResponse.data.data.walletId.id;

      const walletResponse = await axios.get(
        `http://localhost:5000/api/v1/wallet/${walletId}`,
        { headers: { Authorization: user?.user?.accessToken } }
      );
      if (walletResponse.data.success) {
        setWallet(walletResponse.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleWallet();
  return (
    <div>
      <div className="w-3/4 bg-aqua text-white py-2 flex flex-col items-center">
        <h3 className="text-lg">My wallet</h3>
        {wallet ? (
          <p>
            Balance: {wallet.balance} {wallet.currency}{' '}
          </p>
        ) : (
          <button onClick={initializeWallet}>Initiate wallet here</button>
        )}
      </div>
    </div>
  );
};

export default Wallet;
