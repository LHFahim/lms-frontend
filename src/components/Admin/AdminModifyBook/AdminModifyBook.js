import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import Navbar from '../../Navbar/Navbar';

const AdminModifyBook = () => {
  let result = useLoaderData();
  const { user } = useContext(AuthContext);
  const isAdmin = user.user.user.panelType;

  if (result.success) {
    result = result.data;
  }

  console.log(
    '🚀 ~ file: AdminModifyBook.js:6 ~ AdminModifyBook ~ result:',
    result
  );

  const { title, author, quantity, image, description, shelf, tags, id } =
    result;

  const handleModifyBook = async event => {
    event.preventDefault();

    const form = event.target;
    const title = form.book_name.value;
    const author = form.author_name.value;
    const quantity = parseInt(form.quantity.value);

    const shelf = parseInt(form.shelf.value);
    const image = form.image_link.value;
    let tags = form.tags.value;

    tags = tags.split(',');
    const description = form.description.value;

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/admin-books/${id}`,
        {
          title,
          author,
          quantity,
          image,
          shelf,
          tags,
          description,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: user.user.accessToken,
          },
        }
      );
      console.log(
        '🚀 ~ file: AddBook.js:50 ~ handleAddBook ~ response:',
        response
      );
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div>
      <main>
        <Navbar />
        {isAdmin === 'ADMIN' ? (
          <div className="w-6/12 mx-auto shadow-2xl">
            <section className="add-book m-10">
              <header>
                <div className="flex justify-center py-10">
                  <h1 className="text-2xl font-bold">Add a new book</h1>
                </div>
              </header>
              <main>
                <form
                  onSubmit={handleModifyBook}
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
                        defaultValue={title}
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
                        defaultValue={author}
                      />
                    </div>

                    <div className="grid grid-cols-[1fr_2fr]">
                      <label htmlFor="quantity" className="">
                        Quantity
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        id="quantity"
                        className="border border-orange-500 rounded-md"
                        defaultValue={quantity}
                      />
                    </div>

                    <div className="grid grid-cols-[1fr_2fr]">
                      <label htmlFor="shelf" className="">
                        Shelf
                      </label>
                      <input
                        type="number"
                        name="shelf"
                        id="shelf"
                        className="border border-orange-500 rounded-md"
                        defaultValue={shelf}
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
                        defaultValue={image}
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
                        defaultValue={tags}
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
                        defaultValue={description}
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
        ) : (
          <>
            <h1 className="text-center mt-10 text-red-500">
              Sorry, this is only for admin!
            </h1>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminModifyBook;
