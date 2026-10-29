import '../../../../assets/css/App.css';
import "./navbar.css";
import React, { useEffect, useState } from "react";
import Switch from "../../../../components/switch/Switch";
import EndpointCore from '../../../../pages/Global';
import Modal from '../../../modal/Modal';
import CustomImageLoader from "../../../CustomLoader/CustomImageLoader";
import smileImage from '../../../../assets/img/internal/community_requests/smilelove2.svg'
import swordImage from '../../../../assets/img/svg/icon_mobile/off-default.svg';
import bob from '../../../../assets/img/Icono6.svg'
import ProfileModal from '../../../profileModal/index';

export default function NavBar() {    
    const [SearchModalOpen, setSearchModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [menuItems, setMenuItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
   
    const isUserLoggedIn = localStorage.getItem('token');
    console.log('menuItems', menuItems)
    useEffect(() => {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const triggerScroll = 200;
          if (scrollPosition > triggerScroll) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []); 
    function filename() {
      var absolutePath = window.location.href;
      var lastSlashPosition = absolutePath.lastIndexOf("/");
      var relativePath = absolutePath.substring(
        lastSlashPosition + "/".length,
        absolutePath.length
      );
      return relativePath;
    }
    const url = filename();
    useEffect(() => {
      setIsLoading(true);
      const requestOptions = { method: "GET", headers: {} };
      fetch(EndpointCore.navbar, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          // console.log(" API_URL : " + Global.API_URL);
          let data_items = [];
          result.items.forEach((i) => {
            data_items.push({
              active: false,
              text: i.name.value,
              url: i.linkRelative.value,
            });
          });
          data_items[0].active = true;
          setMenuItems(data_items);
          setIsLoading(false);
        })
        .catch((error) => console.log("error", error));
        setIsLoading(false);
    }, []);

    const protocol = window.location.protocol;
    const host = window.location.host;
    const protocolAndHost = protocol + "//" + host;
      
    const toggleSearchModal = () => {
      setSearchModalOpen(!SearchModalOpen);
  };

  const toggleLoginModal = () => {
    setIsModalOpen(!isModalOpen);
  };


  const handleCloseSearchModal = () => {
      setSearchModalOpen(false);
  };

  const handleSwitchToggle = () => {
    setIsChecked(!isChecked);
  };

  

  const SmileButton = ({ isVisible, isChecked, onToggleSmile }) => {
    
  const imageSrc = isChecked ? swordImage : smileImage;
  
    return (
        <button
          id="open_smile"
          type="button"
          className={`hide_desk button-wrapper ${isVisible ? '' : 'hide_movil'}`}
          onClick={onToggleSmile}
          style={{cursor:'pointer'}}
        >
          <img src={imageSrc} alt='Smile or Sword Image' />
      </button>
    );
  };
      return(
        // close the modal by clicking outside of it, on the wrapper that surrounds it
        <div onClick={handleCloseSearchModal}>
          <div className='ui_header'>
              <div className="menu">
                
                  <div className="logo" style={{display: 'flex'}}>
                  <div className="d-flex">
                    <div className='bob-logo-navbar'>
                    <img src={bob} alt="bob-requests" />
                    </div>
                      <a href="/" className="brand-logo hide_movil">
                      Dmangas
                      </a>
                      </div>
                      <Switch isChecked={isChecked} onToggle={handleSwitchToggle} />
                  </div>        
                  <nav className="top-nav">
                  {isLoading ? (
                    <CustomImageLoader/> ):(
                  <ul>
                  {menuItems.map((value, idx) => (
                  <li
                  key={"menu01_" + idx}
                  id={"menu_" + (idx + 1)}
                  className="ui_nav__li hide_movil"
                  >
                 <a
                  href={"/" + value.url}
                  className={`ui_nav__a ${
                    value.url === url ? "ui_active" : ""
                  }`}
                  >
                  {value.text}
                  </a>
                   </li>

                      ))}
                       <li id="menu_6" className="ui_nav__li">
                          <div className="button scroll-container">
                         <SmileButton  isVisible={isVisible} isChecked={isChecked} onToggleSmile={handleSwitchToggle} />
                             <button id="open_buscar" type="button" onClick={(e) => { e.stopPropagation(); toggleSearchModal(); }} >
                                <img loading="lazy" className='blue' src={`${protocolAndHost}/img/svg/icon_search.svg`} alt="" />
                                <img loading="lazy"  className='white' src={`${protocolAndHost}/img/svg/icon_mobile/icon_search_white.svg`} alt="" /> 
                              </button>
                              <button id="open_registro" type="button" onClick={toggleLoginModal} >
                                <img loading="lazy"  className='blue'  src={`${protocolAndHost}/img/svg/icon_user.svg`} alt="" />
                                <img loading="lazy"  className='white'  src={`${protocolAndHost}/img/svg/icon_mobile/icon_user_white.svg`} alt="" />
                              </button>    
                          </div>
                        </li>
                        
                      </ul>
                      )}
                  </nav>
              </div>

          </div>
           <div className='buscar'>
           < Modal isOpen={SearchModalOpen} onClose={handleCloseSearchModal} imodal={'buscar'}  />
           </div>
           {isUserLoggedIn ? (
          <div
          className="w-32 h-12 hidden"
          style={{ position: 'absolute', zIndex: '13000', top:'7%', right: '20%'}}

          >
            {isModalOpen && <ProfileModal />}
          </div>
        ) : (
          <Modal isOpen={isModalOpen} onClose={toggleLoginModal} imodal={'inicio'} />
        )}
      </div>
         );   
        };
