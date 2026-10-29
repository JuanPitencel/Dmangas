import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FooterC from "../footer/html/FooterC"
import NavBar from "./partials/NavBar";
import NavBarPage from "./partials/NavBar/NavBarPage";
import Banner from "./partials/Banner";
import PageContent from "./partials/PageContent";
import EndpointCore from "../../pages/Global";
import Modal from "../modal/Modal";
import Footer from "../footer/Footer"

export default function PageLayout(props) {
  const pageAlias = props.alias;
  const customClass = props.customClass;
  const customContentClass = props.customContentClass;
  const [banner, setBanner] = useState({});
  const [pageHtml, setPageHtml] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const navigate = useNavigate();
  

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      headers: {},
    };
    fetch(EndpointCore.pageShow + pageAlias + "/show/es", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        let items = result.items;
        if (parseInt(items.length) > 0) { 
          if (items[0] != null) {
            if (
              items[0].banner != null &&
              items[0].banner.bannerType === "STATIC" &&
              parseInt(items[0].banner.images.length) > 0
            ) {
              let bannerObj = {
                title: items[0].banner.bannerTitle,
              };
              items[0].banner.images.map((item, index) => {
                if (item.type === "DESKTOP") {
                  bannerObj.imageDesktop = item.image.path;
                }
                if (item.type === "MOBILE") {
                  bannerObj.imageMobile = item.image.path;
                }
                return false;
              });
              if (items[0].content != null) {
                setPageHtml(items[0].content.value);
                setIsContentLoaded(true);
              }
              setBanner(bannerObj);
            }
          }
        }
      })
      .catch((error) => console.log("error", error));
  }, [pageAlias]);


  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  useEffect(() => {
    if (window.innerWidth <= 900 && isContentLoaded) {
      setIsModalOpen(true);
    }
  }, [isContentLoaded]);

  const footerStyle = {
    marginTop: "auto",
    zIndex: "1100",
  };
  const isUserLoggedIn = localStorage.getItem("token");

  return (
    <>
      <div className={`interna ${customClass}`}>

        <div className="position_header position container hide_movil">
          <NavBar />
          <NavBarPage /> 
        </div>
        <div className="position_top_A position">
         <div className="container">
            <Banner banner={banner}/>
            <div style={{display:'flex'}}>
          {pageHtml !== "" && (
            <PageContent content={pageHtml}  />
         )}
         </div>
          </div>
          </div>
          <Footer/>
        </div>
         
      <div className="quienes-modal hide_desk ">
        <Modal isOpen={isModalOpen} imodal={"quienes-modal"} onClose={closeModal} />
      </div>

      <div className="container footer footerc hide_desk" style={footerStyle}>
        <FooterC />
      </div>
    </>
  );
}