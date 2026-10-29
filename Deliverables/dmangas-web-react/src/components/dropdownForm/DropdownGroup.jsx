import React, { useState, useEffect, useRef } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import "./style.css";

const DropdownGroup = ({ options, onSelect, label }) => {
  const [selectedId, setSelectedId] = useState();
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
    setSelectedId(option.id);
    onSelect(option.id); // Pass the id to onSelect
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
      <div className="d-flex align-items-center" onClick={toggleDropdown}>
        {/* Show the label only if no option is selected */}
        {!selectedId && <span>{label}</span>}

        {/* Show the selected option when it exists */}
        {selectedId && (
          <div className="selected-option d-flex align-items-center" style={{ width: "100%" }}>
            {options.find((option) => option.id === selectedId).images?.[0]?.base64 && (
              <img
                src={`data:image/png;base64,${options.find((option) => option.id === selectedId).images[0].base64}`}
                alt={`Group ${selectedId}`}
                className="group-image"
              />
            )}
            <span style={{ textAlign: "center" }}>
              {options.find((option) => option.id === selectedId).name}
            </span>
          </div>
        )}

        <div className="dropdown-icon" style={{ marginRight: "30px" }} onClick={handleChevronClick}>
          {!isOpen ? (
            <BiChevronDown color="#5F36DA" />
          ) : (
            <BiChevronUp color="#FF0055" />
          )}
        </div>
      </div>

      {isOpen && (
        <ul className="dropdown-menu-custom">
          {options.map((option) => (
            <li
              key={option.id}
              onClick={() => handleOptionSelect(option)}
              className="d-flex align-items-center"
            >
              {option.images?.[0]?.base64 && (
                <div className="group-image">
                  <img
                    src={`data:image/png;base64,${option.images[0].base64}`}
                    alt={`Group ${option.id}`}
                    className="dropdown-image"
                  />
                </div>
              )}
              <span>{option.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownGroup;
