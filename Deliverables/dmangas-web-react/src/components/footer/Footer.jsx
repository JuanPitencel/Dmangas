import './style.css';
import React, { useEffect, useState } from 'react';
import FooterB from './html/FooterB';
import FooterC from './html/FooterC';
import Modal from '../../components/modal/Modal';
import Bottom from '../layouts/partials/Footer/Bottom/';

export default function Footer(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModalInicio = props.showModalInicio === undefined ? false : props.showModalInicio;
  const [link, setlink] = useState(null);
  const isUserLoggedIn = localStorage.getItem('token');
  const ancho = props.ancho;

  useEffect(() => {
    if (!isUserLoggedIn && showModalInicio) {
      setIsModalOpen(true); 
    }
  }, [isUserLoggedIn, showModalInicio]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>  
     <div >
      <div className="position_footer position">
        <Bottom />
        <FooterB> </FooterB>
       
        <div className="container footer complemento">
          <div className="icard-header">
            <div className="icar-h4">
              <img src="/img/svg/brand_dmangas_white.svg" alt="" />
            </div>
            <div id="open_inicio" className='icar-boton' >
          {ancho < 900 ? (
           <button 
           type="button" 
           onClick={toggleModal}
           style={{
            border: isUserLoggedIn ? 'solid 1px white' : '',
            backgroundColor: isUserLoggedIn ? '  #5028C6' : 'white',
            color: isUserLoggedIn ? 'white' : '#5028C6'
          }}>
            {!isUserLoggedIn ? "Sign In" : "Beta Testers°"}
           </button>
           ) : (
             !isUserLoggedIn && (
               <button type="button" onClick={toggleModal}>
                Sign In
              </button>
             )
           )}
         </div>
        </div>
      </div>
    </div>
      <div className='inicio'>
      </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={toggleModal} imodal={'inicio'} /> 
        <div className="container footer footerc hide_desk">
          <FooterC></FooterC>
        </div>
    </>
  );
}
