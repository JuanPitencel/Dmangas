import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import EndpointCore from '../../../pages/Global';
import loaderGif from '../../../assets/img/icon-loader-2.gif';

const USE_MOCKS = process.env.REACT_APP_USE_MOCKS === "true";

// Stand-in for the profile the real Google userinfo endpoint would return.
// Only used when USE_MOCKS is on, so the button can log in without a real
// Google OAuth client/popup to round-trip to.
const MOCK_GOOGLE_USER_INFO = {
  sub: "mock-google-id",
  email: "juan@example.com",
  name: "Juan",
  picture: "/img/login/avatar/avatar.png",
};

function GoogleLogin({ setGoogleLoginInfo, changeScreen, buttonText }) {
  const [isLoading, setIsLoading] = useState(false);

  // Shared by the real Google flow and the mock flow below: given a Google
  // userInfo payload, ask our own backend whether that user already exists.
  // minDelayMs keeps the loading spinner on screen for at least that long
  // before reloading -- the mock flow uses this since its fetch alone is
  // too quick (~120ms) for the spinner to actually be visible; the real
  // Google flow leaves it at 0 since a real network round trip is already
  // slow enough to see.
  const registerOrLogIn = async (userInfo, minDelayMs = 0) => {
    // Check whether the user is already registered
    const [userExistsResponse] = await Promise.all([
      fetch(EndpointCore.googleLogin, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInfo }),
      }),
      new Promise((resolve) => setTimeout(resolve, minDelayMs)),
    ]);

    const userExistsData = await userExistsResponse.json();

    if (userExistsResponse.ok) {

      localStorage.setItem('token', userExistsData.token);
      window.location.reload();

    } else {
      // If the user isn't registered yet, redirect to the "Join" screen
      setGoogleLoginInfo(userInfo);
      changeScreen('unete');
    }
  };

  const onSuccess = async (response) => {
    try {
      setIsLoading(true);

      const userInfoRes = await fetch(process.env.REACT_APP_GOOGLE_API_RES, {
        headers: {
          "Authorization": `Bearer ${response.access_token}`
        }
      });

      if (!userInfoRes.ok) {
        throw new Error("Error fetching Google user data");
      }

      const userInfo = await userInfoRes.json();
      await registerOrLogIn(userInfo);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = useGoogleLogin({
    onSuccess
  });

  const handleClick = async (event) => {
    event.preventDefault();

    if (USE_MOCKS) {
      // No real Google OAuth client/backend to talk to under mocks — skip
      // the popup and log straight in against the mock backend instead.
      // The real flow (login() above, via useGoogleLogin) is untouched and
      // runs normally whenever REACT_APP_USE_MOCKS is off.
      try {
        setIsLoading(true);
        await registerOrLogIn(MOCK_GOOGLE_USER_INFO, 700);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    login();
  };

  return (
    <div className='spinner-login'>
      <a href="/#" onClick={handleClick}>
        {isLoading ? (
          <img src={loaderGif} alt="Loading" className="google-btn-loader" />
        ) : (
          <img src="/img/svg/icon_google.svg" alt="" />
        )}
        <span>{buttonText}</span>
      </a>
    </div>
  );
}

export default GoogleLogin;