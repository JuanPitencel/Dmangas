import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "./style.css";

export default function OriginalContentModal({ show, setShow, onSeleccionarOpcion }) {
  const handleClose = () => setShow(false);

  const [selectedOption, setSelectedOption] = useState(null);

  const licenseOptions = [
    { id: 1, title: "All Rights Reserved", description: "You do not allow your work to be used or adapted, under any circumstances, without your permission." },
    { id: 2, title: "Public Domain", description: "This allows anyone to use your story for any purpose - anyone can freely print, sell, or turn your work into a movie." },
    { id: 3, title: "Creative Commons Attribution (CC)", description: "You retain some rights over your story but grant certain permissions such as translations or adaptations, as long as you receive proper credit." },
    { id: 4, title: "Attribution (CC) NonCommercial", description: "This license allows others to remix, adapt, and build upon your work, non-commercially, as long as they give you proper credit." },
    { id: 5, title: "Attribution (CC) NonCommercial-NoDerivs", description: "This license allows others to share your work unaltered, as long as they give you credit for it." },
    { id: 6, title: "Attribution (CC) NonCommercial-ShareAlike", description: "This allows others to adapt and build upon your work, even commercially, as long as they give you credit for it and apply the same terms." },
    { id: 7, title: "Attribution (CC) NoDerivs", description: "This allows others to reuse your work for any purpose, however it cannot be altered and they must give you credit for it." },
  ];

  const handleSelection = (id) => {
    const selected = licenseOptions.find(option => option.id === id);
    setSelectedOption(selected);
    onSeleccionarOpcion(selected); // Pass the selected option to the parent component
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} className="contenido-original-modal">
      <Modal.Header className="custom-modal-header">
        <button className="custom-close-button" onClick={handleClose}>
          {/* Close icon */}
        </button>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className="modal-section first" style={{display:"block", textAlign: "center", alignItems:"center"}}>
            <h5 className="contenido-original">Original Content</h5>
            <h6>Select the option</h6>
          </div>
          {licenseOptions.map((option) => (
            <div key={option.id} className="modal-section">
              <div>
              <input
                type="checkbox"
                className="checkbox-input"
                checked={selectedOption?.id === option.id}
                onChange={() => handleSelection(option.id)}
              />
              </div>
              <div>
                <h5>{option.title}</h5>
                <p>{option.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
}
