import './style.css';
import React from 'react';
function  Banner(props) {
    const  items_banner = props.items_banner;
           return(
            <div className="banner">
                {
                items_banner.map((value, i) =>
                <div key={"banner_" + i} className="" style={{ width: 'auto', height: props.heightAuto ? 'auto' : '303px' }}>
                      <img className="img-banner" src={value.foto} alt=""  />
                        <div className='container-slider'>
                              <div className="banner-anuncio">
                              <a href="/">
                                {value.texto}
                              </a>

                              <span className='hide_desk'></span>
                              </div>
                        </div>
                </div>
                 )}
            </div>
          );
}
export default Banner;

