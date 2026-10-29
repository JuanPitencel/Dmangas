import React, { useState, useEffect } from "react";
import TabsMain from "../components/tabs-main";
import Footer from "../components/footer/Footer";
import FooterC from "../components/footer/html/FooterC";
import NavBar from "../components/layouts/partials/NavBar";
import CardLibraryNoLogin from "../components/cardLibraryNoLogin";
import ModalLibraryNoLogin from "../components/modalLibraryNoLogin";
import NavBarPage from "../components/layouts/partials/NavBar/NavBarPage";
import Menu from "../components/menu/Menu";
import "../assets/css/App.css";
import "../assets/css/interna.css";
import "../assets/css/movil.css";
import "../assets/css/base.css";
import ModalFiltro from '../components/book-filter-modal/BookFilterModal';
import EndpointCore from './Global';
import useAuth from "../hook/useAuth";

const isLoggedIn = localStorage.getItem('token');

export default function LibraryNoLogin() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [books, setBooks] = useState([]);
  const [isSelection, setIsSelection] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [isHistorial, setIsHistorial] = useState(false);
  const auth = useAuth();
  const userId = auth?.auth?.id;
  const [tab, setTab] = useState({ id: 1, name: "Following", value: "Seguidos" });
  const [orderList, setOrderList] = useState({ id: 1, name: "Recommended" });
  
  const icbo = [
    { cbo: 'Type', cbo_items: [{ item: 'Manga' }, { item: 'Novel' }, { item: 'Manhwa' }, { item: 'Manhua2' }, { item: 'Doujinshi' }, { itemnpm : 'One shot' }] },
    { cbo: 'Tags', cbo_items: [{ item: 'Manga' }, { item: 'Novel' }, { item: 'Manhwa' }, { item: 'Manhua2' }, { item: 'Doujinshi' }, { item: 'One shot' }] },
    { cbo: 'Demographics', cbo_items: [{ item: 'Manga' }, { item: 'Novel' }, { item: 'Manhwa' }, { item: 'Manhua2' }, { item: 'Doujinshi' }, { item: 'One shot' }] },
    { cbo: 'By status', cbo_items: [{ item: 'Manga' }, { item: 'Novel' }, { item: 'Manhwa' }, { item: 'Manhua2' }, { item: 'Doujinshi' }, { item: 'One shot' }] }
];

  const optionTabs = [
    { id: 1, name: "Following", value: "Seguidos" },
    { id: 2, name: "Favorites", value: "Favoritos" },
    { id: 3, name: "Discarded", value: "Descartados" },
    { id: 4, name: "History", value: "Historial" },
  ];

  const fetchBooksByStatus = async (status, userId) => {
    try {
      const response = await fetch(EndpointCore.getBooksByStatus(status, userId), {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      setBooks(data.data);
    } catch (error) {
      console.error('Error fetching books by status:', error);
    }
  };

  useEffect(() => {
    // Fetch the books based on the selected tab and reset selected books
    if (userId) {
      fetchBooksByStatus(tab.value, userId);
      setSelectedBooks([]); // Reset selected books when the tab changes
    }
  }, [tab, userId]);

  useEffect(() => {
    if (!isLoggedIn) setIsOpen(true);
  }, [isLoggedIn]);

  useEffect(() => {
    // Update isHistorial based on the selected tab
    setIsHistorial(tab.value === "Historial");
  }, [tab]);

  useEffect(() => {
    const handleScroll = () => {
      document.body.style.overflowY = isOpen ? 'hidden' : 'auto';
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  const handleOpenModalFiltro = async () => {
    try {
      setShowModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModalFiltro = () => setShowModal(false);
  const handleCloseModal = () => setIsOpen(false);

  const toggleSelection = () => setIsSelection(!isSelection);

  const handleCheckboxChange = (e, bookId) => {
    if (e.target.checked) {
      setSelectedBooks(prevSelected => [...prevSelected, bookId]);
    } else {
      setSelectedBooks(prevSelected => prevSelected.filter(id => id !== bookId));
    }
  };

  const getNewStatus = (currentTab) => {
    switch (currentTab) {
      case "Seguidos":
        return "Favoritos";
      case "Favoritos":
        return "Seguidos";
      case "Descartados":
        return "Favoritos"
      default:
        return "Favoritos ";
    }
  };
  const getNewStatus2 = (currentTab) => {
    switch (currentTab) {
      case "Seguidos":
        return "Descartados";
      case "Favoritos":
        return "Descartados";
      case "Descartados":
        return "Seguidos";
      default:
        return "Descartados";
    }
  };


  const handleChangeStatus = async (newStatus) => {
    try {
      if (selectedBooks.length === 0) {
        alert("No books selected.");
        return;
      }

      const response = await fetch(EndpointCore.changeLibraryStatus, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':  `Bearer${isLoggedIn}`,
        },
        body: JSON.stringify({
          userId,
          status: newStatus,
          bookIds: selectedBooks,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Status changed successfully:', data);
        fetchBooksByStatus(tab.value, userId);
        setSelectedBooks([]); 
      } else {
        console.error('Error changing status:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  var width = window.innerWidth;
  var footerComponent = width <= 900 ? <FooterC /> : <Footer />;

  return (
    <>
      <div className='interna biblioteca_no_login'>
        <div className="interna libro">
          <div className="position_header position">
            <div className="oculta_movile">
              <NavBar />
              <NavBarPage />
            </div>
            <div className="oculta_desktop">
              <div className="d-flex align-items-center px-2">
                <a href="/" className="brand-logo">Dmangas</a>
                <Menu />
              </div>
              <div className="hide_desk titulo-seccion">Your Library</div>
            </div>
            <div className="ui_container ui_container--946">
              <div className="seccion_interna comunidad_detalle_libro">
                <div className="oculta_movile" style={{ marginBottom: 300 }}>
                  <div className="ui_brand titulo_seccion">
                    <a href="#" className="ui_brand__a text-white">Library<br /></a>
                  </div>
                  <img className="w-100" src={`${window.location.protocol}//${window.location.host}/img/internal/community/ibanner/banner.png`} alt="" />
                </div>
                <div className="oculta_desktop" style={{ marginBottom: 100 }}>
                  <div className="ui_brand titulo_seccion">
                    <a href="#" className="ui_brand__a text-white">Your Library<br /></a>
                  </div>
                  <img className="w-100" src={`${window.location.protocol}//${window.location.host}/img/internal/community/ibanner/banner.png`} alt="" />
                </div>
                <div className="col01 w-100 publicidad oculta_movile"></div>
                <div className="contenido">
                  <div className="box body">
                    <div className="box grid-tab">
                      <div className="tab-biblioteca">
                        <TabsMain optionTabs={optionTabs} setTab={setTab} tab={tab} />
                        <div className="box botones">
                          {isSelection ? (
                            <>
                              <div className="biblioteca-icons">
                                <img src="/img/svg/deselect.svg" alt="selected" onClick={toggleSelection} />
                                <p>{selectedBooks.length} selected</p>
                              </div>
                              <div className="biblioteca-icons"
                              onClick={() => handleChangeStatus(getNewStatus(tab.value))}
                              >
                                <img
                                  src="/img/svg/moveFavorites.svg"
                                  alt="move"
                                />
                                <p>{tab.value === "Favoritos" ? "Move to Following" : "Move to Favorites"}</p>
                              </div>
                              <div className="biblioteca-icons"
                               onClick={() => handleChangeStatus(getNewStatus2(tab.value))}
                              >
                                <img
                                  src="/img/svg/discarded.svg"
                                  alt="move"
                                />
                                <p>{tab.value === "Descartados" ? "Move to Following" : "Move to Discarded"}</p>
                              </div>
                            </>
                          ) : (
                             !isHistorial && (
                            <>
                              <button className="btn btn-rosado prev" type="button" onClick={handleOpenModalFiltro}>Filter</button>
                              <button className="btn btn-rosado" type="button" onClick={toggleSelection}>Select</button>
                            </>
                            )
                          )}
                        </div>
                      </div>
                      <div id="tab1" className="tabcontent" style={{ display: "block" }}>
                      <div className="box">
                       <ul
                         className={`catalogo comunidad ${isHistorial ? 'historial-flex' : 'default-flex'}`}
                       >
                       {books?.length > 0 ? (
                        books.map((book) => (
                        <CardLibraryNoLogin
                        key={book.id}
                        book={book}
                        isSelection={isSelection}
                        handleCheckboxChange={handleCheckboxChange}
                        selectedBooks={selectedBooks}
                        isHistorial={isHistorial}
                        />
                       ))
                        ) : (
                          <p>No books to display.</p>
                        )}
                    </ul>
                   </div>
                  </div>
                      <div className="box botones pagination">
                      <button className="btn btn-rosado prev" type="button" >Previous</button>
                      <button className="btn btn-rosado next" type="button">Next</button>
                      </div>
                    </div>
                    <ModalFiltro show={showModal} onClose={handleCloseModalFiltro} icbo={icbo}/>
                    <ModalLibraryNoLogin isOpen={isOpen} onClose={handleCloseModal} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {footerComponent}
    </>
  );
}