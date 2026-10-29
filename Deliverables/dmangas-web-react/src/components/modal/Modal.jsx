import './style.css';
import React from 'react';
import Html from './html/Html';


function Modal({ isOpen, onClose, imodal }) {
  return (
    <div className='imodal'>
      <div
        className={`modal fade ${isOpen ? 'show' : ''}`}
        id={'modal_' + imodal}
        aria-labelledby="exampleModalLabel"
        aria-hidden={!isOpen}
        style={{ display: isOpen ? 'block' : 'none' }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <div className="close" onClick={onClose}>
                <img loading="lazy" src="/img/svg/icon_close_FFFFFF.svg" alt="" />
              </div>
            </div>
            <div className="modal-body">
              <Html imodal={imodal} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Modal;
