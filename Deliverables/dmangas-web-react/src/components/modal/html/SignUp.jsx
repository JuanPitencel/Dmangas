import React, { useState, useEffect } from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import EndpointCore from '../../../pages/Global';
import GoogleLogin from './GoogleLogin';
import { GoogleOAuthProvider } from '@react-oauth/google';

const SignUp = ({ closeModal, onScreenChange }) => {

  const googleAuthClientId = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [activeWindow, setActiveWindow] = useState('registro');
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token'));
  const [googleLoginInfo, setGoogleLoginInfo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(token);
  }, []);

  function changeScreen(e) {
    setActiveWindow(e);
    setForgotPassword(false);
    console.log("Screen change in SignUp:", e);
    onScreenChange(e); // Calls the function provided as a prop
  }

  const handleLogin = () => {
    if (!userName || !password) {
      toastr.error('All fields are required.');
      return;
    }

    fetch(EndpointCore.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ usuario_identificador: userName, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          // Successful login
          localStorage.setItem('token', data.token);
          window.location.reload();
        } else {
          // Authentication error
          toastr.error(data.msg);
        }
      })
      .catch(error => {
        console.error('Error authenticating:', error);
        toastr.error('Error authenticating. Please try again.');
      });
  };

  const handleForgetPassword = () => {
    if (!isValidEmail(forgotPasswordEmail)) {
      toastr.error('Please enter a valid email address.');
      return;
    }

    fetch(EndpointCore.forgetPassword, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: forgotPasswordEmail }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) { // Check the response status
          toastr.success(data.msg);
          setForgotPassword(false); // Only change the state if the response was successful
        } else {
          toastr.error(data.msg);
        }
      })
      .catch(error => {
        console.error('Error sending the request:', error);
        toastr.error('Error sending the request. Please try again.');
      });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className='html'>
      <ul id='ul-registro' className='info-login'>
          <>
            <li><span>Welcome back</span></li>
            <li>
              <span>Sign in to keep enjoying the best stories in Spanish </span>
            </li>
            <li>
              <div className="caja" style={{ display: forgotPassword ? 'none' : 'block' }}>
                <label>Nickname or email</label>
                <input className='custom-input-text' type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
              </div>
            </li>
            <li>
              <div className="caja" style={{ display: forgotPassword ? 'none' : 'block' }}>
                <label>Password</label>
                <input  className='custom-input-text' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </li>
            {forgotPassword ? (
              <div>
                <li>
                  <div className="caja">
                    <label>Enter your email</label>
                    <input
                      className='custom-input-text'
                      type="text"
                      value={forgotPasswordEmail}
                      onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    />
                  </div>
                </li>
                <li>
                  <button className="btn-rosado" type="button" onClick={handleForgetPassword}>
                    Send reset email
                  </button>
                </li>
              </div>
            ) : (
              <li><a  onClick={() => setForgotPassword(true)}><span>Forgot your password?</span></a></li>
            )}
            <li>
              <button className="btn-rosado" type="button" onClick={handleLogin} style={{ display: forgotPassword ? 'none' : 'block',}}>
                Sign in
              </button>
            </li>
            <li style={{ display: forgotPassword ? 'none' : 'block' }}>
              <GoogleOAuthProvider clientId={String(googleAuthClientId)}>
                      <GoogleLogin setGoogleLoginInfo={setGoogleLoginInfo} changeScreen={changeScreen} buttonText={'Sign in with Google'} />
                    </GoogleOAuthProvider>
              </li>
              <li className='linea_de_puntos'></li>
            <li><a  ><span>Don't have an account yet?</span></a></li>
            <li><a  onClick={() => changeScreen('inicio')} ><span>Join now</span></a></li>
          </>
      </ul>
    </div>
  );
};
export default SignUp;
