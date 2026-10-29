  import "../assets/css/App.css";
  import "../assets/css/movil.css";
  import React, { useEffect, useState } from "react";
  import { useNavigate } from 'react-router-dom';
  import Slider from "../components/slider/Slider";
  import Carrusel from "../components/carousel/Carousel";
  import Tabs from "../components/tab/Tabs";
  import Footer from "../components/footer/Footer";
  import FooterC from "../components/footer/html/FooterC";
  import EndpointCore from "./Global";
  import Rueda from "../components/wheel/Wheel";
  import NavBar from "../components/layouts/partials/NavBar";
  import CustomImageLoader from '../components/CustomLoader/CustomImageLoader';
  import Modal from "../components/modal/Modal";
  import useAuth from "../hook/useAuth";

  export default function Home() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(localStorage.getItem('token'));
    const [showLoginModal, setShowLoginModal] = useState(!isUserLoggedIn);
    const [width, setWidth] = useState(window.innerWidth);
    const [openModal, setOpenModal] = useState(false);
    const [recommendationRows, setRecommendationRows] = useState(2);
    const [recommendationSlideShow, setRecommendationSlideShow] = useState(3);
    const [showMoreText, setShowMoreText] = useState('Show more');
    const [itemsSlider, setItemsSlider] = useState([]);
    const [itemsLastUpdates, setItemsLastUpdates] = useState([]);
    const [itemsSelectionDay, setItemsSelectionDay] = useState([]);
    const [itemsRecommendation, setItemsRecommendation] = useState([]);
    const [sliderLoading, setSliderLoading] = useState(true);
    const [lastUpdatesLoading, setLastUpdatesLoading] = useState(true);
    const [selectionDayLoading, setSelectionDayLoading] = useState(true);
    const [recommendationLoading, setRecommendationLoading] = useState(true);

    const handleResize = () => { setWidth(window.innerWidth); };
    const limitPageLatestUpdates = 9;
    const limitPageSelectedDay = 8;
    const limitPageRecommends = 12;
    const endpointLatestUpdates = EndpointCore.lastUpdates + "&limitPage="+ limitPageLatestUpdates +"&orderDir=DESC";
    const endpointSelectedDay = EndpointCore.selectionDay + "&limitPage="+ limitPageSelectedDay +"&orderDir=DESC";
    const endpointRecommends = EndpointCore.recommends + "&limitPage="+ limitPageRecommends +"&orderDir=DESC";
    const navigate = useNavigate();
    const auth = useAuth();
    console.log(auth)
    const userId = auth?.auth?.id;

    useEffect(() => {
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    /* SLIDER */
    useEffect(() => {
      setSliderLoading(true);

      var requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: {},
      };

      fetch(EndpointCore.homeSlider, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          let data_items = [];
          result.items.forEach(i => {
            data_items.push({
              "id": i.bannerOrder + 1,
              "foto_movil": i.images[1].image.path,
              "foto": i.images[0].image.path,
              "texto": i.bannerTitle
            });
          });
          setItemsSlider(data_items);
        })
        .catch((error) => console.log("error", error))
        .finally(() => {
          setSliderLoading(false);
        });

    }, []);

    /* LAST UPDATES*/
  useEffect(() => {
    setLastUpdatesLoading(true);
    var requestOptions = {
      method: "GET", redirect: "follow", headers: {}
    };

    fetch(endpointLatestUpdates, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        let data_items = [];
        result.items.forEach((i, index) => {
          const profileImage = i.images.find(img => img.type === 'PROFILE');
          const profileImagePath = profileImage ? profileImage.image.path : '';
          data_items.push({
            "id": index + 1,
            "foto": i.images[0].image.path,
            "fotoCover": i.images.length > 1 ? (i.images[1].image.path || '') : '',
            "titulo": i.bookTitle,
            "tituloAlternativo": i.bookAlternativeTitle,
            "autor": i.groupCreated.groupName,
            "groupCode": i.groupCreated.groupCode,
            "novela": i.bookType.name.value,
            /*"GroupAutor": i.latestChapter.group.name,*/
            "time": i.bookHourLatest + " hours ago",
            "manga": (i.attributes[0] !== undefined) ? i.attributes[0].name.value.substring(0, 8) : "",
            "shoujo": i.bookType.name.value,
            /*"chapter": i.latestChapter.group.name,*/
            "bookType": i.bookType.name.value,
            "puntuacion": i.bookRate,
            "vistas": i.bookLabelViews,
            "code" : i.bookCode,
            "estado": i.bookStatus.name.value,
            "lanzamiento" : i.bookDateCreated,
            "attributes" : i.attributes,
            "contenido": i.bookContentType,
            "resumen": i.bookDescription,
            "groupAvatarImage": i.groupCreated.images[0].image.path,

          });
        });
        setItemsLastUpdates(data_items);
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setLastUpdatesLoading(false);
      });
  }, []);


    /* SELECTION DAY */
    useEffect(() => {
      setSelectionDayLoading(true);
      const requestOptions = {
        method: "GET", redirect: "follow", headers: {}
      };

      fetch(endpointSelectedDay, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          let data_items = [];
          result.items.forEach((i, index) => {
          const profileImage = i.images.find(img => img.type === 'PROFILE');
          const profileImagePath = profileImage ? profileImage.image.path : '';
            data_items.push({
            "id": index + 1,
            "texto": i.bookTitle,
            "foto": i.images[0].image.path,
            "fotoCover": i.images.length > 1 ? (i.images[1].image.path || '') : '',
            "titulo": i.bookTitle,
            "tituloAlternativo": i.bookAlternativeTitle,
            "autor": i.groupCreated.groupName,
            "groupCode": i.groupCreated.groupCode,
            "novela": i.bookType.name.value,
            /*"GroupAutor": i.latestChapter.group.name,*/
            "time": i.bookHourLatest + " hours ago",
            "manga": (i.attributes[0] !== undefined) ? i.attributes[0].name.value.substring(0, 8) : "",
            "shoujo": i.bookType.name.value,
          /* "chapter": i.latestChapter.group.name,*/
            "bookType": i.bookType.name.value,
            "puntuacion": i.bookRate,
            "vistas": i.bookLabelViews,
            "code" : i.bookCode,
            "estado": i.bookStatus.name.value,
            "lanzamiento" : i.bookDateCreated,
            "attributes" : i.attributes,
            "contenido": i.bookContentType,
            "resumen": i.bookDescription,
            "groupAvatarImage": i.groupCreated.images[0].image.path,
            });
          });
          setItemsSelectionDay(data_items);

        })
        .catch((error) => {
          console.log("error", error);
        })
        .finally(() => {
          setSelectionDayLoading(false);
        });
    }, []);

    /* RECOMMENDATION */
    useEffect(() => {
      setRecommendationLoading(true);
      const requestOptions = {
        method: "GET", redirect: "follow", headers: {}
      };

      fetch(endpointRecommends, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          let data_items = [];
          result.items.forEach((i, index) => {
            data_items.push({
              "id": index + 1,
              "foto": i.images[0].image.path,
              "fotoCover": i.images.length > 1 ? (i.images[1].image.path || '') : '',
              "titulo": i.bookTitle,
              "tituloAlternativo": i.bookAlternativeTitle,
              "autor": i.groupCreated.groupName,
              "groupCode": i.groupCreated.groupCode,
              "novela": i.bookType.name.value,
              /*"GroupAutor": i.latestChapter.group.name,*/
              "time": i.bookHourLatest + " hours ago",
              "manga": (i.attributes[0] !== undefined) ? i.attributes[0].name.value.substring(0, 8) : "",
              "shoujo": i.bookType.name.value,
            /* "chapter": i.latestChapter.group.name,*/
              "bookType": i.bookType.name.value,
              "puntuacion": i.bookRate,
              "vistas": i.bookLabelViews,
              "code" : i.bookCode,
              "estado": i.bookStatus.name.value,
              "lanzamiento" : i.bookDateCreated,
              "attributes" : i.attributes,
              "contenido": i.bookContentType,
              "resumen": i.bookDescription,
              "groupAvatarImage": i.groupCreated.images[0].image.path,
            });
          });
          setItemsRecommendation(data_items);
        })
        .catch((error) => console.log("error", error))
        .finally(() => {
          setRecommendationLoading(false);
        });

    },  []);

    const handleOpenModal = () => {
      setOpenModal(!openModal);
    };

    const toggleModal = () => {
      setOpenModal(!openModal);
    };

    const redirectToSelectionPage = () => {
      navigate('/recommended-today');
    };

    const getCarouselConfig = (type) => {
      let config;

      switch (type) {
        case 'actualization':
          config = { rows: 3, draggable: false, slidesToShow: 3 };
          break;
        case 'selectionDay':
          config = { draggable: isUserLoggedIn, swipe: isUserLoggedIn, rows: isUserLoggedIn ? 1 : 4, slidesToShow: isUserLoggedIn ? 3 : 2, };
          break;
        case 'recommendation':
          config = { rows: 1, draggable: true, swipe: true,  slidesToShow: 7 };
          break;
        case 'genre':
          config = { rows: 2, draggable: false, swipe: false, slidesToShow: 6 };
          break;
        default:
          config = { rows: 3, draggable: false, slidesToShow: 4 };
          break;
      }

      if (width <= 900) {
        switch (type) {
          case 'actualization':
            config = { ...config, rows: 1, draggable: true, swipe: true,  slidesToShow: 2, };
            break;
          case 'selectionDay':
            config = { ...config, rows: 1, draggable: true, swipe: true, slidesToShow: 2,  };
            break;
          case 'recommendation':
            config = { ...config, rows: recommendationRows, draggable: false, swipe: false,  slidesToShow: recommendationSlideShow };
            break;
          case 'genre':
            config = { ...config, rows: 2, draggable: false, swipe: false, slidesToShow: 3 };
            break;
          default:
            config.slidesToShow = 3;
            break;
        }
      }

      return config;
    };

    const configActualization = getCarouselConfig('actualization');
    const configSelectionDay = getCarouselConfig('selectionDay');
    const configRecommendation = getCarouselConfig('recommendation');
    const configGenre = getCarouselConfig('genre');

    const handleShowMoreClick = () => {
      if (recommendationRows === 2) {
        setRecommendationRows(4);
        setRecommendationSlideShow(3);
        setShowMoreText('Show less');

      } else {
        setRecommendationRows(2);
        setRecommendationSlideShow(3);
        setShowMoreText('Show more');
        window.scrollBy({
          top: -400,
          behavior: 'smooth',
        });
      }
    };
    const handleCardClick = (type, index) => {
      let item;
      switch(type) {
        case 'lastUpdates':
          item = itemsLastUpdates[index];
          break;
        case 'selectionDay':
          item = itemsSelectionDay[index];
          break;
        case 'recommendation':
          item = itemsRecommendation[index];
          break;
        default:
          item = null;
          break;
      }
      if (item) {
        const titleUrl = item.titulo.replace(/\s+/g, '-').toLowerCase(); // Replaces spaces with hyphens and converts to lowercase
        navigate(`/book-detail/${titleUrl}`, { state: { libroData: item } });
      }
    };

    return (
      <div className="App">
        <div className='position_header position'>
          <NavBar />
          <div className='ui_slider'>
            {sliderLoading ? (
              <CustomImageLoader />
            ) : (
              itemsSlider.length > 0 && <Slider itemsSlider={itemsSlider} />
            )}
          </div>
        </div>
        {isUserLoggedIn ? (
          <div className='position_top_A position'>
            <div className={width > 900 ? 'actualization container' : 'actualization'}>
              {lastUpdatesLoading ? (
                <CustomImageLoader/>
              ) : (
                <Carrusel
                  icarrusel={itemsLastUpdates}
                  key_position={'key001'}
                  titulo={'Latest Updates'}
                  config={configActualization}
                  onCardClick={(index) => handleCardClick('lastUpdates', index)} // handleCardClick for last updates
                  userId={userId}
                  isUserLoggedIn={isUserLoggedIn}
                />
              )}
            </div>
          </div>
        ) : null}

        {isUserLoggedIn ? (
          <div className='position_top_B position'>
            <div className={width > 900 ? 'selection_day container' : 'selection_day'}>
              <div className='rueda hide_movil'><Rueda /></div>
              {selectionDayLoading ? (
                <CustomImageLoader/>
              ) : (
                <Carrusel
                  icarrusel={itemsSelectionDay}
                  key_position={'key002'}
                  titulo={'Our pick of the day'}
                  config={configSelectionDay}
                  onCardClick={(index) => handleCardClick('selectionDay', index)} // handleCardClick for selection day
                  userId={userId}
                  isUserLoggedIn={isUserLoggedIn}
                  />
              )}
              <button id="btn-more-selection" type="button" onClick={redirectToSelectionPage}>Show more</button>
            </div>
          </div>
        ) : (
          <div className='position_top_A position' style={{ paddingTop: '40px' }}>
            <div className="btn-selectionDay-nologin">
              <span>Log in to enjoy all the content </span>
              <button className="btn-rosado" onClick={handleOpenModal}> Log in </button>
            </div>
            <div className={width > 900 ? 'selection_day_no_login container' : 'selection_day_no_login'}>
              {openModal && (
                <Modal imodal={'inicio'} isOpen={openModal} onClose={toggleModal} />
              )}
              {selectionDayLoading ? (
                <CustomImageLoader/>
              ) : (
                <div className="container-carrusel">
                  <Carrusel
                    icarrusel={itemsSelectionDay}
                    key_position={'key002'}
                    titulo={'Our pick of the day'}
                    config={configSelectionDay}
                    onCardClick={(index) => handleCardClick('selectionDay', index)} // handleCardClick for selection day
                    userId={userId}
                    isUserLoggedIn={isUserLoggedIn}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        <div className='position_top_C position'>
          <div className='container recomendation'>
            {recommendationLoading ? (
              <CustomImageLoader/>
            ) : (
              <Carrusel
                icarrusel={itemsRecommendation}
                key_position={'key003'}
                titulo={'Recommended'}
                config={configRecommendation}
                mostrarMasTexto={showMoreText}
                onClick={handleShowMoreClick}
                onCardClick={(index) => handleCardClick('recommendation', index)} // handleCardClick for recommendation
                userId={userId}
                isUserLoggedIn={isUserLoggedIn}
              />
            )}
          </div>
        </div>
        <div className='position_top_D position '>
          <div className='container  genero  '>
            <div className="carrusel">
            <Tabs
              key_position={'tabkey004'}
              titulo={'Genre'}
              config={configGenre}
              ancho={width}
            />
            </div>
          </div>
        </div>
        <Footer showModalInicio={showLoginModal} ancho={width} />
      </div>
    );
  };

