import React, { useState, useEffect, useRef } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import "./style.css";

const Dropdown = ({ options, onSelect, label, initialValue }) => {
  const [selectedValue, setSelectedValue] = useState(initialValue);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference to the dropdown container

  // Function to handle clicks outside the dropdown
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false); // Close the dropdown if the click was outside it
    }
  };

  // Add and clean up the event listener in the useEffect
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedValue(option.item || option);
    onSelect(option);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState); // Toggle the dropdown's open state
  };

  const handleChevronClick = (event) => {
    event.stopPropagation(); // Prevent the arrow click from closing the dropdown if it's already open
    toggleDropdown();
  };

  return (
    <div
      className="custom-dropdown-custom w-100"
      ref={dropdownRef} // Assign the reference to the dropdown container
    >
      <div className="d-flex" onClick={toggleDropdown}>
        {/* Show the label only if no option is selected */}
        {!selectedValue && <span>{label}</span>}

        {/* Show the selected value in the center when there is an option */}
        {selectedValue && (
          <span className="selected-text" style={{ textAlign: "center" }}>
            {selectedValue}
          </span>
        )}

        <div className="dropdown-icon" onClick={handleChevronClick}>
          {!isOpen ? (
            <BiChevronDown color="#5F36DA" />
          ) : (
            <BiChevronUp color="#FF0055" />
          )}
        </div>
      </div>

      {isOpen && (
        <ul className="dropdown-menu-custom">
          {options.map((option, index) => (
            <li key={index} onClick={() => handleOptionSelect(option.item || option)}>
              {option.item || option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
