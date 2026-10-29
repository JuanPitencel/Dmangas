import './banner.css';
import React from 'react';

export default function Banner(props) {
    const  banner = props.banner

    return(
        <div className='banner-simple top hide_movil'>
            <div className="banner">              
                    <img className="img-banner" src={ banner.imageDesktop } alt="" />
                        <div className="banner-anuncio">                              
                            <a href="/">
                                {banner.title}                           
                            </a>
                        </div>
            </div>
        </div>  
    );
};
