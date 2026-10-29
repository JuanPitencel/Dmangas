import "../assets/css/App.css";
import "../assets/css/interna.css";
import "../assets/css/movil.css";
import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams} from "react-router-dom";
import Menu from "../components/menu/Menu";
import Banner from "../components/banner/Banner";
import Footer from "../components/footer/Footer";
import Acordeon from "../components/accordion/Accordion";
import Carrusel from "../components/carousel/CarouselCustom";
import LittleBookEdit from "../components/little-book/LittleBookEdit";
import EndpointCore from "./Global";
import toastr from "toastr";
import { FileUploader } from "react-drag-drop-files";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import DropdownAgrupacion from "../components/dropdownForm/DropdownGroup";
import { HTML5Backend } from 'react-dnd-html5-backend';


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



function BookUploadChapter() {
  const location = useLocation();
  const navigate = useNavigate();
  const {title} = useParams();
  const { libroData, chapters } = location.state;
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [file, setFile] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [contentUploaded, setContentUploaded] = useState(false);
  const [chapterProfileImage, setChapterProfileImage] = useState(false);
  const [chapterData, setChapterData] = useState({
    volumeNumber: "",
    chapterNumber: "",
    chapterName: "",
    content: "", // chapter upload with html editor
    file: "", // chapter upload as pdf
    images: [], // chapter upload as images
    chapterProfileImage: "",
  });
  const [isEditorDisabled, setIsEditorDisabled] = useState(false);
  const [isFileDisabled, setIsFileDisabled] = useState(false);
  const [isNovel, setIsNovel] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [groupsData, setGroupsData] = useState([]);
  const [newGroupId, setNewGroupId] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const originalTitle = title.replace(/-/g, ' ');
  const [showEditor, setShowEditor] = useState(false);
  useEffect(() => {
    setIsNovel(libroData.book_type_id === 8 || libroData.bookType === "Novela");
  }, [libroData.book_type_id, libroData.bookType]);
  
  useEffect(()=>{
    setIsNewGroup(!libroData.group_created_id)
  })
  console.log('CHAPTER DATA IMAGES', chapterData)

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const userToken = localStorage.getItem('token');
        const response = await fetch(`${EndpointCore.getGroupWithImages}`, {
          method: 'GET',
          headers: {
            'Authorization':` Bearer ${userToken}`,
          },
        });
    
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            // A group was found, update the state
            const groupInfo = data.data;
            setGroupsData(groupInfo);
          } else {
            console.log('No group found for the current author');
          }
        }
      } catch (error) {
        console.error('Error fetching group information:', error);
      }
    };

    if (isNewGroup) {
      fetchGroupData();
    }
  }, [isNewGroup]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setChapterData({ ...chapterData, [name]: value });
  };
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setChapterData({
      ...chapterData,
      [name]: value,
      isNewChapter: false, // Make sure we're not adding a new chapter when a number is entered
    });
  };

   const handleSelect = (chapterNumber) => {
    if (chapterNumber === 'new') {
      setIsEditable(true);
      setChapterData((prevData) => ({
        ...prevData,
        chapterNumber: '',
        chapterName: '',
      }));
    } else {
      const selectedChapter = chapters.find((chapter) => chapter.number === chapterNumber);
      setChapterData((prevData) => ({
        ...prevData,
        chapterNumber: selectedChapter.number,
        chapterName: selectedChapter.name,
        volumeNumber: selectedChapter.volume
      }));
      setIsEditable(false);
    }
    setIsDropdownVisible(false);
  };

  const handleFocus = () => {
    setIsDropdownVisible(true);
  };

  const handleBlur = () => {
    // Delay the hide dropdown to allow click event to register
    setTimeout(() => {
      setIsDropdownVisible(false);
    }, 200);
  };


  const handleContentChange = (value) => {
    setChapterData({ ...chapterData, content: value });
    setIsFileDisabled(true); 
  };
  const handleImageChange = (file, option) => {
    const imagesArray = [];

    if (file instanceof FileList) {
        const fileList = Array.from(file);
        const imageFiles = fileList.filter((f) => f.type.startsWith('image/'));

        // Use Promise.all to make sure all files are processed before updating the state
        const promises = imageFiles.map((imageFile) => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(imageFile);
                reader.onload = () => {
                    const base64Image = reader.result;
                    // Resolve the promise with the image object
                    resolve({ name: imageFile.name, data: base64Image });
                };
            });
        });

        // Wait for all the promises to resolve
        Promise.all(promises).then((images) => {
            setChapterData((prevChapterData) => ({
                ...prevChapterData,
                images: [...prevChapterData.images, ...images], // Update the state with all the uploaded images
            }));
        });
    } else {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64Image = reader.result;
                setChapterData((prevChapterData) => ({
                    ...prevChapterData,
                    images: [
                        ...prevChapterData.images,
                        { name: file.name, data: base64Image },
                    ],
                }));
            };
        }
    }

    setSelectedOption(option);
    setFile(file);
    setFileUploaded(true);
    setIsEditorDisabled(true);
};

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
  }
  setIsEditorDisabled(true); 
};

