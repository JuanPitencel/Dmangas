import React, { useState, useEffect } from "react";
import Footer from "../components/footer/Footer";
import FooterC from "../components/footer/html/FooterC";
import MenuLeft from "../components/menu-left";
import TabsMain from "../components/tabs-main";
import FormPay from "../components/formPay";
import { useNavigate } from "react-router-dom";
import { Accordion } from "react-bootstrap";

export default function Wallet() {
  const isUserLoggedIn = localStorage.getItem("data");
  const navigate = useNavigate();

  const [tab, setTab] = useState({
    id: 1,
    name: "All",
  });
  const optionTabs = [
    {
      id: 1,
      name: "Payment method",
    },
    {
      id: 2,
      name: "Statistics",
    },
  ];

  useEffect(() => {
    if (!isUserLoggedIn) navigate("/");
  }, []);

  var width = window.innerWidth;
  var footerComponent = width <= 900 ? <FooterC
  titulo1="Profile"
  href1="/profile"
  titulo2="Wallet"
  href2="/wallet"
  titulo3="Settings"
  href3= "/my-books"
  titulo4="Trash"
  href4= "/#"
  img1={{
    gris: '/img/svg/icon_mobile/icon_user.svg',
    color: '/img/svg/icon_mobile/icon_user.svg'
  }}
  img2={{
    gris: '/img/svg/icon_navigation_2_gray.svg',
    color: '/img/svg/icon_navigation_2_gray.svg'
  }}
  img3={{
    gris: '/img/internal/book_detail/m-share.png',
    color: '/img/internal/book_detail/m-share.png'
  }}
  img4={{
    gris: '/img/internal/profile/trash.png',
    color:'/img/internal/profile/trash.png'
  }}
/> :
   <Footer />;

  return (
    <div className="interna comunidad_solicitudes">
      <div className="interna libro ">
        <div className="position_header position">
          <div className="seccion_interna">
            <div className="ui_container ui_container--946">
              <MenuLeft />
              <div className="col01 w-71 contenido">
                <div className="box header">
                  <span>Wallet</span>
                </div>
                <div className="box body">
                  <div className="box grid-tab">
                    <div className="ui_header_nav">
                      <TabsMain
                        optionTabs={optionTabs}
                        setTab={setTab}
                        tab={tab}
                      />
                    </div>
                    {tab.id === 1 ? (
                      <FormPay /> 
                    ) : (
                      <>
                        <div
                          id="tab1"
                          class="tabcontent"
                          style={{ display: "block" }}
                        >
                          <div className="box ">
                            <ul className="catalogo">
                              <li class="ibillete">
                                <span>Summary</span>
                                <div className="group-date historia">
                                  <span>From:</span>
                                  {/* <img class="ifoto" src="img/icalendar.png" alt="" /> */}
                                  <input className="" type="date" />
                                </div>
                                <div className="group-date historia">
                                  <span>To:</span>
                                  {/* <img class="ifoto" src="img/icalendar.png" alt="" /> */}
                                  <input className="" type="date" />
                                </div>
                                
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div style={{ display: "inline-block", width: "100%" }}>
                          <div className="ibillete w-100">
                            <div
                              style={{ background: "#FF0055", color: "white" }}
                            >
                              Income: S/ +50.00
                            </div>
                          </div>
                        </div>
                        <Accordion defaultActiveKey="0">
                          <Accordion.Item eventKey="0">
                          <Accordion.Header
                              className=""
                              style={{
                                height: "60px",
                                paddingBottom: 10,
                                borderBottom: "1px solid #c1c1c1",
                              }}
                            >
                              <div
                                className="w-100 d-flex"
                                style={{
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <div className="d-flex" style={{alignItems: 'center'}}>
                                  <div
                                    style={{
                                      borderRadius: "100%",
                                      overflow: "hidden",
                                      width: "40px",
                                      height: "40px",
                                      marginRight: '10px',
                                    }}
                                  >
                                    <img
                                      className="circulo"
                                      src="img/internal/profile/logo.png"
                                      alt=""
                                    />
                                  </div>
                                  <div
                                    style={{
                                      fontSize: "12px",
                                      width: "160px",
                                      marginTop: "10px",
                                      display: "flex",
                                    }}
                                  >
                                    My kingdom was transported to a distant
                                    world by Flavio Huanochiri
                                  </div>
                                </div>
                                <div
                                  style={{
                                    fontSize: "12px",
                                    marginTop: "10px",
                                  }}
                                >
                                  <div
                                    style={{
                                      color: "#5028C6",
                                      fontSize: "12px",
                                    }}
                                  >
                                    <span>S/8.00</span>
                                  </div>
                                  <div>My account</div>
                                </div>
                              </div>
                            </Accordion.Header>
                            <Accordion.Body>
                              <ul>
                                <li>The Hero's Beginning</li>
                                <li>The Hero's Beginning</li>
                                <li>The Hero's Beginning</li>
                              </ul>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="1">
                            <Accordion.Header
                              className=""
                              style={{
                                height: "60px",
                                paddingBottom: 10,
                                borderBottom: "1px solid #c1c1c1",
                              }}
                            >
                              <div
                                className="w-100 d-flex"
                                style={{
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <div className="d-flex" style={{alignItems: 'center'}}>
                                  <div
                                    style={{
                                      borderRadius: "100%",
                                      overflow: "hidden",
                                      width: "40px",
                                      height: "40px",
                                      marginRight: '10px',
                                    }}
                                  >
                                    <img
                                      className="circulo"
                                      src="img/internal/profile/logo.png"
                                      alt=""
                                    />
                                  </div>
                                  <div
                                    style={{
                                      fontSize: "12px",
                                      width: "160px",
                                      marginTop: "10px",
                                      display: "flex",
                                    }}
                                  >
                                    My kingdom was transported to a distant
                                    world by Flavio Huanochiri
                                  </div>
                                </div>
                                <div
                                  style={{
                                    fontSize: "12px",
                                    marginTop: "10px",
                                  }}
                                >
                                  <div
                                    style={{
                                      color: "#5028C6",
                                      fontSize: "12px",
                                    }}
                                  >
                                    <span>S/8.00</span>
                                  </div>
                                  <div>My account</div>
                                </div>
                              </div>
                            </Accordion.Header>
                            <Accordion.Body>
                              <ul>
                                <li>The Hero's Beginning</li>
                                <li>The Hero's Beginning</li>
                                <li>The Hero's Beginning</li>
                              </ul>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {footerComponent}
    </div>
  );
}
