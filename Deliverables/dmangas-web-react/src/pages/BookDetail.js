import "../assets/css/App.css";
import "../assets/css/interna.css";
import "../assets/css/movil.css";
import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate, useParams } from "react-router-dom";
import Menu from "../components/menu/Menu";
import Banner from "../components/banner/Banner";
import Footer from "../components/footer/Footer";
import Acordeon from "../components/accordion/Accordion";
import Carrusel from "../components/carousel/Carousel";
import LittleBook from "../components/little-book/LittleBook";
import EndpointCore from "./Global";
import ReportDropdown from "../components/report-dropdown/ReportDropdown";
import BannerAdssense from "../components/BannerAdssense";
import ChaptersDropdown from "../components/dropdown/ChaptersDropdown";
import CustomImageLoader from "../components/CustomLoader/CustomImageLoader";
import CommentBook from "../components/comments/CommentBook";
import useAuth from "../hook/useAuth";

function BookDetail() {
  const [showReportDropdown, setShowReportDropdown] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(localStorage.getItem('token'));
  const [isExpanded, setIsExpanded] = useState(true);
  const [itemsRecommendation, setItemsRecommendation] = useState([]);
  const location = useLocation();
  const { title } = useParams();
  const [libroData, setLibroData] = useState(location.state ? location.state.libroData : null);
  const [loading, setLoading] = useState(!libroData);
  const navigate = useNavigate();
  const width = window.innerWidth;
  const [commentCount, setCommentCount] = useState(0);
  const [bookViews, setBookViews] = useState();

  const {auth} = useAuth();
  const userId = auth.id;

  useEffect(() => {
    if (!libroData) {
      const originalTitle = title.replace(/-/g, ''); // Remove hyphens

      fetch(`${EndpointCore.searchBookByTitle(originalTitle)}`)
        .then(response => response.json())
        .then(result => {

          if (result && result.items && result.items.length > 0) {
            const foundBook = result.items[0]; // Extract the first book from the array
            const libroDataStructure = {
              id: foundBook.bookCode, // Make sure to use the correct field
              foto: foundBook.images[0].image.path,
              fotoCover: foundBook.images.length > 1 ? foundBook.images[1].image.path : '',
              title: foundBook.bookTitle,
              tituloAlternativo: foundBook.bookAlternativeTitle,
              autor: foundBook.groupCreated.groupName,
              groupCode: foundBook.groupCreated.groupCode,
              novela: foundBook.bookType.name.value,
              time: `${foundBook.bookHourLatest} hours ago`,
              manga: foundBook.attributes[0] ? foundBook.attributes[0].name.value.substring(0, 8) : '',
              shoujo: foundBook.bookType.name.value,
              bookType: foundBook.bookType.name.value,
              puntuacion: foundBook.bookRate,
              vistas: foundBook.bookLabelViews,
              code: foundBook.bookCode,
              estado: foundBook.bookStatus.name.value,
              lanzamiento: foundBook.bookDateCreated,
              attributes: foundBook.attributes,
              contenido: foundBook.bookContentType,
              resumen: foundBook.bookDescription,
              groupAvatarImage: foundBook.groupCreated.images[0].image.path,
            };
  
            setLibroData(libroDataStructure);
          } else {
            console.log("Book not found.");
            setLibroData(null);
          }
        })
        .catch(error => {
          console.log("Error fetching book data:", error);
          setLibroData(null); 
        })
        .finally(() => setLoading(false));
    }
  }, [libroData, title]);

  useEffect(() => {
    if (libroData?.code) {  
      const incrementViews = async () => {
        try {
          const response = await fetch(`${EndpointCore.incrementBookViews}/${libroData.code}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',            
            }
          });
  
          if (!response.ok) {
            throw new Error('Error incrementing views');
          }
  
          const data = await response.json();
          setBookViews(data.book.views)
          
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      incrementViews();
    }
  }, [libroData?.code]);
  

  useEffect(() => {
    const fetchChapterPreview = async () => {
        try {
            const token = localStorage.getItem('token');

            const requestOptions = {
                method: "GET",
                redirect: "follow",
                headers: {
                    "Content-Type": "application/json",
                },
            };

            // If there is a token, add it to the request header
            if (token) {
                requestOptions.headers["Authorization"] = `Bearer ${token}`;
            }

            const url = `${EndpointCore.getChaptersPreview}?code=${libroData?.code}`;

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

    if (libroData?.code) {
        fetchChapterPreview();
    }
}, [libroData?.code]);

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
            title: i.bookTitle,
            capitulo: "chapter", //i.latestChapter.group.name,
            novela: i.bookType.name.value,
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

  if (loading) {
    return <CustomImageLoader/>; 
  }

  if (!libroData) {
    return <div>Book not found.</div>;
  }

  const { fotoCover, estado, code, lanzamiento, bookType, tituloAlternativo, autor, resumen, groupCode, groupAvatarImage } = libroData;

  const categorias = libroData?.attributes?.filter(attr => attr.type === 'Categories');
  const etiquetas = libroData?.attributes?.filter(attr => attr.type === 'Etiquetas');

  const originalGroupCode = groupCode;

  function formatReleaseDate(date) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('es-ES', options);
    return formattedDate.replace(/\sde\s/g, ' ');
  }
  const formattedDate = formatReleaseDate(lanzamiento);

  const handleCommentCountChange = (totalCount) => {
    setCommentCount(totalCount);
  };
  // Function to group chapters by number
  const groupChaptersByNumber = (chapters) => {
    return chapters.reduce((groups, chapter) => {
      if (!groups[chapter.number]) {
        groups[chapter.number] = [];
      }
      groups[chapter.number].push(chapter);
      return groups;
    }, {});
  };

  // Function to sort chapters within each group
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

  // Group the chapters
  const groupedChapters = groupChaptersByNumber(chapters);

  // Sort the chapters within each group
  const sortedGroupedChapters = sortChaptersInGroups(groupedChapters, originalGroupCode);

  const getUniqueGroups = (chapters) => {
    const groupMap = new Map(); // We use a Map to ensure uniqueness based on group_name

    chapters.forEach(chapter => {
      const { group_name, group_avatar } = chapter;

      // If the group isn't in the Map yet, add it
      if (!groupMap.has(group_name)) {
        groupMap.set(group_name, { name: group_name, avatar: group_avatar });
      }
    });

    // Convert the Map to an array of unique objects
    return Array.from(groupMap.values());
  };


  const getGroupListHTML = (chapters) => {
    const uniqueGroups = getUniqueGroups(chapters); // Get the unique groups from the chapters

    // Generate the HTML content for the group list
    return uniqueGroups.map(group => `
      <li>
        <a href="./#">
          <img src="${group.avatar}" alt="${group.name} Avatar" /> ${group.name}
        </a>
      </li>
    `).join('');  // Join the elements into a single string
  };
    

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  /* content */
  const content01 = `<ul>
    <li>1. Mark of Cups </li>
    <li>2. The sentence </li>
    <li>3. Horror of the reincarnated</li>
</ul>`;
  const content02 = `<p>
${resumen}</p>`;
const content03 = `
<ul class="ul_publicado">
  ${getGroupListHTML(chapters)}
</ul>`;
const content04 = (categorias?.length > 0) 
  ? categorias.map(categoria => `<a href="./#">${categoria.name.value}</a>`).join('\n')
  : '';

const content05 = (etiquetas?.length > 0) 
  ? etiquetas.map(etiqueta => `<a href="./#">${etiqueta.name.value}</a>`).join('\n')
  : '';
  // Details
  const bookDetails= `
<div class="option">
<span class="item1">Status</span>
<span class="item2">${estado}</span>
</div>
<div class="option">
<span class="item1">Release</span>
<span class="item2" style="display: inline-block; white-space: nowrap; width: auto;">${formattedDate}</span>
</div>
<div class="option">
<span class="item1">Type</span>
<span class="item2">${bookType}</span>
</div>
<div class="option">
<span class="item1">Demographics</span>
<span class="item2">Shoujo</span>
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
  <div class="subtitulo1">Ch. ${chapter.number}</div>
  <div class="subtitulo2">${chapter.created_at}</div>
</div>`
    )
    .join("")
: "";

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
      foto : fotoCover ? fotoCover : "/img/internal/book/banner_book_detail.png",
      texto: `Our   Books`,
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
      contenido: tituloAlternativo,
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
  const informationContent = {resumen};

  const handleReportDropdownClick = () => {
    setShowReportDropdown(!showReportDropdown);
  };
  const firstChapterCode = chapters.length > 0 ? chapters[0].chapter_code : null;
  
  const handleCardClick = (index) => {
    const item = itemsRecommendation[index];

    if (item) {
        console.log('libroData:', item); // Print libroData to the console

        // Update the URL and pass the new state
        navigate(`/book-detail/${item.title.trim().toLowerCase().replace(/\s+/g, '-')}`, { state: { libroData } });

        // Force the page to reload
        window.location.reload();
    }
};
  console.log(firstChapterCode)
  console.log('chapters', chapters)

  const closeDropdown = ()=>{
    setShowReportDropdown(false)
  }

  if (!libroData || !sortedGroupedChapters ) {
    return <CustomImageLoader/>;
  }
  return (
    <div className="interna libros detail ">
      <div className="position_header position  hide_movil  ">
        <div className="container hide_movil">
          <Menu></Menu>
        </div>
        <div className="top-banner">
          <Banner items_banner={ibanner}></Banner>
        </div>
      </div>
      <div className="position_top_A position">
        <div className="container">
          <div className="pcontent">
          <ul className="header-icon-mobile-detalle-libro">
            <li className="icon1">
              <a href="/#" onClick={(e) => { e.preventDefault(); navigate(-1); }}>
              <img src="/img/internal/book_detail/m-prev.png" alt="back" />
              </a>
            </li>
            <li className="icon2">
              <a>
              <img src="/img/svg/newShare.svg" alt="share" className="share-report-icon" />
              </a>
              <a>
                <img src="/img/svg/StarCommet.svg" alt="star" className="share-report-icon"/>
              </a>
              <a className="reportar-movil" onClick={handleReportDropdownClick}>
                <img
                  src="/img/svg/report.svg"
                  alt="report"
                  className="share-report-icon"
                />
              </a>
              <div className="reportar">
                {showReportDropdown && <ReportDropdown user_id={userId} entity_id={libroData.code} notification_type={'BOOK'} closeDropdown={closeDropdown}/>}
              </div>
            </li>
             
          </ul>
        
            <div className="banner-simple hide_movil">
              <Banner items_banner={items_banner}></Banner>
            </div>
            <div className="cardInfo">
            <LittleBook libroData={libroData} sortedGroupedChapters={sortedGroupedChapters}  chapters= {chapters}firstChapterCode={firstChapterCode} isUserLoggedIn={isUserLoggedIn} userId={userId} commentCount={commentCount} bookViews={bookViews}></LittleBook>
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
                     className={`accordion-button ${isExpanded ? '' : 'collapsed'}`}
                     type="button"
                     onClick={handleToggle}
                    >
                     Chapters
                    </button>
                  </h2>
                   <div
                     id="collapseOne_capitulo"
                     className={`accordion-collapse collapse ${isExpanded ? 'show' : ''}`}
                     aria-labelledby="headingOne"
                   > 
                   <ChaptersDropdown sortedGroupedChapters={sortedGroupedChapters} libroData={libroData} />                   
                  </div>
                </div>
              </div>
              <BannerAdssense />
            </div>
            <CommentBook libroData={libroData} onCommentCountChange={handleCommentCountChange}/>                         {/* item*/}

          </div>
          <div className="psidebar sin_padding" style={{ float: "right" }}>
            <div className="cardInfo hide_desk">
              <LittleBook libroData={libroData} isUserLoggedIn={isUserLoggedIn} sortedGroupedChapters={sortedGroupedChapters} userId={userId}></LittleBook>
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
            <div className="padding_14">
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
      {width > 900 ? (
        <Footer />
      ) : (
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
                <button type="button" className="btn btn_rosado">
                  <Link to="/book-read-chapters">"Start reading"</Link>
                </button>
              </li>
            </ul>
          </div>
        </li>
      )}
    </div>
  );
}
export default BookDetail;
