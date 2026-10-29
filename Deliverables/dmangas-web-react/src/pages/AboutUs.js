import '../assets/css/App.css';
import '../assets/css/interna.css';
import '../assets/css/movil.css';
import React from "react";
import PageLayout from "../components/layouts/PageLayout";

export default function Us() {
    
    return (
       <PageLayout 
            alias={'us'}
            customClass={'nosotros'}
            customContentClass={'itexto quienes'}
        />
      
    );
};