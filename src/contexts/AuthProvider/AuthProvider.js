import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();
const userData = JSON.parse(localStorage.getItem('user')) || {};

const initialState = {
  loading: false,
  user: userData,
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(initialState);
  const [wallet, setWallet] = useState(false);

  // useEffect(() => {
  //   if (!user.user) {
  //     setUser(prev => {
  //       return {
  //         ...prev,
  //         userData,
  //       };
  //     });
  //   }
  // }, []);

  const authInfo = {
    user,
    setUser,
    wallet,
    setWallet,
  };

  return (
    <AuthContext.Provider value={authInfo}> {children} </AuthContext.Provider>
  );
};

export default AuthProvider;
