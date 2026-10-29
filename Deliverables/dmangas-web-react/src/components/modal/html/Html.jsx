import React from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Search from './Search';
import JoinUs from './JoinUs';
import AboutUs from './AboutUs';
import Promo from "./Promo";

function Html(props){   
 const {imodal, ocultarImagen, onActiveWindowChange, goBack, setGoBack} = props;
  let  content = '';
        switch(imodal) {
          case 'registro':
            content = <SignUp />;
            break
          case 'inicio':
            content = <SignIn
             ocultarImagen={ocultarImagen}
             onActiveWindowChange={onActiveWindowChange}
             goBack={goBack}
             setGoBack={setGoBack}
             ></SignIn>;
            break
          case 'buscar':
            content = <Search></Search>;
            break
          case 'unete':
            content = <JoinUs />;
            break
          case 'quienes-modal':
            content = <AboutUs />;
            break
          case "promo":
            content = <Promo />;
            break
          default:
            content = 'none';
            break
        }
        return(
            <div className='ihtmlx'>
                {content}
            </div>
        );
  
        
}
export default Html;
