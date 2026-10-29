import React, { useState, useEffect } from "react";
import Html from "../modal/html/Html";
import libraryGif from "../../assets/img/library.gif"

export default function ModalLibraryNoLogin({ isOpen, }) {
  const [modalOpen, setModalOpen] = useState(isOpen);  
  const [activeWindow, setActiveWindow] = useState('inicio');
  const [goBack, setGoBack] = useState(false)

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  const changeActiveWindow = (window) => {
    setActiveWindow(window);
  };
 
  const handleGoBack = ()=>{
    setGoBack(true)
    console.log('clicking')
  }
  
  
  return (
    <div
    className={` modal fade ${modalOpen ? 'show' : ''} biblioteca-no-login ${activeWindow === 'inicio' ? 'top-no-login' : ''}`}
    id="modal-biblioteca_no_login"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden={!modalOpen}
      style={{ display: modalOpen ? 'block' : 'none' }}
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            {activeWindow !== 'inicio' && (
            <div className="close" onClick={handleGoBack}>
              <img loading="lazy" src="/img/svg/icon_close_FFFFFF.svg" alt="" />
            </div>
            )}
              <div class="box no-biblioteca">
              <ul class="group-login">
              {activeWindow === 'inicio' && (
                  <>
                    <li className="img" style={{ marginTop: '-30px' }}>
                      <div className="box-caja">
                        <img
                          src={libraryGif}
                          alt="no login library gif"
                        />
                      </div>
                    </li>
                    <li className="tu-biblioteca">
                      <div className="box-caja">Your library is empty</div>
                    </li>
                    <li className="registrate">
                      <div className="box-caja">
                        To get started, please log in or sign up on Dmangas
                      </div>
                    </li>
                  </>
                ) }
                 
                <div className="modal-body">
                <Html ocultarImagen={true} imodal={'inicio'} onActiveWindowChange={changeActiveWindow} goBack={goBack} setGoBack={setGoBack} />
              </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}