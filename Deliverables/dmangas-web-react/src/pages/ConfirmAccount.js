import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import Footer from '../components/footer/Footer';
import EndpointCore from './Global';

const ConfirmAccount = () => {
  const [accountConfirmed, setAccountConfirmed] = useState(false);
  const [token, setToken] = useState(null);

  const params = useParams();
  const { token: confirmationToken } = params;

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `${EndpointCore.confirmUser}/${confirmationToken}`;
        const response = await fetch(url);

        const data = await response.json();

        toastr[data.error ? 'error' : 'success'](data.msg);

        if (response.ok) {
          setAccountConfirmed(true);
          setToken(data.token);
          localStorage.setItem('token', data.token);
        }

      } catch (error) {
        toastr.error('Error processing the request');
      }
    };

    confirmAccount();
  }, []);

  return (
    <>
      <form className='form-container-confirmar'>
        <div>
          {accountConfirmed && (
            <Link
              className='input-confirm'
              to="/"
            >
              Log In
            </Link>
          )}
        </div>
      </form>
      <Footer />
    </>
  );
};

export default ConfirmAccount;