const handleChapterProfileImage = (file) => {
  // Check whether a file was selected
  if (!file) {
    return;
  }

  // Create a file reader
  const reader = new FileReader();

  // Set up the onload event for the file reader
  reader.onload = () => {
    // Get the base64 URL of the image
    const base64Image = reader.result;

    // Update the chapter profile image state
    setChapterProfileImage(base64Image);

    // Update the chapter data state
    setChapterData((prevChapterData) => ({
      ...prevChapterData,
      chapterProfileImage: base64Image,
    }));
  };

  // Read the file as a base64 URL
  reader.readAsDataURL(file);
};


const handleSubmit = () => {
  if ((!file && !chapterData.content) || !chapterData.chapterName || !chapterData.chapterNumber) {
    toastr.error("Please fill in all the required fields");
    return;
  }

  // Check whether isNovel is true and volumeNumber is empty
  if (isNovel && !chapterData.volumeNumber) {
    toastr.error("Please fill in the volume number field");
    return;
  }

  if (file && chapterData.content) {
    toastr.error("Please choose only one option to upload chapters");
    return;
  }

  // Force a state update to make sure selectedOption is available
  setTimeout(() => {
    let chapterPayload;

    
    if (file && file.type) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file); // Read the file as an ArrayBuffer for binary files like PDF
      reader.onload = () => {
        // Convert the ArrayBuffer to a base64 string
        const base64File = btoa(
          new Uint8Array(reader.result)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );

        // Add the appropriate prefix
        const prefixedBase64File = `data:application/pdf;base64,${base64File}`;
    
        const payload = {
          ...chapterData,
          file: prefixedBase64File,
          fileName: file.name,
          isNewGroup: isNewGroup,
        };
    
        if (isNewGroup) {
          chapterPayload = {
            ...payload,
            bookCode: libroData.code,
            group_created_id: selectedGroup,
          };
        } else {
          chapterPayload = {
            ...payload,
            id: libroData.id,
            group_created_id: libroData.group_created_id,
          };
        }

        console.log(chapterPayload);
        sendChapterToBackend(chapterPayload);
      };
    } else {
      const payload = {
        ...chapterData,
        content: chapterData.content,
        isNewGroup: isNewGroup,
      };

      if (isNewGroup) {
        chapterPayload = {
          ...payload,
          bookCode: libroData.code,
          group_created_id: selectedGroup,
        };
      } else {
        chapterPayload = {
          ...payload,
          id: libroData.id,
          group_created_id: libroData.group_created_id,
        };
      }
      console.log(chapterPayload);
      sendChapterToBackend(chapterPayload);
    }
  }, 0); // Calling setTimeout with a 0ms delay will force a state update
};
const sendChapterToBackend = (chapterPayload) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({chapterPayload}),
  };

  fetch(EndpointCore.uploadChapter, requestOptions)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then(data => {
        throw new Error(data.error || "Error sending the chapter");
      });
    }
  })
    .then(data => {
      console.log("Server response:", data);
      toastr.success("Chapter uploaded successfully");
      setTimeout(() => {
        const redirectPath = isNewGroup ? `/book-detail/${originalTitle}` : `/book-edit/${libroData.id}`;
        navigate(redirectPath, { state: { libroData } });}, 2000);
    })
    .catch(error => {
      console.error("Error:", error);
      toastr.error(error);
    });
};

const handleDeleteImage = (index) => {
  // Filter out the selected image
  const updatedImages = chapterData.images.filter((_, i) => i !== index);

  // Update chapterData with the filtered images
  setChapterData((prevData) => ({
    ...prevData,
    images: updatedImages,
  }));
};

