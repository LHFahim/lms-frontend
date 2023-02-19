import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import BookCategories from '../BookCategories/BookCategories';
import Wallet from '../Wallet/Wallet';

const Leftbar = () => {
  const { wallet, setWallet, user } = useContext(AuthContext);

  return (
    <main>
      <section>
        <Wallet />
      </section>
      <section>
        <div>
          <BookCategories />
        </div>
      </section>
    </main>
  );
};

export default Leftbar;
