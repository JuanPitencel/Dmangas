import React from "react";
import "../../assets/css/App.css";
import "../../assets/css/interna.css";
import "../../assets/css/movil.css";
import "../../assets/css/base.css";

export default function index({ optionTabs, setTab, tab }) {
  return (
    <div className="ui_header_nav">
      <ul className="ui_header_nav__ul scrollyeah d-flex">
        {optionTabs.map((tabs) => (
          <li className="ui_header_nav__li">
            <button
              className={`ui_header_nav__a tablinks ${
                tabs.id === tab.id && "ui_active"
              }`}
              onClick={() => setTab(tabs)}
            >
              {tabs.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
