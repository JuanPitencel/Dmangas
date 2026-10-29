import React from "react";

export default function index({order, setOrderList, handleOrderList}) {
  return (
    <li>
      <button
        className="dropdown-item dropdown-item--ui"
        type="button"
        onClick={() => {
          setOrderList(order);
          handleOrderList(order);
        }}
      >
        <div className="ui_dropdown_circle">
          <div className="ui_dropdown_circle__check"></div>
        </div>
        <span>{order.name}</span>
      </button>
    </li>
  );
}
