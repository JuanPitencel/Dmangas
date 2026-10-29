import React, { useState } from "react";
import MenuLeft from "../components/menu-left";
import TabsMain from "../components/tabs-main";
import ModalComponent from "../components/ModalComponent";
import DropdownForm from "../components/dropdownForm/DropdownForm";
import Footer from "../components/footer/Footer";

export default function Profile() {
    const ArrayMap = [1, 2, 3, 4, 5, 6, 7, 8];
    const [show, setShow] = useState(false);
    const dropdownOptions = ["Option 1", "Option 2", "Option 3"];
    const handleOptionSelect = (option) => {
      console.log("Selected option:", option);
    };

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
      name: "Ongoing",
    },
    {
      id: 3,
      name: "Completed",
    },
    {
      id: 4,
      name: "Dropped",
    },
  ];

  return (
    <>
      <div className="interna comunidad_solicitudes">
        <div className="interna libro comunidad">
          <div className="position_header position ">
            <div className="seccion_interna">
              <div className="ui_container ui_container--946 book-edit">
              <div style={{ position: 'fixed',  top: '20px', bottom: '20px' , height: `calc(100vh - 40px)`,}}>
               <MenuLeft />
              </div>                
              <div className="col01 w-71 contenido" style={{marginLeft: '280px', marginBottom: '20px', marginTop: '20px',}}>
                  <div className="box body d-flex flex-column">
                    <div
                      id="anuncio01"
                      className="ui_slider"
                      style={{ overflow: "hidden" }}
                    >
                      <div className="owl-carousel owl-theme owl-loaded">
                        <div className="item">
                          <div className="banner">
                            <img
                              className="img-banner oculta_movile"
                              src="img/internal/profile/banner/profile.png"
                              alt=""
                              style={{ width: "100%" }}
                            />
                            <button
                              id="editar-perfil"
                              onClick={() => setShow(true)}
                              type="button"
                              className="btn-rosado cursor-pointer"
                              style={{ zIndex: 10, cursor: "pointer" }}
                            >
                              Edit profile
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="contenido">
                      <div className="box body" style={{ paddingLeft: 30 }}>
                        <div
                          className="box Party"
                          style={{
                            marginTop: "-20px",
                            zIndex: 100,
                            position: "relative",
                            display: "flex",
                          }}
                        >
                          <img
                            className="circulo"
                            src="img/internal/profile/logo.png"
                            alt=""
                          />
                          <div>
                            <div
                              className="circulo-texto"
                              style={{ marginTop: "30px" }}
                            >
                              We are Party
                            </div>
                          </div>
                        </div>

                        <ul className="lista-infor01">
                          <li>
                            <img src="img/internal/somos-party/p.jpg" alt="" />{" "}
                            <span>Payment via PayPal</span>
                          </li>
                          <li>
                            <img src="img/internal/somos-party/f.jpg" alt="" />
                            <span>facebook.com/AleeO/</span>
                          </li>
                          <li>
                            <img src="img/internal/profile/twitter.png" alt="" />
                            <span>twitter.com/AleeO/</span>
                          </li>
                        </ul>

                        <ul className="box ui_cols ui_cols--books_card_button">
                          <li className="col01 w-100 oculta_movile">
                            <div className="box informacion">
                              <div className="titulo">Information: </div>
                              <p>
                                Qin Tian was stranded on a desert island after
                                a shipwreck. All he has with him is a survival
                                kit and a pocketknife. He has to start from
                                scratch, building a camp, making fire, and
                                fishing to do everything he can to survive.
                                Fortunately, many beauties keep him company!
                                The school goddess, the blonde sister, the
                                fierce loli...
                              </p>
                            </div>
                          </li>
                          <li id="zona-blue" className="col01 w-100 div">
                            <div className="lbox_container">
                              <div className="estadistica oculta_desktop">
                                <ul className="d-flex">
                                  <li className="d-flex">
                                    <div className="item d-flex">
                                      8.9{" "}
                                      <img
                                        src="img/internal/community_book_detail/star_blue.png"
                                        alt=""
                                        style={{
                                          width: "10px",
                                          height: "10px",
                                        }}
                                      />
                                    </div>
                                    <div className="item">Rating</div>
                                  </li>
                                  <li className="d-flex">
                                    <div className="item">8k</div>
                                    <div className="item">Followers</div>
                                  </li>
                                  <li className="d-flex">
                                    <div className="item">235</div>
                                    <div className="item">Books</div>
                                  </li>
                                  <li className="d-flex">
                                    <div className="item">1</div>
                                    <div className="item">Top</div>
                                  </li>
                                </ul>
                              </div>
                              <div className="box texto-descriptivo oculta_desktop">
                                <p>
                                  Qin Tian was stranded on a desert island
                                  after a shipwreck. All he has with him is a
                                  survival kit and a pocketknife. He has to
                                  start from scratch, building a camp, making
                                  fire, and fishing to do everything he can to
                                  survive. Fortunately, many beauties keep him
                                  company! The school goddess, the blonde
                                  sister, the fierce loli...
                                </p>
                              </div>
                              <div className="box red oculta_desktop">
                                <span>
                                  See more{" "}
                                  <img
                                    src="img/internal/community_book_detail/arrow-red.png"
                                    alt=""
                                  />
                                </span>
                              </div>
                              <div className="box nuestro-libros">
                                <h5>
                                  <img
                                    className="oculta_desktop"
                                    src="img/internal/community_book_detail/arrow-blue.png"
                                    alt=""
                                  />
                                </h5>
                              </div>
                            </div>
                            <div className="box grid-tab">
                              <TabsMain
                                optionTabs={optionTabs}
                                setTab={setTab}
                                tab={tab}
                              />

                              <ul className="ui_blocks tab-head oculta_movile">
                                <li className="ui_blocks__li">
                                  <div className="ui_cols ui_cols--order_list mb-4">
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
                                            <span id="dropdown_id">
                                              Recommended
                                            </span>
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
                                                <span className="libro_titulo">
                                                  SORTED BY
                                                </span>
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
                                                <span>
                                                  Latest updates
                                                </span>
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
                                                src="img/svg/icon_order_list_1.svg"
                                                alt=""
                                              />
                                            </figure>
                                          </li>
                                          <li className="ui_order_list_button__item">
                                            <figure>
                                              <img
                                                src="img/svg/icon_order_list_2.svg"
                                                alt=""
                                              />
                                            </figure>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                              <div
                                id="tab1"
                                className="tabcontent"
                                style={{ display: "block" }}
                              >
                                <div className="box">
                                  <ul
                                    className="catalogo custom-grid"
                                    style={{
                                      display: "grid",
                                      gridTemplateColumns: "repeat(3, 159px)",
                                      gridColumnGap: "60px",
                                      gridRowGap: "10px",
                                    }}
                                  >
                                    {ArrayMap.map(() => (
                                      <li className="ibanner">
                                        <div
                                          className="item"
                                          style={{ width: "100%", margin: 0 }}
                                        >
                                          <img
                                            src="img/internal/tab01/1.png"
                                            alt=""
                                            style={{
                                              width: "100%",
                                              height: "100",
                                              margin: 0,
                                            }}
                                          />
                                        </div>
                                        <div className="item text">
                                          Love Me Gently
                                        </div>
                                        <div className="ui_recommended_tag">
                                          <span style={{ color: "white" }}>
                                            Novel
                                          </span>
                                        </div>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="hide_movil footer-menu">
                 <Footer />
                </div>               
               </div>         
              </div>   
            </div>
          </div>
        </div>

        
      </div>
      
      <ModalComponent show={show} setShow={setShow}>
        <div className="modal-body">
          <div className="titulo-blue p-3">EDIT PROFILE</div>
          <div
            className="ui_btn_close "
            data-dismiss="modal "
            onClick={() => setShow(false)}
          >
            <figure className="ui_btn_close__figure">
              <img
                loading="lazy "
                src="img/svg/icon_close_FFFFFF.svg "
                alt=""
              />
            </figure>
          </div>
          <div className="box fom-profile">
            <div className="d-flex flex-column">
              <div className="box form">
                <div className="ibillete">
                  <span className="mb-0" style={{ fontSize: 14 }}>
                    ABOUT YOU
                  </span>
                  <p className="mb-5">Tell us more about the book</p>
                </div>
                <div className="ibillete">
                  <div className="group-date historia">
                    <span>Nickname</span>
                    <input className="" type="text" />
                  </div>
                  <div className="group-date historia">
                    <span>First name</span>
                    <input className="" type="text" />
                  </div>
                </div>

                <div className="ibillete">
                  <div className="group-date historia">
                    <span>Last name</span>
                    <input className="" type="text" />
                  </div>
                  <div className="group-date historia">
                    <DropdownForm
                      options={dropdownOptions}
                      onSelect={handleOptionSelect}
                      label={"Select your country"}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column px-4">
                <span>What gender do you identify with?</span>

                <div className="d-flex justify-content-between w-50">
                  <div className="d-flex">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue
                    />
                    <span>Male</span>
                  </div>
                  <div className="d-flex">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue
                    />
                    <span>Female</span>
                  </div>
                  <div className="d-flex">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue
                    />
                    <span>Other</span>
                  </div>
                </div>
                <div
                  className="group-date historia mt-4"
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #5F36DA",
                    boxShadow: "0px 1px 1px rgba(51, 154, 240, 0.1)",
                    borderRadius: "8px",
                    maxWidth: "100%",
                    height: "108px",
                    padding: "5px 20px",
                    display: "inline-block",
                    marginRight: "30px",
                    width: "100%",
                    marginBlock: 0,
                  }}
                >
                  <span>Description</span>
                  <textarea className="w-100" rows={3}></textarea>
                </div>
              </div>

              <div className="w-100 p-2 d-flex justify-content-center">
                <button
                  id="guardar-cambios"
                  type="button"
                  className="btn-rosado mt-4 px-1"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </ModalComponent>
    </>
  );
}
