import React, { useState } from "react";
import TabsMain from "../tabs-main";
import Card from "../cardMainDetailCommunity";

export default function SectionMainDetailCommunity({ detailGroup, handleBookClick }) {
  const [tab, setTab] = useState({
    id: 1,
    name: "All",
  });
  const optionTabs = [
    {
      id: 1,
      name: "All",
    },
    {
      id: 2,
      name: "Followed",
    },
    {
      id: 3,
      name: "Saved",
    },
    {
      id: 4,
      name: "Dropped",
    },
  ];
  const protocol = window.location.protocol;
  const host = window.location.host;
  const protocolAndHost = protocol + "//" + host;
  return (
    <li id="zona-blue" className="col01 w-71 div">
      <div className="lbox_container">
        <div className="estadistica oculta_desktop">
          <ul>
            <li>
              <div className="item">
                8.9{" "}
                <img
                  src={`${protocolAndHost}/img/internal/community_book_detail/star_blue.png`}
                  alt=""
                />
              </div>
              <div className="item">Rating</div>
            </li>
            <li>
              <div className="item">8k</div>
              <div className="item">Followers</div>
            </li>
            <li>
              <div className="item">235</div>
              <div className="item">Books</div>
            </li>
            <li>
              <div className="item">1</div>
              <div className="item">Top</div>
            </li>
          </ul>
        </div>
        <div className="box texto-descriptivo oculta_desktop">
          <p>
            Qin Tian was stranded on a deserted island after a shipwreck. All
            he has equipped is a survival system and a pocketknife. He has to
            start from scratch. Building a camp, making fire, and fishing, he
            has to do everything he can to survive. Fortunately, plenty of
            beauties keep him company! The school goddess, the blonde sister,
            the violent loli...
          </p>
        </div>
        <div className="box red oculta_desktop">
          <span>
            See more{" "}
            <img
              src={`${protocolAndHost}/img/internal/community_book_detail/arrow-red.png`}
              alt=""
            />
          </span>
        </div>
        <div className="box nuestro-libros">
          <h5>
          Our Books  {" "}
            <img
              className="oculta_desktop"
              src={`${protocolAndHost}/img/internal/community_book_detail/arrow-blue.png`}
              alt=""
            />
          </h5>
        </div>
      </div>
      <div className="box grid-tab">
        <TabsMain optionTabs={optionTabs} setTab={setTab} tab={tab} />

        <ul className="ui_blocks tab-head oculta_movile">
          <li className="ui_blocks__li">
            <div className="ui_cols ui_cols--order_list">
              <div className="ui_col">
                <div className="ui_paragraph_12 ui_paragraph_12--medium">
                  <span>Books 1-15 of 280</span>
                </div>
              </div>

              <div className="ui_col">
                <div className="ui_order_list">
                  <div className="ui_order_list--dropdown dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenu2"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Sort by:
                      <span id="dropdown_id">Recommended</span>
                    </button>
                    <ul
                      className="dropdown-menu cbo_libro"
                      aria-labelledby="dropdownMenu2"
                    >
                      <li>
                        <button
                          className="dropdown-item dropdown-item--ui"
                          type="button"
                        >
                          <span className="libro_titulo">SORTED BY</span>
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item dropdown-item--ui"
                          type="button"
                        >
                          <div className="ui_dropdown_circle">
                            <div className="ui_dropdown_circle__check"></div>
                          </div>
                          <span>Latest updates</span>
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item dropdown-item--ui"
                          type="button"
                        >
                          <div className="ui_dropdown_circle">
                            <div className="ui_dropdown_circle__check"></div>
                          </div>
                          <span>Recommended</span>
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item dropdown-item--ui"
                          type="button"
                        >
                          <div className="ui_dropdown_circle">
                            <div className="ui_dropdown_circle__check"></div>
                          </div>
                          <span>Most popular</span>
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item dropdown-item--ui"
                          type="button"
                        >
                          <div className="ui_dropdown_circle">
                            <div className="ui_dropdown_circle__check"></div>
                          </div>
                          <span>Top rated</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="ui_order_list--dropdown dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenu2"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Show:
                      <span id="dropdown_id">15</span>
                    </button>
                    <ul
                      className="dropdown-menu cbo_libro"
                      aria-labelledby="dropdownMenu2"
                    >
                      <li>
                        <button
                          className="dropdown-item dropdown-item--ui"
                          type="button"
                        >
                          <div className="ui_dropdown_circle">
                            <div className="ui_dropdown_circle__check"></div>
                          </div>
                          <span>20</span>
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item dropdown-item--ui"
                          type="button"
                        >
                          <div className="ui_dropdown_circle">
                            <div className="ui_dropdown_circle__check"></div>
                          </div>
                          <span>25</span>
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item dropdown-item--ui"
                          type="button"
                        >
                          <div className="ui_dropdown_circle">
                            <div className="ui_dropdown_circle__check"></div>
                          </div>
                          <span>30</span>
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item dropdown-item--ui"
                          type="button"
                        >
                          <div className="ui_dropdown_circle">
                            <div className="ui_dropdown_circle__check"></div>
                          </div>
                          <span>35</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                  <ul className="ui_order_list_button tabs">
                    <li className="ui_order_list_button__item active">
                      <figure>
                        <img
                          src={`${protocolAndHost}/img/svg/icon_order_list_1.svg`}
                          alt=""
                        />
                      </figure>
                    </li>
                    <li className="ui_order_list_button__item">
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
        <div id="tab1" className="tabcontent" style={{ display: "block" }}>
          <div className="box ">
            <ul className="catalogo">
              {detailGroup && detailGroup.books.length > 0 ? (
                detailGroup.books.map((book) => <Card key={book.bookId} book={book} handleBookClick={handleBookClick}/>)
              ) : (
                <h2 style={{height: 50}}>No books published yet</h2>
              )}
            </ul>
          </div>
        </div>
      </div>
      {detailGroup && detailGroup.books.length > 0 && (
        <div className="box more">
          <button>Show more</button>
        </div>
      )}
      <div className="box miembros">
        <div className="blue-circle"></div>
        <div className="titulo">Members</div>
        <div className="avatares">
          <ul className="list-avatares">
            <li className="item">
              <div className="avatar">
                <img
                  src={`${protocolAndHost}/img/internal/members/1.png`}
                  alt=""
                />
              </div>
              <div className="avatar-text">
                <ul>
                  <li className="nombre">MarrioHG</li>
                  <li className="cargo">Leader</li>
                </ul>
              </div>
            </li>
            <li className="item">
              <div className="avatar">
                <img
                  src={`${protocolAndHost}/img/internal/members/2.png`}
                  alt=""
                />
              </div>
              <div className="avatar-text">
                <ul>
                  <li className="nombre">MarrioHG</li>
                  <li className="cargo">Leader</li>
                </ul>
              </div>
            </li>
            <li className="item">
              <div className="avatar">
                <img
                  src={`${protocolAndHost}/img/internal/members/3.png`}
                  alt=""
                />
              </div>
              <div className="avatar-text">
                <ul>
                  <li className="nombre">MarrioHG</li>
                  <li className="cargo">Leader</li>
                </ul>
              </div>
            </li>
            <li className="item">
              <div className="avatar">
                <img
                  src={`${protocolAndHost}/img/internal/members/4.png`}
                  alt=""
                />
              </div>
              <div className="avatar-text">
                <ul>
                  <li className="nombre">MarrioHG</li>
                  <li className="cargo">Leader</li>
                </ul>
              </div>
            </li>
            <li className="item">
              <div className="avatar">
                <img
                  src={`${protocolAndHost}/img/internal/members/5.png`}
                  alt=""
                />
              </div>
              <div className="avatar-text">
                <ul>
                  <li className="nombre">MarrioHG</li>
                  <li className="cargo">Leader</li>
                </ul>
              </div>
            </li>
            <li className="item">
              <div className="avatar">
                <img
                  src={`${protocolAndHost}/img/internal/members/6.png`}
                  alt=""
                />
              </div>
              <div className="avatar-text">
                <ul>
                  <li className="nombre">MarrioHG</li>
                  <li className="cargo">Leader</li>
                </ul>
              </div>
            </li>
            <li className="item">
              <div className="avatar">
                <img
                  src={`${protocolAndHost}/img/internal/members/7.png`}
                  alt=""
                />
              </div>
              <div className="avatar-text">
                <ul>
                  <li className="nombre">MarrioHG</li>
                  <li className="cargo">Leader</li>
                </ul>
              </div>
            </li>
            <li className="item">
              <div className="avatar">
                <img
                  src={`${protocolAndHost}/img/internal/members/8.png`}
                  alt=""
                />
              </div>
              <div className="avatar-text">
                <ul>
                  <li className="nombre">MarrioHG</li>
                  <li className="cargo">Leader</li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="botones">
          <button className="unirse" type="button">
            <img
              src={`${protocolAndHost}/img/internal/members/user_rose.png`}
              alt=""
            />{" "}
            Join
          </button>
          <button className="more" type="button">
            Show more
          </button>
        </div>
      </div>
    </li>
  );
}
