import './assets/css/App.css';
import './assets/css/movil.css';
import React from "react";
import Menu from './components/menu/Menu';
import Slider from './components/slider/Slider';
import Carousel from './components/carousel/Carousel';
import Tabs from './components/tab/Tabs';
import Footer from './components/footer/Footer';
import FooterB from './components/footer/html/FooterB';
import FooterC from './components/footer/html/FooterC';
import Modal from './components/modal/Modal';
import Wheel from './components/wheel/Wheel';

function App() {

    const menuItems = [
        { texto: 'Home', url: 'index.html' }, { texto: 'About Us', url: 'quienes_somos.html' }, { texto: 'Books', url: 'libros.html' }, { texto: 'Community', url: '/#' }, { texto: 'Library', url: '/#' }];

        const sliderItems = [
        { foto_movil: 'slider01_movil.png', foto: 'slider01-desktop.png', texto: `Let's live this adventure together!!` },
        { foto_movil: 'slider02_movil.png', foto: 'slider02-desktop.png', texto: `Let's live this magical adventure together!!` },
        { foto_movil: 'slider03_movil.png', foto: 'slider03-desktop.png', texto: `Let's live this magical adventure together!!` },
        { foto_movil: 'slider04_movil.png', foto: 'slider04-desktop.png', texto: `Let's live this magical adventure together!!` }
    ];
    const carouselItems = [
        { id: 1, foto: 'bg_card_latest_update_1.jpg' },
        { id: 2, foto: 'bg_card_latest_update_1.jpg' },
        { id: 3, foto: 'bg_card_latest_update_1.jpg' },
        { id: 4, foto: 'bg_card_latest_update_1.jpg' },
        { id: 5, foto: 'bg_card_latest_update_1.jpg' },
        { id: 6, foto: 'bg_card_latest_update_1.jpg' },
        { id: 7, foto: 'bg_card_latest_update_1.jpg' },
        { id: 8, foto: 'bg_card_latest_update_1.jpg' },
        { id: 9, foto: 'bg_card_latest_update_1.jpg' },
        { id: 10, foto: 'bg_card_latest_update_1.jpg' },
        { id: 11, foto: 'bg_card_latest_update_1.jpg' },
        { id: 12, foto: 'bg_card_latest_update_1.jpg' }
    ]
    const tabItems = [
        { selected: 'true', href: 'comedia', texto: 'Comedy' },
        { selected: 'false', href: 'drama', texto: 'Drama' },
        { selected: 'false', href: 'fantasia', texto: 'Fantasy' },
        { selected: 'false', href: 'accion', texto: 'Action' },
        { selected: 'false', href: 'drama2', texto: 'Drama' },
        { selected: 'false', href: 'fantasia2', texto: 'Fantasy' },
        { selected: 'false', href: 'accion2', texto: 'Action' },
        { selected: 'false', href: 'fantasia3', texto: 'Fantasy' },
        { selected: 'false', href: 'todos', texto: 'View all' }]
    return (
        <div className="App">
            <div className='position_header position'>
                <div className='ui_header'><Menu items_menu={menuItems}></Menu></div>
                <Slider items_slider={sliderItems}></Slider>
            </div>
            <div className='position_top_A position'>
                <div className='container actualization'>
                    <Carousel icarrusel={carouselItems} key_position={'key001'} titulo={'Latest Updates'}></Carousel>



                    {/* <div className="ui_cols ui_cols--bg_elements">
                        <div className="ui_col">
                            <div className="ui_bg_circle">
                                <figure className="ui_bg_circle__figure">
                                    <img src="/img/svg/ellipse.svg" alt="" />
                                </figure>
                            </div>
                        </div>
                        <div className="ui_col" />
                    </div> */}



                </div>
                <Wheel></Wheel>
            </div>
            <div className='position_top_B position'>

                <div className='container selection_day'>
                    <Carousel icarrusel={carouselItems} key_position={'key002'} titulo={'Our pick of the day'}></Carousel>
                </div>
            </div>
            <div className='position_top_C position'>
                <div className='container recomendation'>
                    <Carousel icarrusel={carouselItems} key_position={'key003'} titulo={'Recommended'}></Carousel>
                </div>
            </div>
            <div className='position_top_D position'>
                <div className='container genero'>
                    <Tabs itab={tabItems} key_position={'tabkey004'} titulo={'Genre'} icarrusel={carouselItems}></Tabs>
                </div>
            </div>
            <div className='position_footer position'>
                <div className='container footer'>
                    <Footer></Footer>
                    <div className='inicio-login'><Modal imodal={'inicio'}></Modal></div>
                    <div className='buscar'><Modal imodal={'buscar'}></Modal></div>
                    <div className='registro'><Modal imodal={'registro'}></Modal></div>
                </div>
                <div className='container footer footerb hide_desk'>
                    <FooterB></FooterB>
                </div>
                <div className='container footer footerc hide_desk'>
                    <FooterC></FooterC>
                </div>
                <div className='container footer complemento hide_movil'>
                    <div className="icard-header">
                        <div className="icar-h4"><img src="/img/svg/brand_dmangas_white.svg" alt="" /></div>
                        <div className="icar-boton">
                            <button type="button">Log in</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;