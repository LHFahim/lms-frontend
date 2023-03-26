import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const AdminListDonatedBooksCard = ({ item }) => {
  const { author, title, description, image, tags, isAccepted, createdAt } =
    item;

  const { user } = useContext(AuthContext);

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

              <h1>{isAccepted ? <p>Yes</p> : <p>No</p>}</h1>

              <h1>{finalDate}</h1>
            </div>
          </main>
        </div>
      </section>
    </main>
  );
};

export default AdminListDonatedBooksCard;

// <main className="space-y-5">
//       <div className="space-y-5">
//         <section>
//           <img src={image} alt="" />
//         </section>
//         <section className="space-y-3">
//           <div>
//             <h1>{title}</h1>
//             <h1>{tags}</h1>
//             <h1>{author}</h1>
//           </div>
//           <h1>Donated by: {donatedBy.email}</h1>
//         </section>
//       </div>
//     </main>
