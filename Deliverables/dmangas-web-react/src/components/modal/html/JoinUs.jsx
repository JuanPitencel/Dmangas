import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import EndpointCore from '../../../pages/Global';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import checkedAvatar from '../../../assets/img/svg/icon_check_white.svg'
import avatar1 from '../../../assets/img/login/avatar-selected/akari1.png'
import avatar2 from '../../../assets/img/login/avatar-selected/akari2.png'
import avatar3 from '../../../assets/img/login/avatar-selected/akari3.png'
import avatar4 from '../../../assets/img/login/avatar-selected/akari4.png'
import avatar5 from '../../../assets/img/login/avatar-selected/akari5.png'
import avatar6 from '../../../assets/img/login/avatar-selected/akari6.png'
import avatar7 from '../../../assets/img/login/avatar-selected/akari7.png'
import avatar8 from '../../../assets/img/login/avatar-selected/akari8.png'
import avatar9 from '../../../assets/img/login/avatar-selected/nathan1.png'
import avatar10 from '../../../assets/img/login/avatar-selected/nathan2.png'
import avatar11 from '../../../assets/img/login/avatar-selected/nathan3.png'
import avatar12 from '../../../assets/img/login/avatar-selected/nathan4.png'
import avatar13 from '../../../assets/img/login/avatar-selected/nathan5.png'
import avatar14 from '../../../assets/img/login/avatar-selected/nathan6.png'
import avatar15 from '../../../assets/img/login/avatar-selected/nathan7.png'
import avatar16 from '../../../assets/img/login/avatar-selected/nathan8.png'

function JoinUs({ changeScreen, userInfo }) {
  const [selectedProfile, setSelectedProfile] = useState(false);
  const [selectedProfileName, setSelectedProfileName] = useState('Select your Profile');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState(null);
  const [dropdownOpen, setDropdownOpen] =useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [avatars, setAvatars] = useState([]);

  console.log('avatarssss', avatars)

  // Define the avatars based on the selected profile
  const akariAvatars = [
    { src: avatar1, name: 'Akari1' },
    { src: avatar2, name: 'Akari2' },
    { src: avatar3, name: 'Akari3' },
    { src: avatar4, name: 'Akari4' },
    { src: avatar5, name: 'Akari5' },
    { src: avatar6, name: 'Akari6' },
    { src: avatar7, name: 'Akari7' },
    { src: avatar8, name: 'Akari8' },
  ];
  
  const nathanAvatars = [
    { src: avatar9, name: 'Nathan1' },
    { src: avatar10, name: 'Nathan2' },
    { src: avatar11, name: 'Nathan3' },
    { src: avatar12, name: 'Nathan4' },
    { src: avatar13, name: 'Nathan5' },
    { src: avatar14, name: 'Nathan6' },
    { src: avatar15, name: 'Nathan7' },
    { src: avatar16, name: 'Nathan8' },
  ];
    
  const handleSignUp = () => {

      if (!nickname || (userInfo ? false : !email) || (userInfo ? false : !password) || userType === null) {
        toastr.error('All fields are required.');
        return;
      }

      if (!userInfo && !isValidEmail(email)) {
        toastr.error('Please enter a valid email address.');
        return;
      }

      if (!termsAccepted) {
        toastr.error('You must accept the terms to participate.');
        return;
      }

    const avatarName = selectedAvatar !== null ? avatars[selectedAvatar].name : null;

    fetch(EndpointCore.NODE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_name: nickname,
        email: userInfo ? userInfo.email : email,
        password: userInfo ? '' : password,
        user_type: userType,
        sub: userInfo ? userInfo.sub : null,
        avatar: avatarName,
      }),
    })
      .then(response => response.json())
      .then(data => {

        toastr.success(data.msg);
        const token = data.token;

       if (data.loginMethod === 'google') {
       localStorage.setItem('token', token);
       window.location.reload();
       } else {
       toastr.info('Check your email to confirm your account.');
       }
      })
      .catch(error => {
        console.error('Error signing up:', error);
        const errorMsg = error.response ? error.response.data.msg : 'Error signing up. Please try again.';

        toastr.error(errorMsg);
      });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleAvatarClick = (index) => {
    if (selectedAvatar === index) {
      setSelectedAvatar(null);
    } else {
      setSelectedAvatar(index);
    }
  };
  const handleCheckboxChange = () => {
    setTermsAccepted(!termsAccepted);
  };
  const handleProfileSelection = (profileName, userType, avatarList) => {
    setSelectedProfile(true);
    setSelectedProfileName(profileName);
    setUserType(userType);
    setAvatars(avatarList); // Update the avatar list
    setDropdownOpen(false); // Close the dropdown
  };
 
  return (
    <div className="html">
      <ul>
        <li>
          <ul id="ul-unete" className="info-login">
            <li><span>Join now</span></li>
            <li>
              <span>Sign up to start enjoying the best stories in Spanish</span>
            </li>
            <li>
              <div className="caja">
                <label>Nickname</label>
                <input className='custom-input-text' type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
              </div>
            </li>
            {!userInfo && (
              <>
                <li>
                  <div className="caja">
                    <label>Email</label>
                    <input className='custom-input-text' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </li>
                <li>
                  <div className="caja">
                    <label>Password</label>
                    <input className='custom-input-text' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                </li>
              </>
            )}
            <li>
              <div className="caja sinborde">
                <Dropdown className='custom-dropdown' onToggle={(isOpen) => setDropdownOpen(isOpen)}>
                  <Dropdown.Toggle className={`custom-dropdown ${dropdownOpen ? 'custom-toggle-open' : 'custom-toggle-closed'}`} variant="secondary" id="dropdown-basic">
                    <span id="dropdown_id">{selectedProfileName}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className='custom-dropdown-menu'>
                    <Dropdown.Item onClick={() => handleProfileSelection('Akari VanHove', 0, akariAvatars)}>
                      <button className="dropdown-item dropdown-item--ui" type="button">
                        <div className="ui_dropdown_circle"></div>
                        <img className='dropdown-item-img' src='/img/login/avatar/akari.png' />
                        <span>Akari VanHove</span>
                      </button>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleProfileSelection('Nathan Vanhove', 1, nathanAvatars)}>
                      <button className="dropdown-item dropdown-item--ui" type="button">
                        <div className="ui_dropdown_circle"></div>
                        <img className='dropdown-item-img' src='/img/login/avatar/nathan.png' />
                        <span>Nathan Vanhove</span>
                      </button>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </li>
            {selectedProfile && (
              <li>
                <label className="subtitulo">Define your avatar:</label>
                <ul className="perfil-avatar">
                  {avatars.map((avatar, index) => (
                    <li key={index} className="perfil-avatar-item" style={{ position: 'relative' }}>
                      <img
                        loading="lazy"
                        src={avatar.src}
                        alt=""
                        onClick={() => handleAvatarClick(index)}
                        style={{ cursor: 'pointer' }}
                        className='img-item'
                      />
                      {selectedAvatar === index && (
                        <img
                          src={checkedAvatar}
                          style={{ width: '20px', height: '20px' }}
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            )}

            <div className="form-check">
              <div>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="type1"
                  checked={termsAccepted}
                  onChange={handleCheckboxChange}
                />
              </div>
              <p>Terms, conditions and privacy policy</p>
            </div>
            <li>
              <button className="btn-rosado" type="button" onClick={handleSignUp}>
                Sign up
              </button>
            </li>
            <li className='linea_de_puntos'></li>
            <li><span>Already have an account?</span></li>
            <li><span><a onClick={() => changeScreen('registro')}>Sign in now</a></span></li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default JoinUs;