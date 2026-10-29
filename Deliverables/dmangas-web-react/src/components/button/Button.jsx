import "./style.css";
import React from "react";
function Button({ title, onClick, type }) {
  return (
    <button className="btn-rosado p-2" onClick={onClick} type={type ? type : 'button'}>
      {title}
    </button>
  );
}
export default Button;
