import React from "react";
import SlickCarousel from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import EndpointCore from '../../pages/Global';
import toastr from "toastr";

export default function Carousel(props) {
  const { icarrusel, titulo, key_position, config, onClick, mostrarMasTexto, onCardClick, userId, isUserLoggedIn } = props;
  const { slidesToShow, rows, draggable, swipe } = config;

  const handleAddToLibrary = async (userId, bookCode) => {
    const url = EndpointCore.userLibraryGet(userId, bookCode); 
    const putUrl = EndpointCore.userLibraryPut(userId, bookCode); 
    try {
      const checkResponse = await fetch(url, { method: 'GET' });

      if (!checkResponse.ok) {
        toastr.error('Error checking whether the book is already in the library');
        return;
      }

      const isBookInLibrary = await checkResponse.json();

      if (isBookInLibrary.exists) {
        const updateResponse = await fetch(putUrl, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'Favoritos' }),
        });

        if (updateResponse.ok) {
          toastr.success('Status updated in your library');
        } else {
          toastr.error('Error updating the book in the library');
        }
      } else {
        const createResponse = await fetch(EndpointCore.userLibraryPost, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, bookCode, status: 'Favoritos' }),
        });

        if (createResponse.ok) {
          toastr.success('Book added to your library');
        } else {
          toastr.error('Error adding the book to the library');
        }
      }
    } catch (error) {
      console.error('Error managing the user library:', error);
      toastr.error('There was an error managing the library');
    }
  };

  const settings = {
    slidesToShow: slidesToShow,
    slidesToScroll: 3,
    centerMode: false,
    centerPadding: "0",
    arrows: true,
    rtl: false,
    draggable: draggable,
    variableWidth: true,
    rows: rows,
    swipe: swipe,
    responsive: [
      {
        breakpoint: 2500,
        settings: {
          slidesToShow: slidesToShow,
          variableWidth: false,      
        },
      },
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: slidesToShow,
          variableWidth: false,
        },      
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: slidesToShow,
          variableWidth: false,
        },
      },
      {
        breakpoint: 776,
        settings: {
          slidesToShow: slidesToShow,
          rows: rows,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: slidesToShow,
          centerPadding: "20px",
          rows: rows,
        },
      },
    ],
  };

  const handleStarClick = (event, bookCode) => {
    event.stopPropagation(); // Prevents the click from propagating to the card container
    handleAddToLibrary(userId, bookCode);
  };


  return(   
    <div className='carrusel'> 
      <div className="icard-header">
        <div className="icar-h4">
          <div className='mi-titulo'>{titulo}</div>
        </div>
        <div className="icar-boton"> 
          <a href="/#">
            <img className='link-simple normal hide_desk ' src="/img/svg/icon_arrow_right_5028C6.svg" alt="" />
          </a>
          <a href="/#">
            <img className='link-simple white hide_desk ' src="/img/svg/icon_arrow_right_FFFFFF.svg" alt="" />
          </a>
          <button type="button" className="hide_movil" onClick={onClick}>
            {mostrarMasTexto || "Show more"}
          </button>
        </div>
      </div>       
      <div className="ui_carrusel">       
        <SlickCarousel {...settings}>
          {
            icarrusel.map((v, i) =>            
              <div key={key_position + i} className="icar item cd" onClick={() => onCardClick(i)}>
                <div className={`pic-nuevos-capitulos`}><span>New chapters</span></div>
                <div className="info-container">
                  <div className="info-foto">
                    <ul>
                      <li className='picture'>
                        <div className='content-foto'>
                          <div className={`form-check`}>
                            <input className="form-check-input" type="checkbox" defaultValue id={key_position + i + 'type1'} />
                          </div>
                          {isUserLoggedIn && (
                          <img 
                            className={`pic-estrellita`} 
                            loading="lazy" 
                            src="/img/svg/icon_poster_star.svg" 
                            alt="" 
                            onClick={(e) => handleStarClick(e, v.code)}                           
                            />
                            )}
                          <img className='pic-foto' src={v.foto} alt="" />
                          <div className={`pic-categ`}>{v.bookType}</div>
                          <div className={'pic-titulo'}>{v.titulo}</div>  
                        </div>
                      </li>
                      <li className={`form-check`}>texttext</li>
                      <li>
                        <div className={`nro`}>21</div>
                        <div className={`subtitulo`}>Subchap.</div>
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
                        <div className="red nuevo">{v.bookType}</div>
                        <div className="red">{v.manga.substring(0, 6)}</div>
                        <div className="blue">{v.shoujo.substring(0, 6)}</div>
                      </li>
                      <li className="titulo">{v.titulo}</li>
                      <li className="descripcion">{v.author}</li>
                      <li className='resumen'>{v.resumen}</li>
                      <li className="puntuacion">
                        <div className='number'>
                          <span>{v.puntuacion}</span>
                          <img className={`estrellita`} loading="lazy" src="/img/svg/icon_star_purple.svg" alt="" />
                          <img className={`estrellita_white`} loading="lazy" src="/img/svg/icon_star_white.svg" alt="" />
                        </div>
                        <span>"Rating"</span>
                      </li>
                      <li className="vistas nro_cap"><span>Ch.02</span></li>
                      <li className="vistas">
                        <div className='number'>
                          <span>{v.vistas}</span>
                        </div>
                        <span>Views</span>
                      </li>
                      <li className="time">{v.time}</li>
                      <li className="editorial">Group: {v.autor}</li>
                    </ul>
                  </div>
                </div>
                <div className="linea_completa"></div>
                <div className="linea_completa2">
                  <div className="linea_media_left" />
                  <div className="linea_media_right" />
                </div>
              </div>        
            )
          }
        </SlickCarousel>         
      </div>  
    </div>
  );
}


