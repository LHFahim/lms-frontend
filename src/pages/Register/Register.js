import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  // email pass login
  const handleRegister = event => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const avatarURL = form.avatar.value;
    const shortBio = form.bio.value;
    const phoneNumber = form.phone.value;

    console.log(
      email,
      password,
      firstName,
      lastName,
      avatarURL,
      shortBio,
      phoneNumber
    );

    axios
      .post('http://localhost:5000/api/v1/auth/register', {
        email,
        password,
        firstName,
        lastName,
        avatarURL,
        shortBio,
        phoneNumber,
      })
      .then(res => {
        if (res.data.success) {
          // localStorage.setItem('access-token', res.data.data.accessToken);
          console.log(res);
          // navigate('/home');
        } else {
          console.log(res);
        }
      })
      .catch(err => {
        console.error(['error:', err]);
      });
  };
  return (
    <div>
      <div className="flex justify-center mt-40">
        <form onSubmit={handleRegister} className="">
          <div>
            {/* name */}
            <div>
              <label className="" htmlFor="firstName">
                First name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                className="border border-orange-500 rounded-md"
                required
              />
            </div>
            <div>
              <label className="" htmlFor="lastName">
                Last name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="border border-orange-500 rounded-md"
                required
              />
            </div>

            {/* email */}
            <div>
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

            {/* password */}
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

            {/* avatar url */}
            <div>
              <label className="" htmlFor="avatar">
                Avatar URL
              </label>
              <input
                type="text"
                name="avatar"
                id="avatar"
                className="border border-orange-500 rounded-md"
                required
              />
            </div>

            {/* short bio */}
            <div>
              <label className="" htmlFor="bio">
                Short Bio
              </label>
              <input
                type="text"
                name="bio"
                id="bio"
                className="border border-orange-500 rounded-md"
                required
              />
            </div>

            {/* phone number*/}
            <div>
              <label className="" htmlFor="phone">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                className="border border-orange-500 rounded-md"
                required
              />
            </div>
          </div>

          <div>
            <button className="bg-orange-500 text-white py-2 text-xl w-2/12 rounded-md">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
