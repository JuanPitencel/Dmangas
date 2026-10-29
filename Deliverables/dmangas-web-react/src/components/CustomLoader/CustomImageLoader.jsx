import React from "react";
import "./CustomImageLoader.css"
import loader from "../../assets/img/icon-loader-2.gif"

export default function CustomImageLoader() {
  return (
    
    <div className="Custom-Image-Loader">
      <div className="Custom-Image" >
      <img
        src={loader}
        alt="Loading"
      />
      </div>
     
      </div>
      
      
    
  );
}