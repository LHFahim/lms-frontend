import axios from 'axios';
import React, { useState } from 'react';

const BookCategories = () => {
  const [categories, setCategories] = useState({
    values: [],
    response: [],
  });
  const handleCategories = async event => {
    const { value, checked } = event.target;
    const { values: languages } = categories;

    console.log(`${value} is ${checked}`);

    // Case 1 : The user checks the box
    if (checked) {
      setCategories({
        values: [...languages, value],
        response: [...languages, value],
      });
    }

    // Case 2  : The user unchecks the box
    else {
      setCategories({
        values: languages.filter(e => e !== value),
        response: languages.filter(e => e !== value),
      });
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/books/filter`,
        { category: categories.values }
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-lg mb-2">Choose categories</h1>
      </div>
      <form onSubmit={handleCategories}>
        {/* single category */}
        <div className="space-x-2 flex items-center">
          <input
            type="checkbox"
            id="academic"
            name="academic"
            value="ACADEMIC"
            onChange={handleCategories}
          />
          <label htmlFor="academic">Academic</label>
        </div>
        {/* single category */}
        <div className="space-x-2 flex items-center">
          <input
            type="checkbox"
            id="literature"
            name="literature"
            value="LITERATURE"
            onChange={handleCategories}
          />
          <label htmlFor="literature">Literature</label>
        </div>
        {/* single category */}
        <div className="space-x-2 flex items-center">
          <input
            type="checkbox"
            id="philosophy"
            name="philosophy"
            value="PHILOSOPHY"
            onChange={handleCategories}
          />
          <label htmlFor="philosophy">Philosophy</label>
        </div>
        {/* single category */}
        <div className="space-x-2 flex items-center">
          <input
            type="checkbox"
            id="romance"
            name="romance"
            value="ROMANCE"
            onChange={handleCategories}
          />
          <label htmlFor="romance">Romance</label>
        </div>
        {/* single category */}
        <div className="space-x-2 flex items-center">
          <input
            type="checkbox"
            id="scifi"
            name="scifi"
            value="SCI-FI"
            onChange={handleCategories}
          />
          <label htmlFor="romance">Sci-fi</label>
        </div>
        {/* single category */}
        <div className="space-x-2 flex items-center">
          <input
            type="checkbox"
            id="thriller"
            name="thriller"
            value="THRILLER"
            onChange={handleCategories}
          />
          <label htmlFor="thriller">Thriller</label>
        </div>
        {/* single category */}
        <div className="space-x-2 flex items-center">
          <input
            type="checkbox"
            id="detective"
            name="detective"
            value="DETECTIVE"
            onChange={handleCategories}
          />
          <label htmlFor="detective">Detective</label>
        </div>
        {/* single category */}
        <div className="space-x-2 flex items-center">
          <input
            type="checkbox"
            id="fantasy"
            name="fantasy"
            value="FANTASY"
            onChange={handleCategories}
          />
          <label htmlFor="fantasy">Fantasy</label>
        </div>
        {/* single category */}
        <div className="space-x-2 flex items-center">
          <input
            type="checkbox"
            id="adventure"
            name="adventure"
            value="ADVENTURE"
            onChange={handleCategories}
          />
          <label htmlFor="adventure">Adventure</label>
        </div>

        <button className="border px-2 rounded mt-2">Filter</button>
      </form>
    </div>
  );
};

export default BookCategories;

// ADVENTURE = 'ADVENTURE',
