import React from 'react';
import './adminBookItem.css';

const AdminBookItem = ({ book }) => {
  const {
    title,
    author,
    description,
    tags,
    image,
    borrowedBy,
    quantity,
    shelf,
    isAvailable,
    createdAt,
    updatedAt,
  } = book;

  const tempDate = new Date(createdAt);

  const finalDate =
    tempDate.getFullYear() +
    '-' +
    (tempDate.getMonth() + 1) +
    '-' +
    tempDate.getDate();

  return (
    <main>
      <section>
        <div>
          <main>
            <div className="wrapper mb-10 p-5 border-b-2 border-orange-500 hover:bg-aqua">
              <img src={image} alt="" />
              <h1>{title}</h1>
              <h1>{author}</h1>
              <h1>{description}</h1>
              <h1>{tags}</h1>
              <h1>{quantity}</h1>
              <h1>{shelf}</h1>
              <h1>{isAvailable ? <p>Yes</p> : <p>No</p>}</h1>

              <h1>{finalDate}</h1>
              {/* <h1>{updatedAt}</h1> */}
            </div>
          </main>
        </div>
      </section>
    </main>
  );
};

export default AdminBookItem;
