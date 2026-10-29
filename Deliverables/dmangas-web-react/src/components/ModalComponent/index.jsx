import React from "react";
import { Modal } from "react-bootstrap";
import "./style.css";

export default function ModalComponent({ children, show, setShow, title, subtitle }) {
  const handleClose = () => setShow(false);

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </div>
  );
}