const handleButtonClick = () => {
  setShowEditor(!showEditor); // Show the editor when the button is clicked
};

const onMoveImage = (dragIndex, hoverIndex) => {
  const updatedImages = [...chapterData.images];
  const [draggedImage] = updatedImages.splice(dragIndex, 1);
  updatedImages.splice(hoverIndex, 0, draggedImage);

  setChapterData((prevData) => ({
    ...prevData,
    images: updatedImages,
  }));
};



  /* content */
  const content01 = `<ul>
                            <li>1. Mark of Cups </li>
                            <li>2. The sentence </li>
                            <li>3. Horror of the reincarnated</li>
                        </ul>`;
  const content02 = `<p>
                            Qin Tian was stranded on a desert island after a shipwreck. All he has equipped is a survival system and a pocketknife. He has to start from scratch. Building a camp, making fire, and fishing, he has to do
                            everything he can to survive. Fortunately, there are many beauties by his side! School goddess, blonde sister, violent loli. Qin Tian was stranded on a desert island after a shipwreck. Building a camp, making
                            fire and fishing, he has to do everything he can to survive. Fortunately, there are many beauties by his side!
                        </p>`;
  const content03 = `<ul class="ul_publicado">
    <li>
        <a href="./#"><img src="/img/internal/book/avatar/avatar_1.png" alt=""> We Are Party</a>
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
  const content04 = `
<a href="./#">Comedy</a>
<a href="./#">Adventure</a>
<a href="./#">Manga</a>
<a href="./#">Childhood love</a>
<a href="./#">Revenge</a>
<a href="./#">Anime</a>
`;
  const content05 = `<a href="./#">Comedy</a>
<a href="./#">Adventure</a>
<a href="./#">Manga</a>
<a href="./#">Childhood love</a>
<a href="./#">Revenge</a>
<a href="./#">Anime</a>`;
  // Details

  // Chapters
  const contentChapters = `
    <div class="option">
        <span class="item1">Status</span>
        <span class="item2">Ongoing</span>
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
        <span class="item1">Demographics</span>
        <span class="item2">Shoujo</span>
    </div>
`;

  const headContentItem = `
<div class="ifoto">
    <a href="book-read-chapter"><img src="/img/internal/book/photo1.png" alt=""></a>
</div>
<div class="itext">
    <div class="title" data-toggle="collapse" href="#collapseItema1" role="button" aria-expanded="true" aria-controls="collapseItem1">The fallen hero's beginning
        <div class="btn_cbo"></div>
    </div>
    <div class="subtitulo1">Ch. 01</div>
    <div class="subtitulo2">January 11, 2012</div>
