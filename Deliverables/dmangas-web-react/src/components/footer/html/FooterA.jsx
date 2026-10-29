import './footerA.css';
import {React, useState} from 'react';
function FooterA (props) {
   const link = props.link;
 //  let category = [link.category.pages];
 if(link && link.category && link.category.pages){
   const pages_category = link.category.pages;
   const pages_about_us = link.about_us.pages;
   const pages_information = link.information.pages;

 //console.log(pages_about_us);
   return(
       <div className="html-footer">
          <ul className="col-footer">
            <li className='info mensaje'>
                <ul id='mensaje' className='lista'>
                   <li className='mensaje'>WHERE THE BEST STORIES ARE BORN</li>
                   <li className="sociales">
                    <img src="/img/svg/icon_facebook_white.svg" alt="" />
                    <img src="/img/svg/icon_instagram_white.svg" alt="" />
                    <img src="/img/svg/icon_discord_white.svg" alt="" />
                    <img src="/img/svg/icon_whatsapp_white.svg" alt="" />
                    <img src="/img/svg/icon_tiktok_white.svg" alt="" />
                    <img src="/img/svg/icon_youtube_white.svg" alt="" />
                   </li>
                   <li className='derechos'><p>All rights reserved, we do not claim ownership of any project © 2022 Dmangas Online</p></li>

                </ul>
            </li>
            <li  className='info link categoria oculta_movile'>
                <ul id="categoria" className='lista'>
                   <li>Categories </li>

                   {pages_category.map((val,ind) =>
                        <li key={"category_"+ind}><img src="img/svg/icon_check_white.svg" alt="" /><a href={'/'+val.linkRelative.value}> <span className="texto-check">{val.name.value}</span></a></li>

                    )}



                  {/*  val.category.pages
                   <li><img src="img/svg/icon_check_white.svg" alt="" /> <span className="texto-check">Latest updates</span></li>
                   <li><img src="img/svg/icon_check_white.svg" alt="" /> <span className="texto-check">Recommended</span></li>
                   <li><img src="img/svg/icon_check_white.svg" alt="" /> <span className="texto-check">Genres</span></li>
                  */}
                </ul>
            </li>
            <li className='info link nosotros'>
                <ul  id="nosotros" className='lista'>
                   <li>About Us</li>
                   {
                    pages_about_us.map((val,ind) =>
                   <li id="quienes-link" key={"us_about_"+ind}><img src="img/svg/icon_check_white.svg" alt="" /><a href={'/'+val.linkRelative.value}> <span className="texto-check">{val.name.value}</span></a></li>
                   )}



                   {/*
                   <li><img src="img/svg/icon_check_white.svg" alt="" /> <a href='/#'><span className="texto-check">Terms of use</span></a></li>
                   <li><img src="img/svg/icon_check_white.svg" alt="" /> <a href='/#'><span className="texto-check">Privacy policy</span></a></li>
                   <li><img src="img/svg/icon_check_white.svg" alt="" /> <a href='/#'><span className="texto-check">Cookies</span></a></li>
                 */}

                </ul>
            </li>
            <li className='info link informacion'>
                <ul id='informacion' className='lista'>
                   <li>Information</li>
                   {
                    pages_information.map((val,ind) =>

                   <li id="open_unete"  key={"information_"+ind}><img src="img/svg/icon_check_white.svg" alt="" /><a href={'/'+val.linkRelative.value}> <span className="texto-check">{val.name.value}</span></a></li>
                   )}




                 {/*   <li><img src="img/svg/icon_check_white.svg" alt="" /> <span className="texto-check">Contact us</span></li>
                   <li id="open_unete"><img src="img/svg/icon_check_white.svg" alt="" /> <span className="texto-check">Join us</span></li> */}
                </ul>
            </li>
          </ul>
       </div>
   );
 }

}
export default FooterA;