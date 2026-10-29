import '../assets/css/App.css';
import '../assets/css/interna.css';
import '../assets/css/movil.css';
import {React, useState, useEffect} from "react";
import Menu from '../components/menu/Menu';
import NavBar from '../components/layouts/partials/NavBar';
import NavBarPage from '../components/layouts/partials/NavBar/NavBarPage';
import Tabs from '../components/tab/Tabs';
import Dropdown from '../components/dropdown/Dropdown';
import Footer from '../components/footer/Footer';
import FooterC from '../components/footer/html/FooterC';
import Banner from '../components/banner/Banner';
import ModalFiltro from '../components/book-filter-modal/BookFilterModal';
import EndpointCore from "./Global";
import BuscadorMovil from '../components/mobile-search/MobileSearch';

function RecommendedToday() {
    const [itemsSelectionDay, setItemsSelectionDay] = useState([]);
    const [selectionDayLoading, setSelectionDayLoading] = useState(true);
    const limitPageSelectedDay = 3;
    const limitPageRecommends = 6;
    const endpointSelectedDay = EndpointCore.selectionDay + "&limitPage="+ limitPageSelectedDay +"&orderDir=DESC";
    const endpointRecommends = EndpointCore.recommends + "&limitPage="+ limitPageRecommends +"&orderDir=DESC";
    
    const protocol = window.location.protocol;
    const host = window.location.host;
    const protocolAndHost = protocol + "//" + host;
    const items_banner = [{ foto_movil: '/img/banner/bg_banner_home_books.jpg', foto: '/img/banner/bg_banner_home_books.jpg', texto: `Today's Recommendations` }];
    const ibanner = [{ foto_movil: '/img/banner/slider-transparent.png', foto: '/img/banner/slider-transparent.png', texto: `` }];
    const igenero = [
        { id: 1, foto: `${protocolAndHost}/img/card/bg_card_genders_1.jpg`, texto: "Love Me Gently", capitulo: "chapter", novela: "Novel", autor: "Group: Big Another Boyang", time: "3 hours ago", manga: "Manga", shoujo: "Shoujo", puntuacion: "8.9", vistas: "20.5k" },
        { id: 2, foto: `${protocolAndHost}/img/card/bg_card_genders_2.jpg`, texto: "Love Me Gently", capitulo: "chapter", novela: "Novel", autor: "Group: Big Another Boyang", time: "3 hours ago", manga: "Manga", shoujo: "Shoujo", puntuacion: "8.9", vistas: "20.5k" },
        { id: 3, foto: `${protocolAndHost}/img/card/bg_card_genders_3.jpg`, texto: "Love Me Gently", capitulo: "chapter", novela: "Novel", autor: "Group: Big Another Boyang", time: "3 hours ago", manga: "Manga", shoujo: "Shoujo", puntuacion: "8.9", vistas: "20.5k" },
        { id: 4, foto: `${protocolAndHost}/img/card/bg_card_genders_3.jpg`, texto: "Love Me Gently", capitulo: "chapter", novela: "Novel", autor: "Group: Big Another Boyang", time: "3 hours ago", manga: "Manga", shoujo: "Shoujo", puntuacion: "8.9", vistas: "20.5k" },
        { id: 5, foto: `${protocolAndHost}/img/card/bg_card_genders_5.jpg`, texto: "Love Me Gently", capitulo: "chapter", novela: "Novel", autor: "Group: Big Another Boyang", time: "3 hours ago", manga: "Manga", shoujo: "Shoujo", puntuacion: "8.9", vistas: "20.5k" },
        { id: 6, foto: `${protocolAndHost}/img/card/bg_card_genders_6.jpg`, texto: "Love Me Gently", capitulo: "chapter", novela: "Novel", autor: "Group: Big Another Boyang", time: "3 hours ago", manga: "Manga", shoujo: "Shoujo", puntuacion: "8.9", vistas: "20.5k" },
        { id: 7, foto: `${protocolAndHost}/img/card/bg_card_genders_7.jpg`, texto: "Love Me Gently", capitulo: "chapter", novela: "Novel", autor: "Group: Big Another Boyang", time: "3 hours ago", manga: "Manga", shoujo: "Shoujo", puntuacion: "8.9", vistas: "20.5k" },
        { id: 8, foto: `${protocolAndHost}/img/card/bg_card_genders_8.jpg`, texto: "Love Me Gently", capitulo: "chapter", novela: "Novel", autor: "Group: Big Another Boyang", time: "3 hours ago", manga: "Manga", shoujo: "Shoujo", puntuacion: "8.9", vistas: "20.5k" },
        { id: 9, foto: `${protocolAndHost}/img/card/bg_card_genders_9.jpg`, texto: "Love Me Gently", capitulo: "chapter", novela: "Novel", autor: "Group: Big Another Boyang", time: "3 hours ago", manga: "Manga", shoujo: "Shoujo", puntuacion: "8.9", vistas: "20.5k" },
        { id: 10, foto: `${protocolAndHost}/img/card/bg_card_genders_10.jpg`, texto: "Love Me Gently", capitulo: "chapter", novela: "Novel", autor: "Group: Big Another Boyang", time: "3 hours ago", manga: "Manga", shoujo: "Shoujo", puntuacion: "8.9", vistas: "20.5k" },
        { id: 11, foto: `${protocolAndHost}/img/card/bg_card_genders_1.jpg`, texto: "Love Me Gently", capitulo: "chapter", novela: "Novel", autor: "Group: Big Another Boyang", time: "3 hours ago", manga: "Manga", shoujo: "Shoujo", puntuacion: "8.9", vistas: "20.5k" },
        { id: 12, foto: `${protocolAndHost}/img/card/bg_card_genders_2.jpg`, texto: "Love Me Gently", capitulo: "chapter", novela: "Novel", autor: "Group: Big Another Boyang", time: "3 hours ago", manga: "Manga", shoujo: "Shoujo", puntuacion: "8.9", vistas: "20.5k" }
    ];
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
    /*SELECTION DAY*/
    useEffect(() => {
        setSelectionDayLoading(true);
        const requestOptions = {
            method: "GET", redirect: "follow", headers: {}
        };
    
            fetch(endpointSelectedDay, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    let data_items = [];
                    result.items.forEach((i, index) => {
                        data_items.push({
                            "id": index + 1,
                            "foto": i.images[0].image.path,
                            "texto": i.bookTitle,
                            "capitulo": "21",//i.latestChapter.group.name,
                            "novela": i.bookType.name.value,
                            "autor": "Group: Big Another Boyang", //Set up API
                            "time": i.bookHourLatest + " hours ago",
                            "manga": "Seinen",//i.attributes.name.value,
                            "shoujo": "Novel",//i.bookType.name.value,
                            "puntuacion": i.bookRate,
                            "vistas": i.bookLabelViews
                        });
                        console.log(result)
                    });
                    setItemsSelectionDay(data_items);
                   
                })
                .catch((error) => {
                    console.log("error", error);
                })
                .finally(() => {
                    setSelectionDayLoading(false);
                });
    }, []);
    
    var width = window.innerWidth;
    var footerComponent = width <= 900 ? <FooterC /> : <Footer />;
    // RECOMMENDED OF THE DAY CAROUSEL CONFIG
    var dayConfig = { rows: 8, draggable: true, slidesToShow: 2,  };
    if (width <= 900) {
        // RECOMMENDED OF THE DAY CAROUSEL CONFIG
        dayConfig = { rows: 3, draggable: true, slidesToShow: 3,  };
    } else {
        // RECOMMENDED OF THE DAY CAROUSEL CONFIG
        dayConfig = { rows: 8, draggable: true, slidesToShow: 2,  };
    }
    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
  
    return (
        <div>
        <div className="interna  recommended-today">
        <div className='buscador'>
         <a href="/" >
          <img src='./img/svg/icon_arrow_5F36DA.svg' style={{ width: 20, transform: 'rotate(90deg)', marginLeft: '10px'}}></img> 
          </a>
         <BuscadorMovil />
         </div>
        <div className="position_header position">
          
          <NavBar />
          <NavBarPage />
        </div>
      
      <div className= 'container' >
        <div className="col01 w-100 publicidad oculta_movile">
          <div className="ui_brand titulo_seccion">
            <a href="#" className="ui_brand__a">
              Recommended
              <br /> of the day
            </a>
          </div>
          <img src={`${protocolAndHost}/img/banner/about-us.png`} alt="" />
        </div>
                <div className='container '>
                    <div className="psidebar">
                        <div className='box-row subtitulo margin-button-20'>
                            <span>Filter Results </span>
                        </div>
                        <div className='box-row dropdown-blue'>{<Dropdown icbo={icbo} ></Dropdown>}</div>
                        <div className='box-row group-button'>
                            <button className="bg-rosado">Filter</button>
                            <button className="bg-transparente-azul">Clear Filter</button>
                        </div>
                    </div>
                   <div className='pcontent'>
                    <div> 
                    <div className=' carrusel  '>            
        <Tabs itab={itab} key_position={'tabkey002'} titulo={'Recommended of the day'} icarrusel={itemsSelectionDay} config={dayConfig} showBanner={true}/>
                   </div> 
                   </div> 
                        <div className='box-row group-button limit'>
                            <button className="bg-rosado left">Previous</button>
                            <button className="bg-rosado right">Next</button>
                          
                        </div>
                    </div>
                </div>
            </div>
               
              
               {showModal && ( <ModalFiltro show={showModal} onHide={handleCloseModal} icbo={icbo} /> )}
              {footerComponent}
              </div>
              </div>
           
        
    );
}

export default RecommendedToday;