import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toastr from "toastr";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { FileUploader } from 'react-drag-drop-files';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../assets/css/App.css";
import "../assets/css/interna.css";
import "../assets/css/movil.css";

import Menu from "../components/menu/Menu";
import Banner from "../components/banner/Banner";
import Footer from "../components/footer/Footer";
import Acordeon from "../components/accordion/Accordion";
import Carrusel from "../components/carousel/CarouselCustom";
import LittleBookEdit from "../components/little-book/LittleBookEdit";
import EndpointCore from "./Global";

// DraggableImage component
const DraggableImage = ({ children, index, onMoveImage }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: 'image',
    hover: (item) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex !== hoverIndex) {
        onMoveImage(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'image',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }} className="d-flex mb-3">
      {children}
    </div>
  );
};

function BookEditChapter() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [file, setFile] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [contentUploaded, setContentUploaded] = useState(false);
  const [chapterProfileImage, setChapterProfileImage] = useState(false);
  const [chapterData, setChapterData] = useState({
    volumeNumber: "",
    chapterNumber: "",
    chapterName: "",
    content: "",
    file: "",
    images: [],
    chapterProfileImage: "",
  });
  const [isEditorDisabled, setIsEditorDisabled] = useState(false);
  const [isFileDisabled, setIsFileDisabled] = useState(false);
  const [isNovel, setIsNovel] = useState(false);
  const [isPdf, setIsPdf] = useState(false);
  const [isImages, setIsImages] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [specificChapter, setSpecificChapter] = useState([]);
  const [urlDocuments, setUrlDocuments] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { libroData, chapterInfo } = location.state;
  const { chapter_code, name, number, profileImage } = chapterInfo;

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const newChapterCode = chapter_code;
        const requestOptions = {
          method: "GET",
          redirect: "follow",
          headers: {},
        };

        const response = await fetch(
          `${EndpointCore.getChapters}?bookCode=${libroData.code}&chapterCode=${newChapterCode}`,
          requestOptions
        );
        if (!response.ok) {
          throw new Error("Error fetching chapters");
        }

        const result = await response.json();

        let urlDocuments = [];
        let pdfFound = false;
        let imageFound = false;
        let images = [];

        if (result.specificChapter.urlDocument) {
          urlDocuments = result.specificChapter.urlDocument.map((url, index) => {
            if (url.startsWith("data:application/pdf;base64,")) {
              pdfFound = true;
              return url;
            } else {
              imageFound = true;
              const imageName = result.specificChapter.originalDocuments?.[index]?.name || "Unnamed Image";
              images.push({ name: imageName, data: url });
              return url;
            }
          });
        }

        setIsPdf(pdfFound);
        setIsImages(imageFound);

        setChapters(result.chapters);
        setSpecificChapter({
          ...result.specificChapter,
          urlDocument: urlDocuments,
        });

        const defaultData = {
          volumeNumber: result.specificChapter.volumeNumber || "",
          chapterNumber: result.specificChapter.number || "",
          chapterName: result.specificChapter.name || "",
          content: result.specificChapter.htmlContent || "",
          file: pdfFound
            ? {
                name: result.specificChapter.originalDocuments?.[0]?.name || "",
                url: urlDocuments.find(url => url.startsWith("data:application/pdf;base64,")) || "",
              }
            : { name: "", url: "" },
          chapterProfileImage: result.specificChapter.profileImage || "",
          images: imageFound ? images : [],
        };

        setChapterData(defaultData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchChapters();

    const updatedChapterData = {
      chapterName: chapterInfo?.name || chapterData.chapterName,
      chapterNumber: chapterInfo?.number || chapterData.chapterNumber,
      chapterProfileImage: chapterInfo?.profileImage || chapterData.chapterProfileImage,
    };

    if (libroData.book_type_id === 8) {
      updatedChapterData.volumeNumber = chapterInfo?.volumeNumber || chapterData.volumeNumber;
      setIsNovel(true);
    } else {
      setIsNovel(false);
    }

    setChapterData((prevChapterData) => ({
      ...prevChapterData,
      ...updatedChapterData,
    }));
    setChapterProfileImage(chapterInfo?.profileImage || chapterData.chapterProfileImage);

  }, [libroData.code, chapter_code, libroData.book_type_id, chapterInfo]);

  const handleFileChange = (file, option) => {
    if (file instanceof FileList) {
      file = file[0];
    }

    if (fileUploaded || contentUploaded) {
      toastr.error("You can only upload one type of file per chapter");
    } else {
      setSelectedOption(option);
      setFile(file);
      setFileUploaded(true);
      setChapterData((prevData) => ({
        ...prevData,
        file: {
          name: file.name,
          url: '', // Empty URL since this is a new file that will be uploaded
        }
      }));
    }
    setIsEditorDisabled(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setChapterData({ ...chapterData, [name]: value });
  };

  const handleContentChange = (value) => {
    setChapterData({ ...chapterData, content: value });
    setIsFileDisabled(true);
  };

  const handleImageChange = (files) => {
    const updatedUrlDocuments = [...specificChapter.urlDocument];
    const updatedOriginalDocuments = [...specificChapter.originalDocuments];
    const updatedImages = [...chapterData.images];
  
    for (let file of files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image = e.target.result;
        const imageName = file.name;
  
        updatedUrlDocuments.push(base64Image);
        updatedOriginalDocuments.push({ name: imageName, path: "" });
        updatedImages.push({ name: imageName, data: base64Image });
  
        setSpecificChapter({ 
          ...specificChapter, 
          urlDocument: updatedUrlDocuments, 
          originalDocuments: updatedOriginalDocuments 
        });
        setChapterData({ 
          ...chapterData, 
          images: updatedImages 
        });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleProfileChange = (e) => {
    const file = e.currentTarget.files[0];

    if (file && file.type.match('image.*')) {
      handleChapterProfileImage(file);
    } else {
      setError("Please select a valid image file.");
    }
  };

  const handleChapterProfileImage = (file) => {
    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const base64Image = reader.result;
      setChapterProfileImage(base64Image);
      setChapterData((prevChapterData) => ({
        ...prevChapterData,
        chapterProfileImage: base64Image,
      }));
    };

    reader.readAsDataURL(file);
  };

  const onMoveImage = (dragIndex, hoverIndex) => {
    const updatedUrlDocuments = [...specificChapter.urlDocument];
    const updatedOriginalDocuments = [...specificChapter.originalDocuments];
    const updatedImages = [...chapterData.images];
  
    // Move the URLs
    const [movedUrl] = updatedUrlDocuments.splice(dragIndex, 1);
    updatedUrlDocuments.splice(hoverIndex, 0, movedUrl);

    // Move the image names
    const [movedOriginalDoc] = updatedOriginalDocuments.splice(dragIndex, 1);
    updatedOriginalDocuments.splice(hoverIndex, 0, movedOriginalDoc);

    // Move the image objects
    const [movedImage] = updatedImages.splice(dragIndex, 1);
    updatedImages.splice(hoverIndex, 0, movedImage);
  
    setSpecificChapter({ 
      ...specificChapter, 
      urlDocument: updatedUrlDocuments, 
      originalDocuments: updatedOriginalDocuments 
    });
  
    setChapterData({ 
      ...chapterData, 
      images: updatedImages 
    });
  };

  const handleDeleteImage = (index) => {
    setSpecificChapter((prevChapter) => {
      const updatedUrlDocuments = [...prevChapter.urlDocument];
      const updatedOriginalDocuments = [...prevChapter.originalDocuments];
  
      if (updatedUrlDocuments.length > index) {
        updatedUrlDocuments.splice(index, 1);
      }
  
      if (updatedOriginalDocuments.length > index) {
        updatedOriginalDocuments.splice(index, 1);
      }
  
      return { 
        ...prevChapter, 
        urlDocument: updatedUrlDocuments, 
        originalDocuments: updatedOriginalDocuments 
      };
    });
  
    setChapterData((prevData) => {
      const updatedImages = [...prevData.images];
      if (updatedImages.length > index) {
        updatedImages.splice(index, 1);
      }
      return { ...prevData, images: updatedImages };
    });
  };

  const handleSubmit = () => {
    const basePayload = {
      id: libroData.id,
      group_created_id: libroData.group_created_id,
      chapterCode: specificChapter.code,
      volumeNumber: isNovel ? chapterData.volumeNumber : undefined,
      chapterNumber: chapterData.chapterNumber,
      chapterName: chapterData.chapterName,
      chapterProfileImage: chapterData.chapterProfileImage, 
      content: isNovel ? chapterData.content : undefined,
    };
  
    if (isImages) {
      basePayload.images = chapterData.images.map(img => ({
        name: img.name,
        data: img.data
      })); // Add the images array only if isImages is true
    }
  
    // Log base payload for debugging
    console.log('Base Payload:', basePayload);
  
    // Log chapterData for debugging
    console.log('Chapter Data:', chapterData);
  
    if (fileUploaded) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64File = reader.result;
        const filePayload = {
          ...basePayload,
          file: base64File,
          fileName: file.name,
        };
  
        // Log file payload for debugging
        console.log('File Payload:', filePayload);
  
        if (!chapterData.chapterName || !chapterData.chapterNumber) {
          toastr.error("Please fill in all required fields");
          return;
        }

        if (isNovel && !chapterData.volumeNumber) {
          toastr.error("Please fill in the volume number field");
          return;
        }

        if (chapterData.content) {
          toastr.error("Please choose only one option for uploading chapters");
          return;
        }

        sendChapterToBackend(filePayload);
      };
    } else {
      // If no new file was uploaded, use the default file
      const filePayload = {
        ...basePayload,
        file: chapterData.file.url,
        fileName: chapterData.file.name,
      };
  
      // Log file payload for debugging
      console.log('File Payload:', filePayload);
  
      if (!chapterData.chapterName || !chapterData.chapterNumber) {
        toastr.error("Please fill in all required fields");
        return;
      }

      if (isNovel && !chapterData.volumeNumber) {
        toastr.error("Please fill in the volume number field");
        return;
      }

      sendChapterToBackend(filePayload);
    }
  };

  const sendChapterToBackend = (chapterPayload) => {
    const payloadToSend = isImages 
      ? { ...chapterPayload, images: chapterData.images }
      : chapterPayload;
  
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chapterPayload: payloadToSend }),
    };
  
    fetch(EndpointCore.editChapter, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error sending the chapter");
      })
      .then((data) => {
        console.log("Server response:", data);
        toastr.success("Chapter successfully edited");
      })
      .catch((error) => {
        console.error("Error:", error);
        toastr.error("Error editing the chapter");
      });
  };
  console.log('chapterData is:', chapterData)
  console.log('specificChapter is:', specificChapter)
  /* content */
  const content01 = `<ul>
                            <li>1. ${libroData.alternative_title} </li>
                            <li>2. The sentence </li>
                            <li>3. Horror of the reincarnated</li>
                        </ul>`;
  const content02 = `<p>
                           ${libroData.description}
                        </p>`;
  const content03 = `<ul class="ul_publicado">
    <li>
    <a href="./#"><img src="img/internal/book/avatar/avatar_1.png" alt=""> ${libroData.author}</a>
    </li>
    <li>
        <a href="./#"><img src="img/internal/book/avatar/avatar_2.png" alt="">GB Lovers</a>
    </li>
    <li>
        <a href="./#"><img src="img/internal/book/avatar/avatar_3.png" alt="">MYBLGBAO</a>
    </li>
    <li>
        <a href="./#"><img src="img/internal/book/avatar/avatar_4.png" alt="">Yaoi and Yuri Lovers</a>
    </li>
</ul>`;
  const content04 =
    libroData.categoriasTranslation &&
    libroData.categoriasTranslation.length > 0
      ? libroData.categoriasTranslation
          .map((category) => `<a href="./#">${category}</a>`)
          .join("\n")
      : "";
  const content05 =
    libroData.etiquetasTranslation && libroData.etiquetasTranslation.length > 0
      ? libroData.etiquetasTranslation
          .map((tag) => `<a href="./#">${tag}</a>`)
          .join("\n")
      : "";
  // Details

  // Chapters
  const contentChapters = `
    <div class="option">
        <span class="item1">Status</span>
        <span class="item2">Airing</span>
    </div>
    <div class="option">
        <span class="item1">Release</span>
        <span class="item2">January 11, 2012</span>
    </div>
    <div class="option">
        <span class="item1">Type</span>
        <span class="item2">Manga</span>
    </div>
    <div class="option">
        <span class="item1">Demographic</span>
        <span class="item2">Shoujo</span>
    </div>
`;

  const headContentItem = `
<div class="ifoto">
    <a href="book-read-chapter"><img src="/img/internal/book/photo1.png" alt=""></a>
</div>
<div class="itext">
    <div class="titulo" data-toggle="collapse" href="#collapseItema1" role="button" aria-expanded="true" aria-controls="collapseItem1">The Fallen Hero's Beginning
        <div class="btn_cbo"></div>
    </div>
    <div class="subtitulo1">Ch. 01</div>
    <div class="subtitulo2">January 11, 2012</div>
</div>`;
  const contentDetailsItem = `
<div class="item">
    <div class="text">
        <div class="titulo">We Are Party</div>
        <div class="subtitulo">January 11, 2012</div>
    </div>
    <div class="button">
        <a href="./#"><img src="/img/internal/book/icon/download.png" alt=""></a>
        <a href="./#"><img src="/img/internal/book/icon/play.png" alt=""></a>
    </div>
</div>
<div class="item">
    <div class="text">
        <div class="titulo">GB Lovers </div>
        <div class="subtitulo">January 11, 2012</div>
    </div>
    <div class="button">
        <a href="./#"><img src="/img/internal/book/icon/download.png" alt=""></a>
        <a href="./#"><img src="/img/internal/book/icon/play.png" alt=""></a>
    </div>
</div>
<div class="item">
    <div class="text">
        <div class="titulo">MYAMFLV</div>
        <div class="subtitulo">January 11, 2012</div>
    </div>
    <div class="button">
        <a href="./#"><img src="/img/internal/book/icon/download.png" alt=""></a>
        <a href="./#"><img src="/img/internal/book/icon/play.png" alt=""></a>
    </div>
</div>
<div class="item">
    <div class="text">
        <div class="titulo">Yaoi and Yuri Lovers</div>
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
      foto: "/img/internal/book/banner_book_detail.png",
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
  /* Data acordeon */
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
      contenido: contentChapters,
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
  const [itemsRecommendation, setItemsRecommendation] = useState([]);
  const blueItemTitle = `
    <div class="lbro col cel_gato">
        <img src="img/internal/book/icon/cat.png" alt="">
    </div>
    <div class="lbro col cel_data">
        <div class="celdata_sub titulo">
            WillcaftHD_23
            <div class="globo_red">Lv8</div>

        </div>
        <div class="celdata_sub subtitulo">
            <img class="icon_estrella" src="img/internal/book/icon/star.png" alt=""> 4.02 (53) 2 days ago
        </div>
    </div>`;
  const contentItemBlue = `
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
        a type specimen book... <a class="red" href="./#">see more</a></p>
        <div class="lbox_grupo fotos_tws oculta_movile">
                            <img class="foto_99_96" src="img/internal/book/photo1.png" alt="">
                            <img class="foto_99_96" src="img/internal/book/photo1.png" alt="">
                        </div>
                        <div class="lbox_grupo likes oculta_movile">
                        <img class="like" src="img/internal/book/icon/like.png" alt="">
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
    slidesToScroll: 2,
    responsive: { slidesToShow: 2, slidesToScroll: 2, rows: 1 },
  };

  /* RECOMMENDATION */
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

  // MOBILE TAB
  const informationContent = `<p>Qin Tian was stranded on a desert island after a shipwreck. All he has equipped is a survival system and a pocketknife. He has to start from scratch. Building a camp, making fire, and fishing, he
    has to do everything he can to survive. Fortunately, there are many beauties by his side! School goddess, blonde sister, violent loli...</p> `;

  return (
    <div className="interna libros detail">
      <div className="position_header position hide_movil ">
      <div className="ui_header hide_movil container"
        style={{ position: 'relative'}}>
          <Menu></Menu>
        </div>
        <div className="ui_header hide_desk">
          <ul className="header-icon-mobile-detalle-libro">
            <li className="icon1">
              <a href="/#" onClick={(e) => { e.preventDefault(); navigate(-1); }}>
                <img src="img/internal/book_detail/m-prev.png" alt="" />
              </a>
            </li>
            <li className="icon2">
              <img src="img/internal/book_detail/m-share.png" alt="" />
              <img src="img/internal/book_detail/m-star.png" alt="" />
              <img src="img/internal/book_detail/m-tres.png" alt="" />
            </li>
          </ul>
        </div>
        <div className="top-banner">
          <Banner items_banner={ibanner}></Banner>
        </div>
      </div>
      <div className="position_top_A position">
        <div
          className="container "
          style={{ display: "flex", paddingLeft: "0px" }}
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
                <a href="./#">
                  <img src="/img/internal/book/icon/social3.png" alt="" />
                </a>
              </div>
            </div>
            <div className="cardInfo">
              <LittleBookEdit
                btnTitle="Upload chapter"
                libroData={libroData}
                handleSubmit={handleSubmit}
              ></LittleBookEdit>
            </div>
            <div
              className="acordeonType2 cardInfoChapters padding-right_10 d-flex"
              style={{ flexDirection: "column" }}
            >
              <div className="box-row subtitulo margin-button-20">
                <span>upload chapter </span>
              </div>
              <label className="form-check-label" style={{ fontWeight: 'bold', color: 'black' }}>
        EDIT CHAPTER
      </label>
      <div style={!isNovel ? { display: 'flex', alignItems: 'center' } : { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div className="ibillete">
          {isNovel && (
            <div className="group-date historia">
              <span>Volume No.</span>
              <input type="text" name="volumeNumber" value={chapterData.volumeNumber} onChange={handleChange} />
            </div>
          )}
          <div className="group-date historia">
            <span>Chapter No.</span>
            <input type="text" name="chapterNumber" value={chapterData.chapterNumber} onChange={handleChange} />
          </div>
        </div>
        <div className="ibillete">
          <div className="group-date historia">
            <span>Chapter Name</span>
            <input type="text" name="chapterName" value={chapterData.chapterName} onChange={handleChange} />
          </div>
        </div>
      </div>
      <br />
      <label className="form-check-label" style={{ fontWeight: 'Bold' }}>
        APPEARANCE
      </label>
      <label className="form-check-label">A good cover image matters</label>
      <div className="mt-3">
        {isNovel ? (
          <div className="inputBook" style={{ display: 'flex', marginRight: 10, padding: '5px 10px' }}>
            <ReactQuill
              theme="snow"
              placeholder="Write your story"
              modules={{
                toolbar: [
                  [{ header: '1' }, { header: '2' }, { font: [] }],
                  [{ size: [] }],
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                  ['link', 'image', 'video'],
                  ['clean'],
                ],
              }}
              value={chapterData.content}
              onChange={handleContentChange}
              readOnly={isEditorDisabled}
            />
          </div>
        ) : (
          <div style={{ display: 'flex', marginBottom: '25px' }}>
            <div style={{ width: '107px', height: '82px' }}>
              <img
                src={chapterProfileImage || 'img/internal/profile/logo.png'}
                style={{ maxWidth: '100%', maxHeight: '100%', marginRight: '10px', borderRadius: '15px' }}
                alt="Profile"
              />
            </div>
            <div style={{ marginLeft: '20px' }}>
              <div className="form-check-label" style={{ fontWeight: 'bold' }}>
                Profile picture
              </div>
              <div className="form-check-label" style={{ fontWeight: '500' }}>
                Recommended 800x80px
              </div>
              <div
                className="inputBook"
                style={{ display: 'flex', marginRight: 10, padding: '5px 10px' }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => e.preventDefault()}
              >
                <div style={{ display: 'flex', width: '196px', height: '32px' }}>
                  <label htmlFor="profileImageInput" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <img src="/img/image.png" style={{ width: '20px', marginRight: '10px' }} alt="Upload Icon" />
                    Select image
                  </label>
                  <input id="profileImageInput" type="file" accept="image/*" onChange={handleProfileChange} style={{ display: 'none' }} />
                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
              </div>
            </div>
          </div>
        )}
    
    {isImages && (
          <div>
            <label
            className="form-check-label"
            for="type2"
            style={{ fontWeight: "Bold", color: '#212429' }}
          >
            EDIT IMAGE
          </label>
          <label className="form-check-label" for="type2" style={{marginBottom:'20px'}}>
            You can reorder the images
          </label>
             <DndProvider backend={HTML5Backend} >
                 {/* Images and titles section */}
                 {specificChapter.urlDocument.map((imageBase64, index) => (
                   <DraggableImage
                     key={`image-${index}`}
                     index={index}
                     onMoveImage={onMoveImage} 
                   >
                     <div className="">
                       <img
                         src={imageBase64}
                         alt={`Image ${index}`}
                         style={{
                          borderRadius: "15px",
                          width: '109px',
                          height: '146px',
                          objectFit: 'cover'
                        }}                           />
                     </div>
                     <div className="itext ml-3" style={{alignItems: 'center', display: 'flex'}}>                           <div
                         className="titulo"
                         data-toggle="collapse"
                         href={`#collapseItem${index + 1}`}
                         role="button"
                         aria-expanded="true"
                         aria-controls={`collapseItem${index + 1}`}
                        
                       >
                        <span className="form-check-label" style={{ fontWeight: 'bold', marginLeft: '15px',  width: '165px',
                          whiteSpace: 'normal',  wordWrap: 'break-word', color: '#212429'}}>
                         {specificChapter.originalDocuments[index]?.name }
                         </span>
                       </div>
                       </div>
                       <div className="form-check box menu-item" style={{ marginLeft: 'auto' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ height: '100px' }}>
              <img src="/img/drag.png" alt="drag" />
            </div>
            <button
            className="btn mostrar"
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            onClick={() => handleDeleteImage(index)}
            >
              <img src="/img/trash.png" alt="trash" style={{ width: '20px' }} />
              <label className="form-check-label" htmlFor="type1" style={{ marginLeft: '10px', color: '#212429' }}>
                Delete
              </label>
            </button>
          </div>
       
      </div>
                   </DraggableImage>
                 ))}
                  </DndProvider>
                 {/* Button to upload images */}
                 <div className="d-flex mt-3">
                   <div className="inputBook" style={{ display: "flex", marginRight: 10, padding: "5px 10px" }}>
                     <FileUploader
                       handleChange={handleImageChange}
                       name="file"
                       types={["JPG", "PNG", "GIF"]}
                       label={"Upload images"}
                       dropMessageStyle={{ backgroundColor: "#c1c1c1" }}
                       multiple={true}
                     >
                       <div
                         style={{
                           display: "flex",
                           marginRight: 10,
                           padding: "5px 10px",
                           width: "165px",
                           height: "32px",
                           justifyContent: "center",
                         }}
                       >
                         <img src="/img/image.png" style={{ width: "20px", marginRight: "10px" }} alt="Upload Icon" />
                         Upload images
                       </div>
                     </FileUploader>
                   </div>
                 </div>
                 </div>
            )}
         {isPdf && (
        <div className="mt-3">
          <label className="form-check-label" style={{ fontWeight: 'bold' }}>
            EDIT PDF
          </label>
          {specificChapter.name && (
            <div className="d-flex align-items-center mb-3">
              <span className="form-check-label" style={{ flexGrow: 1 }}>
                {file ? file.name : chapterData.file.name}
              </span>
            </div>
          )}
          <div className="inputBook" style={{ display: 'flex', marginRight: 10, padding: '5px 10px' }}>
            <FileUploader handleChange={handleFileChange} name="file" types={['PDF']} label="Upload PDF" dropMessageStyle={{ backgroundColor: '#c1c1c1' }} multiple={false} disabled={isFileDisabled}>
              <div style={{ width: '120px', height: '32px', display: 'flex', marginRight: 10, padding: '5px 5px', justifyContent: 'center' }}>
                <img src="/img/pdf.png" style={{ width: '20px', marginRight: '5px' }} alt="Upload PDF" />
                Change PDF
              </div>
            </FileUploader>
          </div>
        </div>
      )}
        <div className="mt-5" style={{ display: 'flex', justifyContent: 'center' }}>
          <button type="button" className="btn btn_rosado" onClick={handleSubmit}>
            Add
          </button>
                </div>
              </div>
             </div>
          </div>
          <div className="psidebar sin_padding">
            <div className="cardInfo hide_desk">
              <LittleBookEdit libroData={libroData}></LittleBookEdit>
            </div>
            <div className="Tabs hide_desk">
              <div className="tabs">
                <div className="icard-header">
                  <div className="icar-h4">
                    <div className="mi-titulo">{"title"}</div>
                  </div>
                </div>
                <div className="scroll-cabecera">
                  <div className="mi-scroll">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
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
                    <Acordeon
                      AcordeonData={AcordeonDataDetailsItemBlue}
                    ></Acordeon>
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
                  titulo={"Recommended"}
                  config={recommendedCarouselConfig}
                ></Carrusel>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BookEditChapter

