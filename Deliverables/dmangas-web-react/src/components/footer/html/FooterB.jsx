import './footerB.css';
import React from 'react'

function FooterB () {
   function closePinkBanner() {
      let pinkBanner = document.getElementById("modal-pink");
       pinkBanner.classList.add("hide_movil");
   }

   return(
         <div id='modal-pink' className="footer_movil_rosado hide_desk">
            <div className="play-rosado">
               <img className='img01' src="/img/svg/icon_play.svg" alt="" />
               <div className="texto">
                <div className='titulo'>Continue reading:</div>
                <div className='subtitulo'>Wan Gu Shen Wang | Ch. 02 </div>
               </div>
               <img onClick={closePinkBanner} className='img02' src="/img/svg/icon_close_mobile.svg" alt="" />
            </div>
         </div>
   );
}
export default FooterB;