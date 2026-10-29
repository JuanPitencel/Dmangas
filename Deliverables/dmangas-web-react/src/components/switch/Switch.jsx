// Switch.js
import React from 'react';
import './style.css';

function Switch({ isChecked, onToggle }) {
 

  return (
    <div className={`ui_header_buttons switch01 hide_desk ${isChecked ? 'checked' : ''}`}>
      <input type="checkbox" name="my-checkbox" checked={isChecked} onChange={onToggle} />
      <div className="switch-icon"></div>
    </div>
  );
}

export default Switch;


