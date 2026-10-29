import '../assets/css/App.css';
import '../assets/css/interna.css';
import '../assets/css/movil.css';
import {React, useState} from "react";
import Menu from '../components/menu/Menu';
import Tabs from '../components/tab/Tabs';
import Dropdown from '../components/dropdown/Dropdown';
import Footer from '../components/footer/Footer';
import FooterC from '../components/footer/html/FooterC';
import Banner from '../components/banner/Banner';
import ModalFiltro from '../components/book-filter-modal/BookFilterModal';

function Books() {
    const protocol = window.location.protocol;
    const host = window.location.host;
    const protocolAndHost = protocol + "//" + host;
    const items_banner = [{ foto_movil: '/img/banner/bg_banner_home_books.jpg', foto: '/img/banner/bg_banner_home_books.jpg', texto: `Our   Books` }];
    const ibanner = [{ foto_movil: '/img/banner/slider-transparent.png', foto: '/img/banner/slider-transparent.png', texto: `` }];

    const itab = [
        { selected: 'true', href: 'comedia', texto: 'Comedy' },
        { selected: 'false', href: 'drama', texto: 'Drama' },
        { selected: 'false', href: 'fantasia', texto: 'Fantasy' },
        { selected: 'false', href: 'accion', texto: 'Action' },
        { selected: 'false', href: 'drama2', texto: 'Drama' },
        { selected: 'false', href: 'fantasia2', texto: 'Fantasy' },
        { selected: 'false', href: 'accion2', texto: 'Action' }]

    const icbo = [
        { cbo: 'Type', cbo_items: [{ item: 'Manga' }, { item: 'Novel' }, { item: 'Manhwa' }, { item: 'Manhua2' }, { item: 'Doujinshi' }, { itemnpm : 'One shot' }] },
        { cbo: 'Tags', cbo_items: [{ item: 'Manga' }, { item: 'Novel' }, { item: 'Manhwa' }, { item: 'Manhua2' }, { item: 'Doujinshi' }, { item: 'One shot' }] },
        { cbo: 'Demographics', cbo_items: [{ item: 'Manga' }, { item: 'Novel' }, { item: 'Manhwa' }, { item: 'Manhua2' }, { item: 'Doujinshi' }, { item: 'One shot' }] },
        { cbo: 'By status', cbo_items: [{ item: 'Manga' }, { item: 'Novel' }, { item: 'Manhwa' }, { item: 'Manhua2' }, { item: 'Doujinshi' }, { item: 'One shot' }] }
    ];
    var width = window.innerWidth;
    var footerComponent = width <= 900 ? <FooterC /> : <Footer />;
    // GENRE BOOK CAROUSEL CONFIG
    var genreCarouselConfig= { rows: 1, draggable: true, slidesToShow: 4,  };
    if (width <= 900) {
        // GENRE BOOK CAROUSEL CONFIG
        genreCarouselConfig = { rows: 9, draggable: true, slidesToShow: 1,  };
    } else {
        // GENRE BOOK CAROUSEL CONFIG
        genreCarouselConfig = { rows: 1, draggable: true, slidesToShow: 4,  };
    }
    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const isUserLoggedIn = localStorage.getItem("token");

    return (
        <div className="interna libros ">
            <div className=' ui_container--946 ui_container '>
            <Menu></Menu>
            </div>
            <div className='position_top_A position'>
            
                <div className='ui_container ui_container--946'>
                

                    <div className='banner-simple '><Banner items_banner={items_banner}></Banner></div>
                </div>               
                <div className='ui_container ui_container--946'>
                    <div className="psidebar">
                        <div className='box-row subtitulo margin-button-20'>
                            <span>Filter Results </span>
                        </div>
                        <div className='box-row dropdown-blue'>{<Dropdown icbo={icbo} ></Dropdown>}</div>
                    </div>
                   <div className='pcontent'>
                    <div className='libros ' >
                    <div className=' carrusel  '>
                     <Tabs itab={itab} key_position={'tabkey002'} titulo={'Genre'}  config={genreCarouselConfig} showBanner={true}/>
                   </div>
                   </div>
                        <div className='box-row group-button limit'>
                            <button className="bg-rosado left">Previous</button>
                            <button className="bg-rosado right">Next</button>
                        </div>
                    </div>
                </div>
            </div>
               <button className='bg-filtrar oculta_desktop' onClick={handleOpenModal}> Filter </button>
              
               {showModal && ( <ModalFiltro show={showModal} onHide={handleCloseModal} icbo={icbo} /> )}
              {footerComponent}
              </div>                 
    );
}

export default Books;
