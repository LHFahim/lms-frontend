import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import BookCategories from '../BookCategories/BookCategories';

const Leftbar = () => {
  const { wallet, setWallet, user } = useContext(AuthContext);

  return (
    <main>
      <section>{/* wallet initiation */}</section>
      <section>
        <div>
          <BookCategories />
        </div>
      </section>
    </main>
  );
};

export default Leftbar;
