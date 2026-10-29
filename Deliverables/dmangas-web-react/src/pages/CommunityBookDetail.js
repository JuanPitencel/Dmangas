import React, { useState, useEffect } from "react";
import Menu from "../components/menu/Menu";
import Banner from "../components/banner/Banner";
import EndpointCore from "./Global";
import Footer from "../components/footer/Footer";
import SectionLeftDetailComunidad from "../components/sectionLeftDetailCommunity";
import SectionMainDetailComunidad from "../components/sectionMainDetailCommunity";
import CustomImageLoader from "../components/CustomLoader/CustomImageLoader";
import "../assets/css/App.css";
import "../assets/css/interna.css";
import "../assets/css/movil.css";
import "../assets/css/base.css";
import "../assets/css/index.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import BannerDetailCommunity from "../components/BannerDetailCommunity";

export default function CommunityBookDetail() {
  const [detailGroup, setDetailGroup] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const ibanner = [
    {
      foto_movil: "/img/banner/slider-transparent.png",
      foto: "/img/banner/slider-transparent.png",
      texto: ``,
    },
  ];

  const { name } = useParams();
  const navigate = useNavigate();

  console.log(name);

  const getDetailGroup = async () => {
    const { data } = await axios.get(
      `${EndpointCore.API_URL}/groups/${name}`
    );
    console.log(data.item);
    if(data.item){
      setDetailGroup(data.item);
    }else{
      navigate('/community');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getDetailGroup();
  }, []);
  const isUserLoggedIn = localStorage.getItem("token");

  const formatTitle = (title) => {
    return title.toLowerCase().replace(/ /g, "-");
  };


  const handleBookClick = (bookTitle) => {
    const formattedTitle = formatTitle(bookTitle);
    navigate(`/book-detail/${formattedTitle}`);
  };

  return (
    <div className="interna libro comunidad d-flex flex-column">
      <div className="position_header position hide_movil">
        <div className="ui_header">
          <Menu/>
        </div>
        <div className="top-banner">
          <Banner items_banner={ibanner}></Banner>
        </div>
      </div>

      <div className="seccion_interna comunidad_detalle_libro">
        <div className="ui_container ui_container--946">
        {isLoading ? ( 
          <CustomImageLoader/> ):(
          <div className="libro_container">
            <div className="col01 w-100 publicidad oculta_movile oculta_desktop">
              <div className="ui_brand titulo_seccion"></div>
            </div> 
            <BannerDetailCommunity image={detailGroup?.images[1].image.path} />
            <div className="box Party oculta_desktop">
              <img
                className="circulo"
                src={detailGroup && detailGroup?.images[0]?.image.path}
                alt=""
              />
              <div className="circulo-texto" style={{ width: "100px" }}>
                <h2 className="text-truncate">
                  {detailGroup && detailGroup.groupName}
                </h2>
              </div>
            </div>
            <ul className="box ui_cols ui_cols--books_card_button">
              <SectionLeftDetailComunidad detailGroup={detailGroup} />
              <SectionMainDetailComunidad detailGroup={detailGroup} handleBookClick={handleBookClick}/>
            </ul>
          </div>
            )};
        </div>
      </div>
      <Footer />
    </div>
  );
}
