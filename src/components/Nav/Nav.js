import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Nav = () => {
  const { user, setUser } = useContext(AuthContext);

  const loggedUser = user.user.user.firstName;
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };
  return (
    <main>
      <div className="">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link
              to={`/home`}
              className="text-lg hover:underline decoration-orange-500"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to={`/borrowed-books`}
              className="text-lg hover:underline decoration-orange-500"
            >
              Borrowed Book
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="text-lg hover:underline decoration-orange-500"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default Nav;
{
  /* <small>Logged in as {loggedUser},</small>  */
}
