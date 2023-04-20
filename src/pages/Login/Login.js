import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Login = () => {
  const [error, setError] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
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

  const handleForgotPassword = async () => {
    console.log('hit handleForgotPassword', forgotEmail);

    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/auth/reset-password/send`,
        { email: forgotEmail },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: user.user.accessToken,
          },
        }
      );

      if (res.data.success) forgotPasswordToast();
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleChangePassword = async event => {
    console.log('hit handleChangePassword');
    event.preventDefault();

    const form = event.target;
    const newPassword = form.new_password.value;
    const confirmNewPassword = form.confirm_password.value;
    const code = form.otp.value;

    console.log(newPassword, confirmNewPassword, code);

    try {
      const res = await axios.patch(
        `http://localhost:5000/api/v1/auth/reset-password`,
        {
          email: forgotEmail,
          newPassword,
          confirmNewPassword,
          code,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: user.user.accessToken,
          },
        }
      );

      console.log('🚀 ~ file: Login.js:114 ~ handleChangePassword ~ res:', res);

      if (res.data.success) {
        passwordChangeToast();
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const forgotPasswordToast = () =>
    toast('An email has been sent to your email!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  const passwordChangeToast = () =>
    toast('Password has been changed successfully!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  return (
    <main className="flex flex-col h-screen justify-center items-center ">
      <div className="">
        <form onSubmit={handleSubmit} className=" space-y-5">
          <div className="space-y-5">
            <div className="grid grid-cols-[1fr_2fr] items-center">
              <label className="" htmlFor="email">
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                onChange={e => setForgotEmail(e.target.value)}
                className="border border-orange-500 rounded-md px-3 py-2"
                required
              />
            </div>

            <div className="grid grid-cols-[1fr_2fr] items-center">
              <label htmlFor="password" className="">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="border border-orange-500 rounded-md px-3 py-2"
                required
              />
            </div>
          </div>

          <div className="">
            <button className="bg-orange-500  text-white py-2 text-xl font-black  rounded-md px-3 ">
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* password change */}
      <section className=" mt-5 ">
        <div className="forgot-pass mb-5">
          <span>Forgot password? Click here to </span>
          <button onClick={handleForgotPassword}> get reset email</button>
        </div>
        {/* The button to open modal */}
        <label
          htmlFor="my-modal-4"
          className="uppercase border border-orange-500   text-white py-2 text-xl w-2/12 rounded-md"
        >
          Reset Password
        </label>

        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my-modal-4" className="modal-toggle" />
        <label htmlFor="my-modal-4" className="modal cursor-pointer">
          <label className="modal-box relative" htmlFor="">
            <form onSubmit={handleChangePassword} className="space-y-3">
              <div className="grid grid-cols-[1fr_2fr]">
                <label className="" htmlFor="new_password">
                  New password
                </label>
                <input
                  type="text"
                  name="new_password"
                  id="new_password"
                  className="border border-orange-500 rounded-md"
                />
              </div>
              <div className="grid grid-cols-[1fr_2fr]">
                <label className="" htmlFor="confirm_password">
                  Confirm password
                </label>
                <input
                  type="text"
                  name="confirm_password"
                  id="confirm_password"
                  className="border border-orange-500 rounded-md"
                />
              </div>
              <div className="grid grid-cols-[1fr_2fr]">
                <label className="" htmlFor="otp">
                  OTP
                </label>
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  className="border border-orange-500 rounded-md"
                />
              </div>
              <button className="bg-zinc-800 text-white py-2 text-xl w-2/12 rounded-md">
                Submit
              </button>
            </form>
          </label>
        </label>
      </section>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </main>
  );
};

export default Login;