</div>`;
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
      foto_movil : libroData.fotoCover || (libroData.imagePaths && libroData.imagePaths[1] && `data:image/jpeg;base64,${libroData.imagePaths[1].base64}`)  || "/path/to/default/cover_mobile.png",
      foto: libroData.fotoCover  || (libroData.imagePaths && libroData.imagePaths[1] && `data:image/jpeg;base64,${libroData.imagePaths[1].base64}`) || "/path/to/default/cover_desktop.png",
      texto: `Our Books`,
    },
  ];

  const ibanner = [
    {
      foto_movil: "/img/banner/slider-transparent.png",
      foto:  "/img/banner/slider-transparent.png",
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
  console.log('chapters', chapters)
  console.log('is new group', isNewGroup)
return (
  <div className="interna libros detail">
    <div className="position_header position hide_movil">
      <div className="hide_movil container">
        <Menu></Menu>
      </div>
      <div className="ui_header hide_desk">
        <ul className="header-icon-mobile-detalle-libro">
          <li className="icon1">
            <a href="/#" onClick={(e) => { e.preventDefault(); navigate(-1); }}>
              <img src="/img/internal/book_detail/m-prev.png" alt="" />
            </a>
          </li>
          <li className="icon2">
            <img src="/img/internal/book_detail/m-share.png" alt="" />
            <img src="/img/internal/book_detail/m-star.png" alt="" />
            <img src="/img/internal/book_detail/m-tres.png" alt="" />
          </li>
        </ul>
      </div>
      <div className="top-banner">
        <Banner items_banner={ibanner}></Banner>
      </div>
    </div>
    <div className="position_top_A position">
      <div className="container" style={{ display: 'flex', paddingLeft: '0px' }}>
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
            <LittleBookEdit btnTitle="Upload chapter" libroData={libroData} handleSubmit={handleSubmit}></LittleBookEdit>
          </div>
          <div className="acordeonType2 cardInfoChapters padding-right_10 d-flex" style={{ flexDirection: "column" }}>
            <div className="box-row subtitulo margin-button-20">
              <span>upload chapter </span>
            </div>
            <label className="form-check-label" htmlFor="type2" style={{ fontWeight: "bold", color: "black" }}>
              CREATE CHAPTER
            </label>
            <div style={!isNovel ? { display: "flex", alignItems: "center" } : { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <div className="ibillete">
                {isNovel && (
                  <div className="group-date historia">
                    <span>Volume No.</span>
                    <input
                      className=""
                      type="text"
                      name="volumeNumber"
                      value={chapterData.volumeNumber}
                      onChange={handleChange}
                    />
                  </div>
                )}
                <div className="group-date historia">
        <span>Chapter No.</span>
        {!isNewGroup ? (
        <input
          className=""
          type="text"
          name="chapterNumber"
          value={chapterData.chapterNumber}
          onChange={handleChange}
        />
      ) : (
        <input
          type="text"
          name="chapterNumber"
          value={chapterData.chapterNumber}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          readOnly={!isEditable}
        />
        )}

        {isNewGroup && isDropdownVisible && (
          <ul className="dropdown">
            {chapters.map((chapter) => (
              <li key={chapter.number} onClick={() => handleSelect(chapter.number)}>
                Chapter {chapter.number}
              </li>
            ))}
            <li onClick={() => handleSelect('new')}>Add New Chapter</li>
          </ul>
        )}
      </div>
      </div>
              <div className="ibillete">
                <div className="group-date historia">
                  <span>Chapter Name</span>
                  <input
                    className=""
                    type="text"
                    name="chapterName"
                    value={chapterData.chapterName}
                    onChange={handleChange}
                    disabled={isNewGroup && !isEditable && chapterData.chapterNumber !== 'new'} 
                  />
                </div>
              </div>
            </div>
            {isNewGroup ? (
              <div className="ibillete">
                <div className="group-date historia">
                  <DropdownAgrupacion
                    options={groupsData}
                    onSelect={setSelectedGroup}
                    label="Select group"
                  />
                </div>
              </div>
            ) : null}
            <br />
            <label className="form-check-label" htmlFor="type2" style={{ fontWeight: "bold" }}>
              APPEARANCE
            </label>
            <label className="form-check-label" htmlFor="type2">
              Good spelling matters
            </label>
            <div className="mt-5">
            {isNovel ? (
        showEditor ? (
          <div className="inputBook" style={{ display: "flex", marginRight: 10, padding: "5px 10px" }}>
            <ReactQuill
              theme="snow"
              placeholder="Write your story"
              modules={{
                toolbar: [
                  [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                  [{ size: [] }],
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                  ['link', 'image', 'video'],
                  ['clean']
                ],
              }}
              value={chapterData.content}
              onChange={handleContentChange}
              readOnly={isEditorDisabled}
            />
          </div>
        ) : (
          <div style={{width: '300px', height: '55px'}}>
          <div style={{ display: "flex", marginRight: 10, padding: "5px 10px",  justifyContent: "center", width: '100%', height: '44px' }}
          className = 'inputBook'
          onClick={handleButtonClick} 
            >
            <img src="/img/edit.png" style={{ width: "20", marginRight: "10px" }} />
            Write your story
          </div>
          </div>
        )
              ) : !isNewGroup && (
                <div style={{ display: 'flex', marginBottom: '25px' }}>
                  <div style={{ width: "107px", height: "82px" }}>
                    <img
                      src={chapterProfileImage ? chapterProfileImage : "/img/internal/profile/logo.png"}
                      style={{ maxWidth: "100%", maxHeight: "100%", marginRight: "10px", borderRadius: "15px" }}
                    />
                  </div>
                  <div style={{ marginLeft: "20px" }}>
                    <div className="form-check-label" style={{ fontWeight: "bold" }}>
                      Profile picture
                    </div>
                    <div className="form-check-label" style={{ fontWeight: "500" }}>
                      Recommended 800x80px
                    </div>
                    <div className="inputBook" style={{ display: "flex", marginRight: 10, padding: "5px 10px" }}>
                      <FileUploader
                        handleChange={handleChapterProfileImage}
                        name="file"
                        types={["JPG", "PNG", "GIF"]}
                        label={"Select images"}
                        dropMessageStyle={{ backgroundColor: "#c1c1c1" }}
                      >
                        <div style={{ display: "flex", marginRight: 10, padding: "5px 10px", width: "196px", height: "32px", justifyContent: "center" }}>
                          <img src="/img/image.png" style={{ width: "20", marginRight: "10px" }} />
                          Select image
                        </div>
                      </FileUploader>
                    </div>
                  </div>
                </div>
              )}
              <div className="d-flex">
                <div className="inputBook" style={{ display: "flex", marginRight: 10, padding: "5px 10px" }}>
                  
                 
                  <FileUploader
                    handleChange={handleImageChange}
                    name="file"
                    types={["JPG", "PNG", "GIF"]}
                    label={"Upload images"}
                    dropMessageStyle={{ backgroundColor: "#c1c1c1" }}
                    multiple={true}
                    disabled={isFileDisabled}
                  >
                    <div style={{ display: "flex", marginRight: 10, padding: "5px 10px", width: "165px", height: "32px", justifyContent: "center", cursor: 'pointer' }}>
                      <img src="/img/image.png" style={{ width: "20", marginRight: "10px" }} />
                      Upload images
                    </div>
                  </FileUploader>
                </div>
                <div className="inputBook" style={{ display: "flex", marginRight: 10, padding: "5px 10px" }}>
                  <FileUploader
                    handleChange={handleFileChange}
                    name="file"
                    types={["PDF"]}
                    label={"Upload PDF"}
                    dropMessageStyle={{ backgroundColor: "#c1c1c1" }}
                    multiple={false}
                    disabled={isFileDisabled}
                  >
                    <div style={{ width: "120px", height: "32px", display: "flex", marginRight: 10, padding: "5px 10px", justifyContent: "center", cursor: 'pointer'}}>
                      <img src="/img/pdf.png" style={{ width: "20", marginRight: "10px" }} />
                      Upload PDF
                    </div>
                  </FileUploader>
                </div>
              </div>
              {chapterData.images?.length > 0 && (
  <div>
    <label
      className="form-check-label"
      htmlFor="type2"
      style={{ fontWeight: "bold", color: '#212429' }}
    >
      IMAGE UPLOAD
    </label>
    <label className="form-check-label" htmlFor="type2" style={{ marginBottom: '20px' }}>
      You can reorder the images
    </label>
    <DndProvider backend={HTML5Backend}>
      {/* Images and titles section */}
      {chapterData.images.map((image, index) => (
        <DraggableImage
          key={`image-${index}`}
          index={index}
          onMoveImage={onMoveImage}
        >
          <div>
            <img
              src={image.data}
              alt={`Image ${index}`}
              style={{
                borderRadius: "15px",
                width: '109px',
                height: '146px',
                objectFit: 'cover',
              }}
            />
          </div>
          <div className="itext ml-3" style={{ alignItems: 'center', display: 'flex' }}>
            <div
              className="title"
              data-toggle="collapse"
              href={`#collapseItem${index + 1}`}
              role="button"
              aria-expanded="true"
              aria-controls={`collapseItem${index + 1}`}
            >
              <span
                className="form-check-label"
                style={{
                  fontWeight: 'bold',
                  marginLeft: '15px',
                  width: '165px',
                  whiteSpace: 'normal',
                  wordWrap: 'break-word',
                  color: '#212429',
                }}
              >
                {image.name}
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
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
                onClick={() => handleDeleteImage(index)}
              >
                <img
                  src="/img/trash.png"
                  alt="trash"
                  style={{ width: '20px' }}
                />
                <label
                  className="form-check-label"
                  htmlFor="type1"
                  style={{ marginLeft: '10px', color: '#212429' }}
                >
                  Delete
                </label>
              </button>
            </div>
          </div>
        </DraggableImage>
      ))}
    </DndProvider>
  </div>
)}

                <div
                  className="mt-5"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <button
                    type="button"
                    className="btn btn_rosado"
                    onClick={handleSubmit}
                  >
                    Upload chapter
                  </button>
              </div>
              <div className="hide_movil footer-menu">
                 <Footer  />
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
                    <div className="mi-title">{"title"}</div>
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
                  title={"Recommended"}
                  config={recommendedCarouselConfig}
                ></Carrusel>
              </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default BookUploadChapter;
