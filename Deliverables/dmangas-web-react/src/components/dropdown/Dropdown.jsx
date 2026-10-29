import React, { useState } from 'react';
import './style.css';

const Dropdown = (props) => {
  const icbo = props.icbo;
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleToggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleCheckboxChange = (value) => {
    setSelectedOptions((prevSelectedOptions) =>
      prevSelectedOptions.includes(value)
        ? prevSelectedOptions.filter((item) => item !== value)
        : [...prevSelectedOptions, value]
    );
  };

  const handleClearFilters = () => {
    setSelectedOptions([]);
  };

  return (
    <div className='bg'>
      <div className="accordion" id="accordionExample">
        {icbo.map((value, i) => (
          <div key={'acord-item' + i} className="accordion-item">
            <h2 className="accordion-header" id={'headingOne' + i}>
              <button
                className={`accordion-button ${openIndex === i ? '' : 'collapsed'}`}
                type="button"
                onClick={() => handleToggle(i)}
                aria-expanded={openIndex === i ? 'true' : 'false'}
                aria-controls={'collapseOne' + i}
              >
                {value.cbo}
              </button>
            </h2>
            <div
              id={'collapseOne' + i}
              className={`accordion-collapse collapse ${openIndex === i ? 'show' : ''}`}
              aria-labelledby={'headingOne' + i}
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                {value.cbo_items.map((val, e) => (
                  <div key={'acord-item-one' + e} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={'type1' + i + e}
                      checked={selectedOptions.includes(val.item)}
                      onChange={() => handleCheckboxChange(val.item)}
                    />
                    <label className="form-check-label" htmlFor={'type1' + i + e}>
                      {val.item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='dropdown-footer'>
        <div className='group-button'>
          <button className="bg-rosado">
            Filter
          </button>
          <button
            className="bg-transparente-azul"
            onClick={handleClearFilters}
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;

