
import React from 'react';
import OwlCarousel from 'react-owl-carousel';
 import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css'; 
import './slider.css';

function Slider(props) {
    const numItemsBySlider = 1;
    let sliderData = props.itemsSlider;
    const options = {
       /*    items: numItemsBySlider,
        stagePadding: 40,
      loop: true,
         autoplaySpeed: 2000,
         autoplay: true,
        dots: true,
        nav: false,
        margin: 0 , */
        loop: true,
                autoplay: true,
                autoplayTimeout: 3000,
                margin: 0,
                dots: true,
                nav: false,
                touchDrag: false,
                mouseDrag: false,
                responsive: {
                    0: {
                        items: numItemsBySlider,
                    },
                    600: {
                        items: numItemsBySlider,
                    },
                    1000: {
                        items: numItemsBySlider,
                    },
                }, 
    };
    return(
        <OwlCarousel 
            className='owl-themes'
            {...options}>
        {
            sliderData.map((value, i) =>                   
                <div key={"slider01_"+i} className="item">
                    <div className="banner">
                        <img className="img-banner hide_movil" src={value.foto} alt="" />
                        <img className="img-banner hide_desk" src={value.foto_movil} alt="" />
                            <div className='container-slider'>
                                <div className="banner-anuncio">                              
                                    {value.texto}
                                </div>
                           </div>
                    </div>
                </div>
            )
        } 
        </OwlCarousel>
    );
}
export default Slider;