import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Dropdown from '../dropdown/Dropdown';

function BookFilterModal({ show, onHide, icbo }) {


  return (
    <Modal show={show} onHide={onHide} className='modal-filtro-container' >
      <Modal.Header>
              <span>FILTER RESULTS</span>
      </Modal.Header>
      <Modal.Body>
        <div >
          <div className="psidebar">

            <div className='box-row dropdown-blue'>
              <Dropdown icbo={icbo} />
            </div>
          </div>
        </div>
      </Modal.Body>

    </Modal>
  );
}

export default BookFilterModal;

