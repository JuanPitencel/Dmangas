  import React, { useEffect, useState } from 'react';
  import GoogleLogin from './GoogleLogin';
  import { GoogleOAuthProvider } from '@react-oauth/google';
  import SignUp from './SignUp';
  import JoinUs from './JoinUs';

  function SignIn({ onActiveWindowChange, goBack, setGoBack}) {
    const googleAuthClientId = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;
    const [activeWindow, setActiveWindow] = useState('inicio');
    const [googleLoginInfo, setGoogleLoginInfo] = useState(null);
    const [ocultarImagen, setOcultarImagen] = useState(false);


    function changeScreen(screen) {
      setActiveWindow(screen);

      // Hide the image if it's not the "inicio" screen
      if (screen !== 'inicio') {
        setOcultarImagen(true);
      } else {
        setOcultarImagen(false); // Show the image if we return to "inicio"
      }

      if (onActiveWindowChange) {
        onActiveWindowChange(screen);
      }
    }

  useEffect(() => {
    if (goBack) {
      changeScreen('inicio')
      setGoBack(false)
    }
  }, [goBack]);

    return (
      <div className={`html ${ocultarImagen ? '' : 'split-view'}`}>
        <ul>
        {ocultarImagen ? null : (
          <li>         
              <img loading="lazy" src="/img/login/cover/bg_login.jpg" alt="" />
          </li>
         )}
        <li className={`white-cuadrante ${ocultarImagen ? 'full-width' : ''}`}>
            <ul id="ul-inicio" className={`info-login ${activeWindow === 'inicio' ? '' : 'hideVentana'}`}>
              {/* Content of the "inicio" screen */}
              {ocultarImagen ? null : (
              <>
                <li><span>Welcome to D'MANGAS</span></li>
                  <li>
                  <span>Join and enjoy the best stories in Spanish</span>
                </li>
                </>
              )}
              <li>
              <GoogleOAuthProvider clientId={String(googleAuthClientId)}>
                      <GoogleLogin setGoogleLoginInfo={setGoogleLoginInfo} changeScreen={changeScreen} buttonText={'Join with Google'} />
                    </GoogleOAuthProvider>
              </li>
              <li> <a ><img src="/img/svg/icon_facebook.svg" alt="" /> <span>Join with Facebook</span></a></li>
              <li>
                <div className='spinner-login'>
                  <a   onClick={() => changeScreen('unete')}>
                    <div className='icon-wrapper'> <img src="/img/svg/icon_message.svg" alt="" /></div> <span>Join with your email</span>
                  </a>
                </div>
              </li>
              <li><span>Already have an account?</span></li>
              <li><span><a  onClick={() => changeScreen('registro')}>Sign in now</a></span></li>
            </ul>
            <ul id="ul-registro" className={`info-login ${activeWindow === 'registro' ? '' : 'hideVentana'}`}>
              <SignUp onScreenChange={changeScreen} />
            </ul>
            <ul id="ul-unete" className={`info-login ${activeWindow === 'unete' ? '' : 'hideVentana'}`}>
            <JoinUs changeScreen={changeScreen} userInfo={googleLoginInfo} />
          </ul>
          </li>
        </ul>
      </div>
    );
  }

  export default SignIn;
