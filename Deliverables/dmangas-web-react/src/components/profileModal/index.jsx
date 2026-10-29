import React from "react";
import MenuLeft from "../menu-left/index";
import "./profile.css"

export default function index() {
  return (
     
      <div className=" p-4 w-full profile-modal"  >
     
        
               <MenuLeft hideLogo={true} hideBuscar={true} isNavBar={true}/>
      </div>
    );
  }
