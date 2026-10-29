import "./style.css";
import React, { useEffect, useState } from "react";
import Switch from "../switch/Switch";
import EndpointCore from "../../pages/Global";
import ProfileModal from "../profileModal";
import bob from '../../assets/img/Icono6.svg';
import Modal from '../modal/Modal';

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function filename() {
    var absolutePath = window.location.href;
    var lastSlashPosition = absolutePath.lastIndexOf("/");
    var relativePath = absolutePath.substring(
      lastSlashPosition + "/".length,
      absolutePath.length
    );
    return relativePath;
  }

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: { "Content-Type": "application/json" },
    };
    fetch(EndpointCore.navbar, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        let menuItemsData = [];
        result.items.forEach((i) => {
          menuItemsData.push({
            active: false,
            text: i.name.value,
            url: i.linkRelative.value,
          });
        });
        menuItemsData[0].active = true;
        setMenuItems(menuItemsData);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const url = filename();
  const protocol = window.location.protocol;
  const host = window.location.host;
  const protocolAndHost = protocol + "//" + host;

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const isUserLoggedIn = localStorage.getItem('token');

  return (
    <div className="menu">
      <div className="logo">
        <a>
          <img src={bob} className="bob-logo oculta_desktop"/>
        </a>
        <a href="/" className="brand-logo hide_movil">
          Dmangas
        </a>
        <Switch />
      </div> 
      <nav className="top-nav" style={{ position: "relative" }}>
        <ul>
          {menuItems.map((value, idx) => (
            <li
              key={"menu01_" + idx}
              id={"menu_" + (idx + 1)}
              className="ui_nav__li hide_movil"
            >
              <a
                href={"/" + value.url}
                className={`ui_nav__a ${value.url === url ? "ui_active" : ""}`}
              >
                {value.text}
              </a>
            </li>
          ))}
          <li id="menu_6" className="ui_nav__li">
            <div className="button">
              <button id="open_buscar" type="button">
                <img
                  loading="lazy"
                  className="blue"
                  src={`${protocolAndHost}/img/svg/icon_search.svg`}
                  alt=""
                />
                <img
                  loading="lazy"
                  className="white"
                  src={`${protocolAndHost}/img/svg/icon_mobile/icon_search_white.svg`}
                  alt=""
                />
              </button>
              <button id="open_registro" type="button" onClick={toggleModal}>
                <img
                  loading="lazy"
                  className="blue"
                  src={`${protocolAndHost}/img/svg/icon_user.svg`}
                  alt=""
                />
                <img
                  loading="lazy"
                  className="white"
                  src={`${protocolAndHost}/img/svg/icon_mobile/icon_user_white.svg`}
                  alt=""
                />
              </button>
            </div>
          </li>
        </ul>
        {isUserLoggedIn && (
          <div
            className="w-32 h-12 hidden menu-profile-modal"
          >
            {isModalOpen && <ProfileModal />}
          </div>
        )}
        </nav>
      {!isUserLoggedIn && (
        <Modal imodal={'inicio'} isOpen={isModalOpen} onClose={toggleModal} />
      )}
    </div>
  );
}

export default Menu;
