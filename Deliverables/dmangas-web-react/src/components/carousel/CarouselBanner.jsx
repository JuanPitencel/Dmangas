import './carousel.css';
import React from "react";
import SlickCarousel from "react-slick";
import BannerAdssense from '../BannerAdssense';

export default function CarouselBanner(props) {
    const icarrusel = props.icarrusel;
    const titulo = props.titulo;
    const key_position = props.key_position;
    const config = props.config;
    const handleCardClick = props.onCardClick;

    const itemsPerBanner = 2; 

    const settings = {
        slidesToShow: config.slidesToShow,
        slidesToScroll: 8,
        centerMode: false,
        centerPadding: "0",
        arrows: false,
        rtl: false,
        draggable: config.draggable,
        swipe: config.swipe,
        variableWidth: false,
        rows: config.rows,
    };
 // Create groups of items for the carousel and banners
 const carouselGroups = [];
 for (let i = 0; i < icarrusel.length; i += itemsPerBanner) {
     const chunk = icarrusel.slice(i, i + itemsPerBanner);
     carouselGroups.push(chunk);
 }

    return (
        <div className='carrusel'>
            <div className="icard-header">
                <div className="icar-h4"><div className='mi-titulo'>{titulo}</div></div>
                <div className="icar-boton"> 
                    <a href="/#"><img className='link-simple normal hide_desk' src="/img/svg/icon_arrow_right_5028C6.svg" alt="" /></a>
                    <a href="/#"><img className='link-simple white hide_desk' src="/img/svg/icon_arrow_right_FFFFFF.svg" alt="" /></a>
                    <button type="button hide_movil">Show more</button>
                </div>
            </div>
            <div className="ui_carrusel">
                {carouselGroups.map((group, index) => (
                    <div key={`group-${index}`} className="carrusel-group">
                        <SlickCarousel {...settings}>
                            {group.map((v, i) => (
                                <div key={key_position + i} className="icar item cd" onClick={() => handleCardClick(index * itemsPerBanner + i)}>
                                <div className="info-container">
                                    <div className="info-foto">
                          <ul>
                            <li className='picture'>
                              <div className='content-foto'>
                              <div className={`form-check`}>
                                <input className="form-check-input" type="checkbox" defaultValue id={key_position+i+'type1'} />
                              </div>
                                <img className={`pic-estrellita`} loading="lazy" src="/img/svg/icon_poster_star.svg" alt="" />
                                <img className='pic-foto'  src={v.foto} alt="" />
                                <div className={`pic-categ`}>{v.novela}</div>
                                <div className={'pic-titulo'}> {v.titulo}</div>
                              </div>
                            </li>
                            <li  className={`form-check`}>texttext</li>
                            <li>
                              <div className={`nro`}>21</div>
                              <div  className={`subtitulo`}>Subchap.</div>
                            </li>
                          </ul>
                        </div>
                        <div className="info-descripcion">
                            <ul>
                              <li className="boton puntuacion">  
                                <div className='number'>
                                <img className={`estrellita`} loading="lazy" src="/img/svg/icon_star_purple.svg" alt="" />
                                <img className={`estrellita_white`} loading="lazy" src="/img/svg/icon_star_white.svg" alt="" />
                                <span>8.9 (53)</span>
                                </div>
                              
                              <div className="red nuevo">New</div><div className="red">{v.manga.substring(0, 6)}</div><div className="blue">{v.bookType.substring(0, 6)}</div></li>
                              <li className="titulo">{v.titulo}</li>
                              <li className="subtitulo">{v.titulo}</li>
                              <li className="descripcion">{v.autor}</li>
                              <li className="puntuacion">
                                <div className='number'><span>{v.puntuacion} </span>
                                <img className={`estrellita`} loading="lazy" src="/img/svg/icon_star_purple.svg" alt="" />
                                <img className={`estrellita_white`} loading="lazy" src="/img/svg/icon_star_white.svg" alt="" />
                                </div><span>Rating</span></li>
                              <li className="vistas nro_cap"><span>20 Chapters</span></li>
                              <li className="vistas"><div className='number'><span>{v.vistas}</span></div><span>Views</span></li>
                              <li className="time">{v.time}</li>
                            </ul>
                        </div>
                        </div>
                        <div className="linea_completa"></div>
                        <div className="linea_completa2">
                          <div className="linea_media_left" />
                          <div className="linea_media_right" />
                        </div>
                    </div>                      
                            ))}                 
                        </SlickCarousel>
                        {props.showBanner && (
                                <div className='banner-container'>
                                    <BannerAdssense />
                                </div>
                            )}
                    </div>
                ))}
            </div>
        </div>
    );
}

