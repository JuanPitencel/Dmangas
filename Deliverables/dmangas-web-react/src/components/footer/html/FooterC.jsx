import './footerC.css';
import React, { useState , useEffect } from 'react';
import Modal from '../../modal/Modal';

function FooterC (props, {style,}) {  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModalInicio = props.showModalInicio === undefined ? false : props.showModalInicio;
    const [link, setlink] = useState(null);
    const isUserLoggedIn = localStorage.getItem('data');
     
    const {titulo1,
        titulo2,
        titulo3,
        titulo4,
        href1,
        href2,
        href3,
        href4,
        img1 = {
          gris: '/img/svg/icon_navigation_1_gray.svg',
          color: '/img/svg/icon_navigation_1_color.svg'
      },
      img2 = {
          gris: '/img/svg/icon_navigation_2_gray.svg',
          color: '/img/svg/icon_navigation_2_color.svg'
      },
      img3 = {
          gris: '/img/svg/icon_navigation_3_gray.svg',
          color: '/img/svg/icon_navigation_3_color.svg'
      },
      img4 = {
          gris: '/img/svg/icon_navigation_4_gray.svg',
          color: '/img/svg/icon_navigation_4_color.svg'
      },
      } = props;
    
    useEffect(() => {
      // Checks whether the user is not logged in to show the Sign In modal and the sign-in button.
      if (!isUserLoggedIn && showModalInicio) {
        setIsModalOpen(true); // open modal
      }
    }, [isUserLoggedIn, showModalInicio]);
  
    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    }; 
   return(
       <div className="html-footer" style={style}>
        <ul className='footer-white'>
            <li>
               <a href={href1 || './'}>
                        <img className='gris' src={img1.gris} alt="" />
                        <img className='color' src={img1.color} alt="" />
                    <span>{titulo1|| 'For You'}</span>
                </a>
            </li>
            <li>
               <a href={href2 || './books'}>
                        <img className='gris' src={img2.gris} alt="" />
                        <img className='color' src={img2.color} alt="" />
                    <span>{titulo2|| 'Books'}</span>
                </a>
            </li>
            <li>
               <a href={href3 || './community'}>
                        <img className='gris' src={img3.gris} alt="" />
                        <img className='color' src={img3.color} alt="" />
                    <span>{titulo3|| 'Community'}</span>
                </a>
            </li>
            <li>
               <a href={href4 || './library'}>
                        <img className='gris' src={img4.gris} alt="" />
                        <img className='color' src={img4.color} alt="" />
                    <span>{titulo4|| 'Library'}</span>
                </a>
            </li>
        </ul>
        <Modal isOpen={isModalOpen} onClose={toggleModal} imodal={'inicio'} /> 
       </div>      
   );      
}
export default FooterC;