import React, { useState, useEffect, useRef } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import "./style.css";
import ModaComponent from "../ModalComponent";

const DropdownAttribute = ({
  options,
  onSelect,
  label,
  initialValue,
  modalTitle,
  modalSubtitle,
  singleSelect = false,
  maxLimit,
}) => {
  const [selectedValues, setSelectedValues] = useState(
    initialValue ? (singleSelect ? [initialValue] : initialValue) : []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const dropdownRef = useRef(null); // We use a ref for the main container

  const handleOptionSelect = (option) => {
    const selectedValue = option.value || option.item;
    let newSelectedValues;

    if (singleSelect) {
      newSelectedValues = [selectedValue];
    } else {
      if (selectedValues.includes(selectedValue)) {
        newSelectedValues = selectedValues.filter(
          (value) => value !== selectedValue
        );
      } else {
        if (selectedValues.length >= maxLimit) {
          alert(`You can choose up to ${maxLimit} options for ${label}`);
          return;
        }
        newSelectedValues = [...selectedValues, selectedValue];
      }
    }

    setSelectedValues(newSelectedValues);
    onSelect(newSelectedValues);
  };

  const handleSaveSelection = () => {
    console.log("Selection saved:", selectedValues);
    setIsModalOpen(false);
  };

  const handleClickOutside = (event) => {
    // Check whether the click was outside the modal or the dropdown
    if (
      modalRef.current && !modalRef.current.contains(event.target) &&
      dropdownRef.current && !dropdownRef.current.contains(event.target)
    ) {
      // If the click is outside the modal, reset the options to the initial value
      setSelectedValues(initialValue ? (singleSelect ? [initialValue] : initialValue) : []);
      setIsModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    // Reset the selected options to the initial value when the modal closes
    setSelectedValues(initialValue ? (singleSelect ? [initialValue] : initialValue) : []);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <div className="custom-dropdown w-100" ref={dropdownRef}>
      <div
        className="d-flex justify-content-between align-items-center"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Show the label only when no options are selected */}
        {!selectedValues.length && <span>{label}</span>}

        {/* Show the text based on the selected options */}
        <span className="selected-options-text" style={{ textAlign: 'center' }}>
         {selectedValues.length > 0 && (
           singleSelect
            ? options.find(option => (option.value || option.item) === selectedValues[0])?.label || selectedValues[0]
            : label === "Demographics"
            ? selectedValues.join(", ") // For demographics, show the selected values as text
            : `${label}: ${selectedValues.length} ${selectedValues.length === 1 ? 'Selection' : 'Selections'}` // Singular or plural depending on the number of selections
          )}
        </span>
        <div className="dropdown-icon">
          {!isModalOpen ? (
            <BiChevronDown color="#5F36DA" />
          ) : (
            <BiChevronUp color="#FF0055" />
          )}
        </div>
      </div>

      <ModaComponent show={isModalOpen} setShow={setIsModalOpen} ref={modalRef}>
        <div className="modal-header text-center">
          <h3>{modalTitle}</h3>
          <h6>{modalSubtitle}</h6>
          <button
            className="custom-close-button"
            onClick={handleCloseModal} // Close the modal and reset the selection
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#ffffff"
              className="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M3.646 3.646a.5.5 0 0 1 .708 0L8 7.293l4.646-4.647a.5.5 0 1 1 .708.708L8.707 8l4.647 4.646a.5.5 0 1 1-.708.708L8 8.707l-4.646 4.647a.5.5 0 0 1-.708-.708L7.293 8 2.646 3.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </button>
        </div>
        <div className="dropdown-options-container">
          {options.map((option, index) => (
            <div key={index} className="dropdown-option">
              <input
                type="checkbox"
                className="styled-checkbox"
                checked={selectedValues.includes(option.value || option.item)}
                onChange={() => handleOptionSelect(option)}
              />
              <label>{option.label || option.item}</label>
            </div>
          ))}
        </div>

        <div className="modal-footer">
          <button className="btn btn_rosado" onClick={handleSaveSelection}>
            Save selection
          </button>
        </div>
      </ModaComponent>
    </div>
  );
};

export default DropdownAttribute;
