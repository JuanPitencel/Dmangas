import React, { useState, useEffect } from "react";
import EndpointCore from "./Global";
import Footer from "../components/footer/Footer";
import CardGroupList from "../components/cardGroupList";
import CardGroupResume from "../components/cardGroupList/resume";
import "../assets/css/App.css";
import "../assets/css/interna.css";
import "../assets/css/movil.css";
import "../assets/css/base.css";
import axios from "axios";
import NavBar from "../components/layouts/partials/NavBar";
import NavBarPage from "../components/layouts/partials/NavBar/NavBarPage";
import Filter from "../components/filter"
import CustomImageLoader from "../components/CustomLoader/CustomImageLoader";
import BannerAdssense from "../components/BannerAdssense";
import ModalFiltro from "../components/book-filter-modal/BookFilterModal";
export default function Community() {
    const [showModal, setShowModal] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [groupRate, setGroupRate] = useState("0.0");
    const [isLoading, setIsLoading] = useState(false);
    const [groupsList, setGroupsList] = useState([]);
    const [groupShow, setGroupShow] = useState(100);
    const [orderList, setOrderList] = useState({
      id: 1,
      name: "Recommended",
    });
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
        name: "Abandoned",
      },
    ];

    const optionsOrder = [
      {
        id: 1,
        name: "Recommended",
      },
      {
        id: 2,
        name: "Latest updates",
      },
      {
        id: 3,
        name: "Most popular",
      },
      {
        id: 4,
        name: "Top rated",
      },
    ];

    const icbo = [
      { cbo: 'Type', cbo_items: [{ item: 'Manga' }, { item: 'Novel' }, { item: 'Manhwa' }, { item: 'Manhua2' }, { item: 'Doujinshi' }, { itemnpm : 'One shot' }] },
      { cbo: 'Tags', cbo_items: [{ item: 'Manga' }, { item: 'Novel' }, { item: 'Manhwa' }, { item: 'Manhua2' }, { item: 'Doujinshi' }, { item: 'One shot' }] },
      { cbo: 'Demographics', cbo_items: [{ item: 'Manga' }, { item: 'Novel' }, { item: 'Manhwa' }, { item: 'Manhua2' }, { item: 'Doujinshi' }, { item: 'One shot' }] },
      { cbo: 'By status', cbo_items: [{ item: 'Manga' }, { item: 'Novel' }, { item: 'Manhwa' }, { item: 'Manhua2' }, { item: 'Doujinshi' }, { item: 'One shot' }] }
  ];
    const getGroupsList = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
        `${EndpointCore.API_URL}/groups?withImages=true&limitPage=${groupShow}`
        );
        setGroupsList(data.items);
        console.log(data)
        
      } catch (error) {} finally{
       setIsLoading(false);
      };
    };

  const handleOrderList = (tab) => {
    const newOrder = [...groupsList];
    newOrder.sort((a, b) => {
      if (tab.id === 1) {
        if (a.groupRecommend && !b.groupRecommend) {
          return -1;
        } else if (!a.groupRecommend && b.groupRecommend) {
          return 1;
        } else {
          return 0;
        }
      }
      if (tab.id === 2) {
        const dateA = new Date(a.groupDateCreated);
        const dateB = new Date(b.groupDateCreated);
        if (dateA < dateB) {
          return 1;
        } else if (dateA > dateB) {
          return -1;
        } else {
          return 0;
        }
      }
      if (tab.id === 3) {
        return b.groupFollowers - a.groupFollowers;
      }
      if (tab.id === 4) {
        return b.groupRate - a.groupRate;
      }
    });
    setGroupsList(newOrder);
    console.log(newOrder);
  };

  useEffect(() => {
    getGroupsList();
  }, [groupShow]);

  const protocol = window.location.protocol;
  const host = window.location.host;
  const protocolAndHost = protocol + "//" + host;

  var width = window.innerWidth;
 
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const isUserLoggedIn = localStorage.getItem("token");

  return (
    <div className="interna libro comunidad ">
      <div className="interna libro comunidad">
        <div className="position_header position ">

          <NavBar /> 
          <NavBarPage /> 
        </div>  
      </div>
      <div className="ui_container ui_container--946 ">
        <div className="col01 w-100 publicidad oculta_movile">
          <div className="ui_brand titulo_seccion">
            <a href="#" className="ui_brand__a">
              Recommended
              <br /> of the day
            </a>
          </div>
          <img src={`${protocolAndHost}/img/banner/about-us.png`} alt="" />
  </div> 

        <div className="ui_col ui_container mt-5">
        
          <ul className="ui_blocks tab-head ">
            <li className="ui_blocks__li">
              <div className="ui_cols ui_cols--order_list">
                <div className="w-100 ui_col d-flex justify-content-between">
                  <div className="ui_paragraph_12 ui_paragraph_12--medium">
                    <span>Books 1-15 of 280</span>
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
                          <span id="dropdown_id">{" " + orderList.name}</span>
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
                          {optionsOrder.map((order) => (
                            <Filter order={order} setOrderList={setOrderList} handleOrderList={handleOrderList}/>
                          ))}
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
                          <span id="dropdown_id">{groupShow}</span>
                        </button>
                        <ul
                          className="dropdown-menu cbo_libro"
                          aria-labelledby="dropdownMenu2"
                        >
                          <li>
                            <button
                              className="dropdown-item dropdown-item--ui"
                              type="button"
                              onClick={() => {
                                setGroupShow(20);
                              }}
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
                              onClick={() => {
                                setGroupShow(25);
                              }}
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
                              onClick={() => {
                                setGroupShow(30);
                              }}
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
                              onClick={() => {
                                setGroupShow(35);
                              }}
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
                            <img src="img/svg/icon_order_list_1.svg" alt="" />
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
              </div>
            </li>
          </ul>
      </div>
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
       <div id="tab1" class="tabcontent" style={{ display: "block" }}>
          <ul class="ui_blocks">
            <li class="ui_blocks__li">
              <ul class="filtro-tab oculta_desktop">
                <li class="item">90 results</li>
                <li class="item"></li>
              </ul>
            </li>
          </ul>  
          {isLoading ? ( 
          <CustomImageLoader />
        ) : (
         <ul class=" ui_blocks__li ui_blocks__li--sub_tabs tab">
            <li class="sub_tabcontent active">
             <ul id="cuadricula" class="ui_cols ui_cols--books_card_button">
             <li className="col01 w-71">
             {groupsList.length > 0 &&
               groupsList.slice(0, 10).map((group, index) => (
                 <React.Fragment key={`group-section-${index}`}>
                   {index % 4 === 0 && index !== 0 && (
                    <div className="banner-container" style={{ height: '100px' }}>
                      <BannerAdssense key={`banner-${index}`} />
                    </div>
                    )}
                  <CardGroupList
                   key={`group-card-${index}`}
                   group={group}
                   index={index + 1}
                   setGroupName={setGroupName}
                   setGroupRate={setGroupRate}
                   />
                  </React.Fragment>
                ))
               }
              </li>
                <li
                  id="gris_rigth_01"
                  class="col01 w-28 gris-F5F7FA comunidad-colum-253 right-a oculta_movile p-0"
                >
                    <CardGroupResume 
                        groupName={groupName}
                        groupRate={groupRate}
                     /> 
                </li>
              </ul>
            </li>
          </ul>
        )}
                </div>
        {width <= 900 && ( <button className='bg-filtrar' onClick={handleOpenModal}> Filter </button> )}
        {showModal && ( <ModalFiltro show={showModal} onHide={handleCloseModal} icbo={icbo} /> )}          
     </div>
      <Footer />
    </div> 
  );
}

