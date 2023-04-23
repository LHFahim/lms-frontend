import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import Navbar from '../../Navbar/Navbar';

const AdminBalanceIndex = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = user.user.user.panelType;

  // search query use state
  const [query, setQuery] = useState('');
  const [searchedData, setSearchedData] = useState([]);

  useEffect(() => {
    const searchQuery = async () => {
      const localStorageUser = JSON.parse(localStorage.getItem('user'));

      const searchedData = await axios.get(
        `http://localhost:5000/api/v1/admin-wallet?email=${query}`,
        { headers: { Authorization: localStorageUser.accessToken } }
      );

      if (searchedData.data.success) {
        setSearchedData(searchedData.data.data);
      }
    };

    // if search input bar has no text,
    // it clears previously searched book data
    if (!query.length) setSearchedData([]);

    // to prevent from infinite api call
    if (query.length > 0) searchQuery();
  }, [query]);

  const handleOperateWallet = async (event, w) => {
    event.preventDefault();
    const form = event.target;
    const points = form.add_points.value;

    // console.log(points, w.owner.email, w.owner.wallet);

    try {
      const res = await axios.patch(
        `http://localhost:5000/api/v1/admin-wallet/${w.owner.wallet}/recharge`,
        {
          balance: points,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: user.user.accessToken,
          },
        }
      );

      if (res.data.success) {
        // passwordChangeToast();
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <main className="my-10 shadow-2xl">
      <Navbar />

      {isAdmin ? (
        <section className="mt-10 ">
          <section className="w-11/12 mx-auto space-y-4">
            <div>
              <div className="text-center">
                <h1>Search wallet by email</h1>
              </div>
              <div className="flex justify-center">
                <input
                  type="text"
                  className="px-10 py-2 bg-aqua focus:outline-none"
                  onChange={event => setQuery(event.target.value)}
                />
              </div>
            </div>
            {/* result */}
            <div className="">
              {searchedData.map(w => {
                return (
                  <div
                    className="border border-orange-500  text-center w-11/12 mx-auto py-2 hover:bg-zinc-500 hover:text-zinc-800 text-lg hover:font-extrabold"
                    key={w.owner.wallet}
                  >
                    <h1>
                      {w.owner.firstName} {w.owner.lastName}
                    </h1>

                    <h1>{w.owner.email}</h1>
                    <h1>
                      {w.walletDoc.balance} {w.walletDoc.currency}
                    </h1>
                    {/* wallet operation */}
                    <section className="">
                      {/* The button to open modal */}
                      <label
                        htmlFor="my-modal-4"
                        className="uppercase text-white text-sm hover:text-orange-500  "
                      >
                        Operate
                      </label>

                      {/* Put this part before </body> tag */}
                      <input
                        type="checkbox"
                        id="my-modal-4"
                        className="modal-toggle"
                      />
                      <label
                        htmlFor="my-modal-4"
                        className="modal cursor-pointer"
                      >
                        <label className="modal-box relative" htmlFor="">
                          <form
                            onSubmit={event => handleOperateWallet(event, w)}
                            className="space-y-3"
                          >
                            <div className="grid grid-cols-[1fr_2fr]">
                              <label className="" htmlFor="add_points">
                                Points
                              </label>
                              <input
                                type="text"
                                name="add_points"
                                id="add_points"
                                className="border border-orange-500 rounded-md"
                              />
                            </div>

                            <button className="bg-zinc-800 text-white py-2 text-xl w-2/12 rounded-md">
                              Add
                            </button>
                          </form>
                        </label>
                      </label>
                    </section>
                  </div>
                );
              })}
            </div>
          </section>
        </section>
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

export default AdminBalanceIndex;
