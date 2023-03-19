import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const DonateBook = () => {
  const { user } = useContext(AuthContext);

  const handleDonateBook = async event => {
    event.preventDefault();

    const form = event.target;
    const title = form.book_name.value;
    const author = form.author_name.value;

    const image = form.image_link.value;
    let tags = form.tags.value;

    tags = tags.split(',');
    const description = form.description.value;

    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/donate-book/donate`,
        {
          title,
          author,
          image,
          tags,
          description,
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
    <main>
      <div className="w-6/12 mx-auto shadow-2xl">
        <section className="add-book m-10">
          <header>
            <div className="flex justify-center py-10">
              <h1 className="text-2xl font-bold">Donate a book</h1>
            </div>
          </header>
          <main>
            <form
              onSubmit={handleDonateBook}
              className="flex flex-col space-y-10 pb-10"
            >
              <div className="grid grid-cols-2 gap-x-28 gap-y-8">
                <div className="grid grid-cols-[1fr_2fr]">
                  <label className="" htmlFor="book_name">
                    Book name
                  </label>
                  <input
                    type="text"
                    name="book_name"
                    id="book_name"
                    className="border border-orange-500 rounded-md"
                    required
                  />
                </div>

                <div className="grid grid-cols-[1fr_2fr]">
                  <label htmlFor="author_name" className="">
                    Author name
                  </label>
                  <input
                    type="text"
                    name="author_name"
                    id="author_name"
                    className="border border-orange-500 rounded-md"
                    required
                  />
                </div>

                <div className="grid grid-cols-[1fr_2fr]">
                  <label htmlFor="image_link" className="">
                    Image link
                  </label>
                  <input
                    type="text"
                    name="image_link"
                    id="image_link"
                    className="border border-orange-500 rounded-md"
                    required
                  />
                </div>

                <div className="grid grid-cols-[1fr_2fr]">
                  <label htmlFor="tags" className="">
                    Tags
                  </label>
                  <input
                    type="text"
                    name="tags"
                    id="tags"
                    className="border border-orange-500 rounded-md"
                    required
                  />
                </div>

                <div className="grid grid-cols-[1fr_2fr]">
                  <label htmlFor="description" className="">
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    className="border border-orange-500 rounded-md"
                    cols="50"
                    rows="10"
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="bg-zinc-800 text-white py-2 text-xl w-2/12 rounded-md">
                  Submit
                </button>
              </div>
            </form>
          </main>
        </section>
      </div>
    </main>
  );
};

export default DonateBook;
