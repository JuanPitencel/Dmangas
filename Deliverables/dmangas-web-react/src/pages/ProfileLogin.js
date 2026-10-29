import React, { useState } from "react";
import Menu from "../components/menu/Menu";
import Banner from "../components/banner/Banner";
import Footer from "../components/footer/Footer";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import TabsMain from "../components/tabs-main";

export default function Profile() {
    const ArrayMap = [1, 2, 3, 4, 5, 6, 7, 8];
  const [tab, setTab] = useState({
    id: 1,
    name: "Comedy",
  });

  const optionTabs = [
    {
      id: 1,
      name: "Comedy",
    },
    {
      id: 2,
      name: "Drama",
    },
    {
      id: 3,
      name: "Fantasy",
    },
    {
      id: 4,
      name: "Action",
    },
  ];
  const ibanner = [
    {
      foto_movil: "/img/banner/slider-transparent.png",
      foto: "/img/banner/slider-transparent.png",
      texto: ``,
    },
  ];

  const protocol = window.location.protocol;
  const host = window.location.host;
  const protocolAndHost = protocol + "//" + host;

  return (
    <div className="interna libro comunidad d-flex flex-column">
      <div className="position_header position hide_movil">
        <div className="ui_header">
          <Menu />
        </div>
        <div className="top-banner">
          <Banner items_banner={ibanner}></Banner>
        </div>
      </div>
      <div className="oculta_desktop">
        <div className="d-flex align-items-center px-2 ">
          <a href="/" className="brand-logo ">
            Dmangas
          </a>
          <Menu />
        </div>
      </div>
      <div className="seccion_interna comunidad_detalle_libro">
        <div className="ui_container ui_container--946">
          <div id="anuncio01" className="ui_slider">
            <div className="owl-carousel owl-theme owl-loaded">
              <div className="owl-stage-outer">
                <div className="item oculta_movile">
                  <div className="banner">
                    <img
                      className="img-banner"
                      src="img/internal/profile_login/slider/slider.png"
                      alt=""
                    />
                    <div className="banner-anuncio">
                      Let's live
                      <br /> this Magical
                      <br /> Adventure
                      <br /> together !!
                    </div>
                  </div>
                </div>
                <div className="oculta_desktop">
                  <div className="banner">
                    <img
                      className="img-banner oculta_movile"
                      src="img/internal/profile_login/slider/slider.png"
                      alt=""
                    />
                    <img
                      className="img-banner"
                      src="img/internal/profile_login/slider/slider.png"
                      alt=""
                    />
                    <div className="banner-anuncio">
                      Let's live
                      <br /> this Magical
                      <br /> Adventure
                      <br /> together !!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="contenido">
            <div className="box body"></div>
          </div>
        </div>

        <div className="section-contenido">
          <div className="contenido--946">
            <div className="box carrusel-titulo">
              <h4>Pick of the day</h4>
            </div>
            <Swiper
              slidesPerView={5}
              spaceBetween={30}
              pagination={{
                clickable: false,
              }}
              className="mySwiper oculta_movile"
            >
              {ArrayMap.map(() => (
                <SwiperSlide>
                  <li style={{ position: "relative", width: 159, height: 210 }}>
                    <img src={`${protocolAndHost}/img/catalog/1.jpg`} alt="" />
                    <p
                      style={{
                        width: "100%",
                        position: "absolute",
                        bottom: 0,
                        zIndex: 10,
                        color: "white",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      The Emperor's Proposal{" "}
                    </p>
                  </li>
                </SwiperSlide>
              ))}
            </Swiper>
            <Swiper
              slidesPerView={2}
              spaceBetween={30}
              pagination={{
                clickable: false,
              }}
              className="mySwiper px-2 oculta_desktop"
            >
              {ArrayMap.map(() => (
                <SwiperSlide>
                  <li style={{ position: "relative", height: 210 }}>
                    <img
                      src={`${protocolAndHost}/img/catalog/1.jpg`}
                      alt=""
                      style={{ width: "100%", borderRadius: 10 }}
                    />
                    <p
                      style={{
                        width: "100%",
                        position: "absolute",
                        bottom: 0,
                        zIndex: 10,
                        color: "white",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      The Emperor's Proposal{" "}
                    </p>
                  </li>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="section-contenido section-F5F7FA">
            <div className="contenido--946">
              <div className="box carrusel-titulo">
                <h4>Latest updates</h4>
              </div>
              <div className="btn-ver-mas">
                <button className="btn-ver-mas-blue" type="button">
                  Show more
                </button>
              </div>
              <ul className="carrusel02">
                <li className="item d-flex">
                  <img src="img/catalog/1.jpg" alt="" />
                  <div className="info-carrusel">
                    <span className="time">3 hours ago </span>
                    <span className="titulo">The Emperor's Proposal </span>
                    <span className="capitulo">ch. 02 </span>
                    <span className="sub">Big Another Boyang Group</span>
                  </div>
                </li>
                <li className="item d-flex">
                  <img src="img/catalog/2.jpg" alt="" />
                  <div className="info-carrusel">
                    <span className="time">3 hours ago </span>
                    <span className="titulo">My Guardian Demon </span>
                    <span className="capitulo">ch. 02 </span>
                    <span className="sub">Big Another Boyang Group</span>
                  </div>
                </li>
                <li className="item d-flex">
                  <img src="img/catalog/3.jpg" alt="" />
                  <div className="info-carrusel">
                    <span className="time">3 hours ago </span>
                    <span className="titulo">Boyfred </span>
                    <span className="capitulo">ch. 02 </span>
                    <span className="sub">Big Another Boyang Group</span>
                  </div>
                </li>
                <li className="item d-flex">
                  <img src="img/catalog/1.jpg" alt="" />
                  <div className="info-carrusel">
                    <span className="time">3 hours ago </span>
                    <span className="titulo">The Emperor's Proposal </span>
                    <span className="capitulo">ch. 02 </span>
                    <span className="sub">Subtitle</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="section-contenido section-blue">
            <div className="contenido--946 recomendados mb-4">
              <div className="box carrusel-titulo ">
                <h4>Recommended</h4>
              </div>
              <div className="btn-ver-mas">
                <button className="btn-ver-mas-white" type="button">
                  Show more
                </button>
              </div>
              <Swiper
                slidesPerView={5}
                spaceBetween={30}
                pagination={{
                  clickable: false,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper oculta_movile"
              >
                {ArrayMap.map(() => (
                  <SwiperSlide>
                    <li style={{ position: "relative" }}>
                      <img
                        src="img/catalog/19.jpg"
                        alt=""
                        style={{ height: 201, borderRadius: 10 }}
                      />
                      <div className="info-carrusel">
                        <span
                          className="titulo text-white"
                          style={{ fontWeight: "bold" }}
                        >
                          The Emperor's Proposal
                        </span>
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          width: 25,
                          height: 25,
                          top: 20,
                          right: 5,
                        }}
                      >
                        <img
                          loading="lazy"
                          src="img/svg/icon_poster_star.svg"
                          alt=""
                        />
                      </div>
                      <div
                        className="ui_recommended_tag"
                        style={{
                          position: "absolute",
                          bottom: 100,
                          right: 5,
                        }}
                      >
                        <span className="text-white">Novel</span>
                      </div>
                    </li>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="px-2">
                <Swiper
                  slidesPerView={2}
                  spaceBetween={30}
                  pagination={{
                    clickable: false,
                  }}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  className="mySwiper oculta_desktop"
                >
                  {ArrayMap.map(() => (
                    <SwiperSlide>
                      <li style={{ position: "relative" }}>
                        <img
                          src="img/catalog/19.jpg"
                          alt=""
                          style={{ height: 201, borderRadius: 10 }}
                        />
                        <div className="info-carrusel">
                          <span
                            className="titulo text-white"
                            style={{ fontWeight: "bold" }}
                          >
                          The Emperor's Proposal
                          </span>
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            width: 25,
                            height: 25,
                            top: 20,
                            right: 5,
                          }}
                        >
                          <img
                            loading="lazy"
                            src="img/svg/icon_poster_star.svg"
                            alt=""
                          />
                        </div>
                        <div
                          className="ui_recommended_tag"
                          style={{
                            position: "absolute",
                            bottom: 100,
                            right: 5,
                          }}
                        >
                          <span className="text-white">Novel</span>
                        </div>
                      </li>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>

          <div className="section-contenido ">
            <div className="contenido--946">
              <div className="box carrusel-titulo">
                <h4>Genres</h4>
              </div>
              <div className="biblioteca_no_login comunidad ">
                <div className="comunidad_detalle_libro">
                  <div className="box body">
                    <div className="box grid-tab">
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
                      <TabsMain
                        optionTabs={optionTabs}
                        setTab={setTab}
                        tab={tab}
                      />{" "}
                      <div
                        id="tab1"
                        className="tabcontent"
                        style={{ display: "block" }}
                      >
                        <div className="box ">
                          <ul className="catalogo">
                            <li className="ibanner">
                              <div className="item">
                                <img src="img/internal/tab01/1.png" alt="" />
                              </div>
                              <div className="item text">
                                Love Me Gently
                              </div>
                            </li>
                            <li className="ibanner">
                              <div className="item">
                                <img src="img/internal/tab01/2.png" alt="" />
                              </div>
                              <div className="item text">The Dismissed CEO</div>
                            </li>
                            <li className="ibanner">
                              <div className="item">
                                <img src="img/internal/tab01/3.png" alt="" />
                              </div>
                              <div className="item text">Cruel Love </div>
                            </li>
                            <li className="ibanner">
                              <div className="item">
                                <img src="img/internal/tab01/4.png" alt="" />
                              </div>
                              <div className="item text">
                                The Art of War
                              </div>
                            </li>
                            <li className="ibanner">
                              <div className="item">
                                <img src="img/internal/tab01/5.png" alt="" />
                              </div>
                              <div className="item text">
                                Wan Gu Shen Wang 2.0
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
