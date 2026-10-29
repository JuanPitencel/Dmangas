import "../assets/css/App.css";
import "../assets/css/interna.css";
import "../assets/css/movil.css";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import Menu from "../components/menu/Menu";
import Banner from "../components/banner/Banner";
import Footer from "../components/footer/Footer";
import Acordeon from "../components/accordion/Accordion";
import Carrusel from "../components/carousel/Carousel";
import LittleBookEdit from "../components/little-book/LittleBookEdit";
import EndpointCore from "./Global";
import ReportDropdown from "../components/report-dropdown/ReportDropdown";
import BannerAdssense from "../components/BannerAdssense";
import MenuLeft from "../components/menu-left";
import ChaptersDropdown from "../components/dropdown/ChaptersDropdown";
import CustomImageLoader from "../components/CustomLoader/CustomImageLoader";

function BookEdit() {
  const [showReportDropdown, setShowReportDropdown] = useState(false);
  const [itemsRecommendation, setItemsRecommendation] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();
  const { title } = useParams(); // Get the title parameter from the URL
  const location = useLocation();
  const [libroData, setLibroData] = useState(location.state ? location.state.libroData : null);
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    if (!libroData) {
      setIsLoading(true);
      const originalTitle = title

      fetch(`${EndpointCore.searchBookByTitle(originalTitle)}`)
        .then(response => response.json())
        .then(result => {
          if (result) {
            setLibroData(result);
            navigate(`/book-detail/${originalTitle}`); // Redirect to the book detail
          } else {
            console.log("Book not found.");
            setLibroData(null); // Make sure to handle the case where the book is not found
          }
        })
        .catch(error => {
          console.log("Error fetching book data:", error);
          setLibroData(null); // Handle errors and cases where the book cannot be retrieved
        })
        .finally(() => setIsLoading(false));

    }
  }, [libroData, title, navigate]);

  // Define width
  const width = window.innerWidth;

  const formatReleaseDate = (date) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = new Date(date).toLocaleDateString(
      "es-ES",
      options
    );
    return formattedDate.replace(/\sde\s/g, " ");
  };

  const { created_at, code, groupCode, alternative_title, description, groupName, categoriasTranslation, etiquetasTranslation, bookTypeAlias, demografia, imagePaths, activity_status, groupAvatarImage } = libroData || {};

  const imageCoverObj = imagePaths ? imagePaths.find((image) => image.view === "COVER") : null;
  const imageCover = imageCoverObj ? `data:image/png;base64,${imageCoverObj.base64}` : "";
  const formattedDate = libroData ? formatReleaseDate(created_at) : "";

  const groupChaptersByNumber = (chapters) => {
    return chapters.reduce((groups, chapter) => {
      if (!groups[chapter.number]) {
        groups[chapter.number] = [];
      }
      groups[chapter.number].push(chapter);
      return groups;
    }, {});
  };

  const sortChaptersInGroups = (groupedChapters, originalGroupCode) => {
    return Object.entries(groupedChapters).map(([number, chapters]) => {
      const originalChapter = chapters.find(ch => ch.group_code === originalGroupCode);
      const otherChapters = chapters.filter(ch => ch.group_code !== originalGroupCode);
      return {
        number,
        chapters: [originalChapter, ...otherChapters].filter(ch => ch !== undefined)
      };
    });
  };

  const groupedChapters = groupChaptersByNumber(chapters);
  const sortedGroupedChapters = sortChaptersInGroups(groupedChapters, groupCode);

  useEffect(() => {
    const fetchChapterPreview = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          throw new Error('Token not available');
        }

        const requestOptions = {
          method: "GET",
          redirect: "follow",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        };

        const url = `${EndpointCore.getChaptersPreview}?code=${code}`;

        const response = await fetch(url, requestOptions);
        if (!response.ok) {
          throw new Error("Error fetching chapter data");
        }

        const data = await response.json();
        setChapters(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (code) {
      fetchChapterPreview();
    }
  }, [code]);

  console.log(chapters);

  const handleDeleteChapter = async (chapterCode) => {
    try {
      const response = await fetch(`${EndpointCore.deleteChapter}/${chapterCode}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error deleting chapter');
      }

      const result = await response.json();
      console.log('Chapter deleted successfully:', result);
      setChapters(prevChapters => prevChapters.filter(chapter => chapter.chapter_code !== chapterCode));
    } catch (error) {
      console.error('Error deleting chapter:', error);
    }
  };

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: {},
    };
    fetch(EndpointCore.recommends, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        let data_items = [];
        result.items.forEach((i, index) => {
          data_items.push({
            id: index + 1,
            foto: i.images[0].image.path,
            texto: i.bookTitle,
            capitulo: "chapter", //i.latestChapter.group.name,
            novela: i.bookType.name.value,
            //"autor": i.bookAuthor,
            time: i.attributes.bookHourLatest + " hours ago",
            manga: "Seinen", //i.attributes.name.value,
            shoujo: "Novel", //i.bookType.name.value,
            puntuacion: i.bookRate,
            vistas: i.bookLabelViews,
          });
        });
        setItemsRecommendation(data_items);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const handleReportDropdownClick = () => {
    setShowReportDropdown(!showReportDropdown);
  };

  const handleCardClick = (index) => {
    const item = itemsRecommendation[index];

    if (item) {

      navigate(`/book-detail/${item.title.trim().toLowerCase().replace(/\s+/g, '-')}`, { state: { libroData } });

      window.location.reload();
    }
  };
  
  const avatarSrc =  groupAvatarImage || "/img/internal/book/avatar/avatar_1.png";


  /* content */
  const content01 = `<ul>
                            <li>1. ${alternative_title} </li>
                            <li>2. The sentence </li>
                            <li>3. Horror of the reincarnated</li>
                        </ul>`;
  const content02 = `<p>
                            ${description}
                        </p>`;
  const content03 = `<ul class="ul_publicado">
    <li>
        <a><img src=${avatarSrc} alt=""> ${groupName}</a>
    </li>
    <li>
        <a href="./#"><img src="/img/internal/book/avatar/avatar_2.png" alt="">GB Lovers</a>
    </li>
    <li>
        <a href="./#"><img src="/img/internal/book/avatar/avatar_3.png" alt="">MYBLGBAO</a>
    </li>
    <li>
        <a href="./#"><img src="/img/internal/book/avatar/avatar_4.png" alt="">Yaoi and Yuri Lovers</a>
    </li>
</ul>`;
  const content04 =
    categoriasTranslation && categoriasTranslation.length > 0
      ? categoriasTranslation
          .map((category) => `<a href="./#">${category}</a>`)
          .join("\n")
      : "";
  const content05 =
    etiquetasTranslation && etiquetasTranslation.length > 0
      ? etiquetasTranslation
          .map((tag) => `<a href="./#">${tag}</a>`)
          .join("\n")
      : "";
  // Details
  const bookDetails = `
    <div class="option">
        <span class="item1">Status</span>
        <span class="item2">${activity_status}</span>
    </div>
    <div class="option">
        <span class="item1">Release</span>
        <span class="item2">${formattedDate}</span>
    </div>
    <div class="option">
        <span class="item1">Type</span>
        <span class="item2">${bookTypeAlias}</span>
    </div>
    <div class="option">
        <span class="item1">Demographics</span>
        <span class="item2">${demografia}</span>
    </div>
`;

  const headContentItem = chapters
    ? chapters
        .map(
          (chapter, index) =>
            `<div class="ifoto">
  <img src="${chapter.profileImage}" alt="">
</div>
<div class="itext">
  <div class="title" data-toggle="collapse" href="#collapseItem${
    index + 1
  }" role="button" aria-expanded="true" aria-controls="collapseItem${
              index + 1
            }">
      ${chapter.name}
      <div class="btn_cbo"></div>
  </div>
  <div class="subtitulo1">Chapter ${chapter.number}</div>
  <div class="subtitulo2">${chapter.created_at}</div>
</div>`
        )
        .join("")
    : "";

  console.log("headContentItem:", headContentItem);

  const contentDetailsItem = `
<div class="item">
    <div class="text">
        <div class="title">We Are Party</div>
        <div class="subtitulo">January 11, 2012</div>
    </div>
    <div class="button">
        <a href="./#"><img src="/img/internal/book/icon/download.png" alt=""></a>
        <a href="./#"><img src="/img/internal/book/icon/play.png" alt=""></a>
    </div>
</div>
<div class="item">
    <div class="text">
        <div class="title">GB Lovers </div>
        <div class="subtitulo">January 11, 2012</div>
    </div>
    <div class="button">
        <a href="./#"><img src="/img/internal/book/icon/download.png" alt=""></a>
        <a href="./#"><img src="/img/internal/book/icon/play.png" alt=""></a>
    </div>
</div>
<div class="item">
    <div class="text">
        <div class="title">MYAMFLV</div>
        <div class="subtitulo">January 11, 2012</div>
    </div>
    <div class="button">
        <a href="./#"><img src="/img/internal/book/icon/download.png" alt=""></a>
        <a href="./#"><img src="/img/internal/book/icon/play.png" alt=""></a>
    </div>
</div>
<div class="item">
    <div class="text">
        <div class="title">Yaoi and Yuri Lovers</div>
        <div class="subtitulo">January 11, 2012</div>
    </div>
    <div class="button">
        <a href="./#"><img src="/img/internal/book/icon/download.png" alt=""></a>
        <a href="./#"><img src="/img/internal/book/icon/play.png" alt=""></a>
    </div>
</div>`;

  // Details
  const items_banner = [
    {
      foto_movil: "/img/internal/book/banner_book_detail.png",
      foto: imageCover,
      texto: `Our Books`,
    },
  ];
  const ibanner = [
    {
      foto_movil: "/img/banner/slider-transparent.png",
      foto: "/img/banner/slider-transparent.png",
      texto: ``,
    },
  ];
  /* Accordion data */
  const AcordeonData01 = [
    {
      titulo: "Alternative names",
      alias: "alternativos",
      contenido: content01,
      open: true,
      show: "show",
    },
  ];
  const AcordeonData02 = [
    {
      titulo: "Information: ",
      alias: "information01",
      contenido: content02,
      open: true,
      show: "show",
    },
  ];
  const AcordeonData03 = [
    {
      titulo: "Published by:",
      alias: "publicao",
      contenido: content03,
      open: true,
      show: "show",
    },
  ];
  const AcordeonData04 = [
    {
      titulo: "Categories:",
      alias: "categorias",
      contenido: content04,
      open: true,
      show: "show",
    },
  ];
  const AcordeonData05 = [
    {
      titulo: "Tags:",
      alias: "etiqueta",
      contenido: content05,
      open: true,
      show: "show",
    },
  ];
  const AcordeonDataChapters = [
    {
      titulo: "Details",
      alias: "chapter",
      contenido: bookDetails,
      open: true,
      show: "show",
    },
  ];
  const AcordeonDataDetailsItem = [
    {
      titulo: headContentItem,
      alias: "detailItem",
      contenido: contentDetailsItem,
      open: true,
      show: "show",
    },
  ];
  const blueItemTitle = `
    <div class="lbro col cel_gato">
        <img src="/img/internal/book/icon/cat.png" alt="">
    </div>
    <div class="lbro col cel_data">
        <div class="celdata_sub title">
            WillcaftHD_23
            <div class="globo_red">Lv8</div>

        </div>
        <div class="celdata_sub subtitulo">
            <img class="icon_estrella" src="/img/internal/book/icon/star.png" alt=""> 4.02 (53) 2 days ago
        </div>
    </div>`;
  const contentItemBlue = `
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
        a type specimen book... <a class="red" href="./#">see more</a></p>
        <div class="lbox_grupo fotos_tws oculta_movile">
                            <img class="foto_99_96" src="/img/internal/book/photo1.png" alt="">
                            <img class="foto_99_96" src="/img/internal/book/photo1.png" alt="">
                        </div>
                        <div class="lbox_grupo likes oculta_movile">
                        <img class="like" src="/img/internal/book/icon/like.png" alt="">
                        <div class="texto">Reply <span>|</span> Report</div>
                    </div>`;
  const AcordeonDataDetailsItemBlue = [
    {
      titulo: blueItemTitle,
      alias: "detailItem",
      contenido: contentItemBlue,
      open: true,
      show: "show",
    },
  ];

  // RECOMMENDED CAROUSEL CONFIG
  var recommendedCarouselConfig = {
    rows: 1,
    draggable: true,
    slidesToShow: 2,
    swipe: true,
  };
  if (width <= 900) {
    recommendedCarouselConfig = {
      rows: 1,
      draggable: true,
      slidesToShow: 2,
      swipe: true,
    };
  } else {
    recommendedCarouselConfig = {
      rows: 1,
      draggable: true,
      slidesToShow: 2,
      swipe: true,
    };
  }

  // MOBILE TAB
  const informationContent = `<p>Qin Tian was stranded on a desert island after a shipwreck. All he has equipped is a survival system and a pocketknife. He has to start from scratch. Building a camp, making fire, and fishing, he
    has to do everything he can to survive. Fortunately, there are many beauties by his side! School goddess, blonde sister, violent loli...</p> `;

  if(isLoading) {
    return (<CustomImageLoader/>)
  }

  return (
    <div className="interna libros detail ">
      
        <div className="ui_header hide_desk">
          <ul className="header-icon-mobile-detalle-libro">
            <li className="icon1">
              <a href="/#" onClick={(e) => { e.preventDefault(); navigate(-1); }}>
                <img src="/img/internal/book_detail/m-prev.png" alt="" />
              </a>
            </li>
            <li className="icon2">
              <a>
                <img src="/img/internal/book_detail/m-share.png" alt="" />{" "}
              </a>
              <a>
                {" "}
                <img src="/img/internal/book_detail/m-star.png" alt="" />
              </a>
              <a className="reportar-movil" onClick={handleReportDropdownClick}>
                {" "}
                <img
                  src="/img/internal/book_detail/m-tres.png"
                  alt="report"
                />{" "}
              </a>
            </li>
            <div className="reportar-dropdown-button">
              {showReportDropdown && <ReportDropdown />}
            </div>
          </ul>
        </div>
        <div className="top-banner hide_desk">
          <Banner items_banner={ibanner}></Banner>
        </div>

      <div
        className="position_top_A position"
        style={{ display: "flex", justifyContent: "center", paddingBottom: '20px', paddingTop: '20px' }}
      >
    <div style={{ position: 'fixed', left: '10%', top: '20px', bottom: '20px' , height: `calc(100vh - 40px)`,}}>
          <MenuLeft />
      </div>
        <div
          className="container"
          style={{ marginLeft: "0px", marginRight: "0px", marginLeft: '275px' }}
        >

          <div className="pcontent">
            <div className="banner-simple hide_movil">
              <Banner items_banner={items_banner}></Banner>
              <div className="social">
                <a href="./#">
                  <img src="/img/internal/book/icon/social1.png" alt="" />
                </a>
                <a href="./#">
                  <img src="/img/internal/book/icon/social2.png" alt="" />
                </a>
                <a className="report-link" onClick={handleReportDropdownClick}>
                  <img
                    src="/img/internal/book/icon/social3.png"
                    alt="Report"
                  />
                </a>
              </div>
              <div className="reportar">
                {showReportDropdown && <ReportDropdown />}
              </div>
            </div>

            <div className="cardInfo">
             { libroData && <LittleBookEdit  libroData={libroData}></LittleBookEdit> }
            </div>

            <div className="acordeonType2 cardInfoChapters padding-right_10">
              <Acordeon
                AcordeonData={AcordeonDataChapters}
                contenidoClass="contenidoFlex"
              ></Acordeon>
            </div>
            <div className="acordeonType2 cardInfoDetails padding-right_10">
              <div className="accordion" id="accordionExample_capitulo">
                <div className="accordion-item">
                  <BannerAdssense />
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne_capitulo"
                      aria-expanded="true"
                      aria-controls="collapseOne_capitulo"
                    >
                      Chapters
                    </button>
                  </h2>
                  <div
                    id="collapseOne_capitulo"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample_capitulo"
                  >
                  <ChaptersDropdown sortedGroupedChapters={sortedGroupedChapters} libroData={libroData} handleDeleteChapter={handleDeleteChapter} />                   

                  </div>
                </div>
              </div>
              <BannerAdssense />
            </div>
            <div className="footer-menu hide_movil">
            <Footer/>
            </div>
          </div>
          <div className="psidebar sin_padding" style={{ float: "right" }}>
            <div className="cardInfo hide_desk">
              { libroData && <LittleBookEdit libroData={libroData}></LittleBookEdit>}
            </div>
            <div className="Tabs hide_desk">
              <div className="tabs">
                <div className="icard-header">
                  <div className="icar-h4">
                    <div className="mi-title">{"title"}</div>
                  </div>
                </div>
                <div className="scroll-cabecera">
                  <div className="mi-scroll">
                    <ul className="nav nav-tabs" role="tablist">
                      <li key={"key_position01"} className="nav-item">
                        <a
                          className={`nav-link active`}
                          id={"tab_information"}
                          data-toggle="tab"
                          href={"#information"}
                          role="tab"
                          aria-controls={"information"}
                          aria-selected={"true"}
                        >
                          {"Information"}
                        </a>
                      </li>

                      <li className="nav-item">
                        <a
                          className={`nav-link`}
                          id={"tab_capitulos"}
                          data-toggle="tab"
                          href={"#capitulos"}
                          role="tab"
                          aria-controls={"capitulos"}
                          aria-selected={"false"}
                        >
                          {"Chapters"}
                        </a>
                      </li>

                      <li className="nav-item">
                        <a
                          className={`nav-link`}
                          id={"tab_comentarios"}
                          data-toggle="tab"
                          href={"#comentarios"}
                          role="tab"
                          aria-controls={"comentarios"}
                          aria-selected={"false"}
                        >
                          {"Comments"}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className="tab-content fade show active"
                  id="information"
                  dangerouslySetInnerHTML={{ __html: informationContent }}
                  role="tabpanel"
                  aria-labelledby={"tab_information"}
                ></div>
                <div
                  className="tab-content fade"
                  id="capitulos"
                  role="tabpanel"
                  aria-labelledby={"tab_capitulos"}
                >
                  <div className="acordeonType3 cardInfoDetailsItem">
                    <Acordeon AcordeonData={AcordeonDataDetailsItem}></Acordeon>
                  </div>
                </div>

                <div
                  className="tab-content fade icomentario"
                  id="comentarios"
                  role="tabpanel"
                  aria-labelledby={"tab_comentarios"}
                >
                  <div class="lbox_bold oculta_movile">Comments:</div>
                  <div className="acordeonType3 cardInfoDetailsItem blue">
                    <Acordeon AcordeonData={AcordeonDataDetailsItemBlue}>
                      {" "}
                    </Acordeon>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="padding_14"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Link
                to={"/book-edit-form"}
                state={{ libroData: libroData }}
                className="btn btn-rosado"
                style={{ width: "90%", marginBottom: "20px" }}
              >
                Edit Book
              </Link>
              <div className="acordeonType1">
                <Acordeon AcordeonData={AcordeonData01}></Acordeon>
              </div>
              <div className="acordeonType1">
                <Acordeon AcordeonData={AcordeonData02}></Acordeon>
              </div>
              <div className="acordeonType1">
                <Acordeon AcordeonData={AcordeonData03}></Acordeon>
              </div>
              <div className="acordeonType1 grupo_guinda">
                <Acordeon AcordeonData={AcordeonData04}></Acordeon>
              </div>
              <div className="acordeonType1 grupo_red">
                <Acordeon AcordeonData={AcordeonData05}></Acordeon>
              </div>
            </div>
            <div className="acordeonType2 cardInfoChapters padding-right_10">
              <Acordeon
                AcordeonData={AcordeonDataChapters}
                contenidoClass="contenidoFlex"
              ></Acordeon>
            </div>
            <div className="bgblue color_white icomentario">
              <div class="lbox_bold oculta_movile hide_comentario">
                Comments:
              </div>
              <div className="acordeonType3 cardInfoDetailsItem blue hide_comentario">
                <Acordeon AcordeonData={AcordeonDataDetailsItemBlue}></Acordeon>
              </div>
              <div className="container recomendation">
                <Carrusel
                  icarrusel={itemsRecommendation}
                  key_position={"key003"}
                  title={"Recommended"}
                  config={recommendedCarouselConfig}
                  onCardClick={handleCardClick}
                ></Carrusel>
              </div>
            </div>
          </div>
        </div>
      </div>
      {width < 900 && (
        <li className="vistas">
          <div className="acciones">
            <ul>
              <li>
                <img src="img/internal/book/icon/like.png" alt="" />
              </li>
              <li>
                <img src="img/internal/book/icon/ribbon.png" alt="" />
              </li>
              <li>
                <button
                  type="button"
                  className="btn btn_rosado"
                  style={{ display: "flex" }}
                >
                  <img src="/img/internal/community_requests/upload.png" />
                  <span>"Upload chapter"</span>
                </button>
              </li>
            </ul>
          </div>
        </li>
      )}
    </div>
  );
}

export default BookEdit;
