import React from "react";
import '../../assets/css/App.css';
import '../../assets/css/movil.css';

export default function TabHead() {
  return (
    <ul class="ui_blocks tab-head oculta_movile">
      <li class="ui_blocks__li">
        <div class="ui_cols ui_cols--order_list">
          <div class="ui_col">
            <div class="ui_paragraph_12 ui_paragraph_12--medium">
              <span>Books 1-15 of 280</span>
            </div>
          </div>

          <div class="ui_col">
            <div class="ui_order_list">
              <div class="ui_order_list--dropdown dropdown">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenu2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Sort by:
                  <span id="dropdown_id">Recommended</span>
                </button>
                <ul
                  class="dropdown-menu cbo_libro"
                  aria-labelledby="dropdownMenu2"
                >
                  <li>
                    <button
                      class="dropdown-item dropdown-item--ui"
                      type="button"
                    >
                      <span class="libro_titulo">SORTED BY</span>
                    </button>
                  </li>
                  <li>
                    <button
                      class="dropdown-item dropdown-item--ui"
                      type="button"
                    >
                      <div class="ui_dropdown_circle">
                        <div class="ui_dropdown_circle__check"></div>
                      </div>
                      <span>Latest updates</span>
                    </button>
                  </li>
                  <li>
                    <button
                      class="dropdown-item dropdown-item--ui"
                      type="button"
                    >
                      <div class="ui_dropdown_circle">
                        <div class="ui_dropdown_circle__check"></div>
                      </div>
                      <span>Recommended</span>
                    </button>
                  </li>
                  <li>
                    <button
                      class="dropdown-item dropdown-item--ui"
                      type="button"
                    >
                      <div class="ui_dropdown_circle">
                        <div class="ui_dropdown_circle__check"></div>
                      </div>
                      <span>Most popular</span>
                    </button>
                  </li>
                  <li>
                    <button
                      class="dropdown-item dropdown-item--ui"
                      type="button"
                    >
                      <div class="ui_dropdown_circle">
                        <div class="ui_dropdown_circle__check"></div>
                      </div>
                      <span>Top rated</span>
                    </button>
                  </li>
                </ul>
              </div>
              <div class="ui_order_list--dropdown dropdown">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenu2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Show:
                  <span id="dropdown_id">15</span>
                </button>
                <ul
                  class="dropdown-menu cbo_libro"
                  aria-labelledby="dropdownMenu2"
                >
                  <li>
                    <button
                      class="dropdown-item dropdown-item--ui"
                      type="button"
                    >
                      <div class="ui_dropdown_circle">
                        <div class="ui_dropdown_circle__check"></div>
                      </div>
                      <span>20</span>
                    </button>
                  </li>
                  <li>
                    <button
                      class="dropdown-item dropdown-item--ui"
                      type="button"
                    >
                      <div class="ui_dropdown_circle">
                        <div class="ui_dropdown_circle__check"></div>
                      </div>
                      <span>25</span>
                    </button>
                  </li>
                  <li>
                    <button
                      class="dropdown-item dropdown-item--ui"
                      type="button"
                    >
                      <div class="ui_dropdown_circle">
                        <div class="ui_dropdown_circle__check"></div>
                      </div>
                      <span>30</span>
                    </button>
                  </li>
                  <li>
                    <button
                      class="dropdown-item dropdown-item--ui"
                      type="button"
                    >
                      <div class="ui_dropdown_circle">
                        <div class="ui_dropdown_circle__check"></div>
                      </div>
                      <span>35</span>
                    </button>
                  </li>
                </ul>
              </div>
              <ul class="ui_order_list_button tabs">
                <li class="ui_order_list_button__item active">
                  <figure>
                    <img src="img/svg/icon_order_list_1.svg" alt="" />
                  </figure>
                </li>
                <li class="ui_order_list_button__item">
                  <figure>
                    <img src="img/svg/icon_order_list_2.svg" alt="" />
                  </figure>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </li>
    </ul>
  );
}
