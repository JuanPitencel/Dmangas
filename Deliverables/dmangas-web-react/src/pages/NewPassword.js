import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import Alerta from '../components/alert/Alert';
import Footer from '../components/footer/Footer';
import EndpointCore from './Global';

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [passwordModifided, setPasswordModifided] = useState(false);
  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const checkToken = async () => {
      try {
        const url = `${EndpointCore.forgetPassword}/${token}`;
        await fetch(url, { method: 'GET' });
        setIsTokenValid(true);
      } catch (error) {
        toastr.error(error.message || 'Error verifying the token');
      }
    };

    checkToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      toastr.error('The password must be at least 6 characters long');
      return;
    }

    if (newPassword !== repeatPassword) {
      toastr.error('Passwords do not match');
      return;
    }

    try {
      const url = `${EndpointCore.forgetPassword}/${token}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }),
      });

      if (response.ok) {
        const data = await response.json();
        toastr.success(data.msg);
        setPasswordModifided(true);
      } else {
        const errorData = await response.json();
        toastr.error(errorData.msg);
      }
    } catch (error) {
      toastr.error(error.message || 'Error changing the password');
    }
  };


  return (
    <>
      <h1 className="text-capitalize">
        Reset your password
      </h1>

      <form onSubmit={handleSubmit} className="form-container">

        <div>
          <label className="label-password" htmlFor="password">
            New password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your new password"
            className="input-confirm"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <label className="label-password" htmlFor="repeatPassword">
            Repeat password
          </label>
          <input
            id="repeatPassword"
            type="password"
            placeholder=" Repeat your new password"
            className="input-confirm "
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          <input
            type="submit"
            value="Reset password"
            className="input-password-submit"
          />
        </div>
      </form>

      {passwordModifided && (
        <div>
          <Link
            className='input-confirm'
            to="/"
          >
            Log In
          </Link>
        </div>
      )}

      <Footer />
    </>
  );
};

export default NewPassword;
