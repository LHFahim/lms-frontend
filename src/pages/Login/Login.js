import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Login = () => {
  const [error, setError] = useState('');
  const { setUser, user } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  // email pass login
  const handleSubmit = event => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    console.log(email, password);

    user.loading = true;

    axios
      .post('http://localhost:5000/api/v1/auth/login', {
        email,
        password,
      })
      .then(res => {
        if (res.data.success) {
          localStorage.setItem('user', JSON.stringify(res.data.data));
          setUser(prev => {
            return {
              ...prev,
              loading: false,
              user: res.data.data,
            };
          });

          navigate('/home');
        } else {
          console.log(res);
          setUser(prev => {
            return {
              ...prev,
              loading: false,
            };
          });
        }
      })
      .catch(err => {
        console.error(['error:', err]);
        setUser(prev => {
          return {
            ...prev,
            loading: false,
          };
        });
      });
  };
  return (
    <div className="flex justify-center mt-40">
      <form onSubmit={handleSubmit} className="">
        <div className="">
          <div className="">
            <label className="" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="border border-orange-500 rounded-md"
              required
            />
          </div>

          <div className="">
            <label htmlFor="password" className="">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="border border-orange-500 rounded-md"
              required
            />
          </div>
        </div>

        <div className="">
          <button className="bg-zinc-800 text-white py-2 text-xl w-2/12 rounded-md">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
