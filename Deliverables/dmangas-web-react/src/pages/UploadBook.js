import React, {useEffect, useState} from 'react';
import Footer from "../components/footer/Footer";
import MenuLeft from "../components/menu-left";
import FormUploadBook from "../components/formUploadBook";
import Button from "../components/button/Button";
import MyDropzone from "../components/drop-zone/MyDropZone";
import Global from "./Global";
import toastr from 'toastr';
import CustomImageLoader from '../components/CustomLoader/CustomImageLoader';
import EndpointCore from '../pages/Global';
import ContenidoOriginalModal from '../components/original-content-modal/OriginalContentModal';
import useAuth from "../hook/useAuth";

const readFileAsBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = (error) => reject(error);
  });

export default function UploadBook() {
  const [next, setNext] = useState(false);
  const [error, setError] = useState(null);
  const [categoria, setCategoria] = useState([]);
  const [etiquetas, setEtiquetas] = useState([]);
  const [demografia, setDemografia] = useState([]);
  const [statusFilter, setStatusFilter] = useState([]);
  const [typesFilter, setTypesFilter] = useState([]);
  const [agrupacion, setAgrupacion] = useState([]);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [images, setImages] = useState({ image1: null, image2: null });
  const [profileImageSrc, setProfileImageSrc] = useState("img/svg/defaultImage.svg");
  const [coverImageSrc, setCoverImageSrc] = useState("img/svg/defaultImage.svg");
  const [bookContentType, setBookContentType] = useState({
    tipo: 'PUBLIC', // Can be 'PUBLIC' or 'ORIGINAL_CONTENT'
    id: null,      // ID of the selected option (null for PUBLIC)
    titulo: null,  // Title of the selected option (null for PUBLIC)
  });
  const [add1, setAdded1] = useState(false);
  console.log('add1', add1)
  const [add2, setAdded2]  = useState(false);
  const [formState, setFormState] = useState({
    nombreManga: "",
    idioma: "",
    autor: "",
    agrupacion: "",
    nombreAlternativo: "",
    nombreAlternativo2: "",
    estado: "",
    demografia: "",
    categoria: "",
    etiquetas: "",
    bookContentType: "",
    descripcion: "",
    imagenPerfil: "",
    imagenPerfilName: "",
    imagenPortada: "",
    imagenPortadaName: "",
    fecha: "",
    bookTypeId: "",
    bookContentType: bookContentType,
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const auth = useAuth();
  const userAuthor = auth?.auth?.user_name;    

 
  const handleImageChange = (event, imageNumber) => {
    const file = event.target.files[0];

    // Update the state with the selected image
    setImages((prevImages) => ({
      ...prevImages,
      [imageNumber]: file,
    }));

    // Show the selected image in the UI
    if (imageNumber === 'image1') {
      setProfileImageSrc(URL.createObjectURL(file));
      setAdded1(true);
    } else if (imageNumber === 'image2') {
      setCoverImageSrc(URL.createObjectURL(file));
      setAdded2(true);
    }
  };
  
  const fetchAttributes = async () => {
    try {
      const response = await fetch('https://core-api.example.com/public/api/core/attributes?limitPage=72&orderByColumn=lastestUpdated&orderDir=DESC&attributeType=null');
      const data = await response.json();
      return data;     
    } catch (error) {
      throw new Error('Error fetching attributes: ' + error.message);
    }
  };

  const fetchTypes = async () => {
    try {
      const response = await fetch('https://core-api.example.com/api/core/book-types?limitPage=100');
      const data = await response.json();

      return data;
    } catch (error) {
      throw new Error('Error fetching types: ' + error.message);
    }
  };

  const fetchStatus = async () => {
    try {
      const response = await fetch('https://core-api.example.com/api/core/book-activity-status?limitPage=100');
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error fetching status: ' + error.message);
    }
  };

  const loadDataFromLocalStorage = async () => {
    let attributeData = JSON.parse(localStorage.getItem('attributesData'));
    let typesData = JSON.parse(localStorage.getItem('bookTypeData'));
    let statusData = JSON.parse(localStorage.getItem('bookActivityStatusData'));

    if (!attributeData) {
      attributeData = await fetchAttributes();
      localStorage.setItem('attributesData', JSON.stringify(attributeData));
    }

    if (!typesData) {
      typesData = await fetchTypes();
      localStorage.setItem('bookTypeData', JSON.stringify(typesData));
    }

    if (!statusData) {
      statusData = await fetchStatus();
      localStorage.setItem('bookActivityStatusData', JSON.stringify(statusData));
    }

   
    return { attributeData, typesData, statusData};
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { attributeData, typesData, statusData } = await loadDataFromLocalStorage();
        const statusFilterData = statusData?.items.map((item) => ({ item: item.name.value })) || [];
        const typesFilterData = typesData?.items.map((item, index) => ({  item: item.alias, index : index + 1 })) || [];
        const etiquetasFilterData = attributeData?.items.filter(item => item.type.name === "Etiquetas") || [];
        const etiquetasData = etiquetasFilterData.map((item) => ({
          value: item.attributeAlias, // Use attributeAlias as the dropdown value
          label: item.attributeName.value // Show attributeName.value in the dropdown
        }));
        const categoriaFilterData = attributeData?.items.filter(item => item.type.name === "Categories") || [];
        const categoriaData = categoriaFilterData.map((item) => ({
        value: item.attributeAlias, // Use attributeAlias as the dropdown value
        label: item.attributeName.value // Show attributeName.value in the dropdown
        }));
        const demografiaFilterData = attributeData?.items.filter(item => item.type.name === "Demographics") || [];
        const demografiaData = demografiaFilterData.map((item) => ({ item: item.attributeAlias}));
        const languageOptionsData = [...new Set(attributeData?.items.map(item => item.attributeName.languageCode))]
        .map(languageCode => ({ item: languageCode }));
        setStatusFilter(statusFilterData);
        setCategoria(categoriaData);
        setEtiquetas(etiquetasData);
        setDemografia(demografiaData);
        setLanguageOptions(languageOptionsData);
        setTypesFilter(typesFilterData);

      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();

  }, []);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const jwt = localStorage.getItem('token');

        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
        };

        const response = await fetch(EndpointCore.getGroupsByMemberCode, { headers });
        const groupsData = await response.json();
        // Filter groups by the user's author
        const groupsFilterData = groupsData.groups
          .filter((item) => item.author === userAuthor)
          .map((item) => ({ id: item.id, name: item.name, author: item.author }));

        setAgrupacion(groupsFilterData);
      } catch (error) {
        console.error('Error fetching groups:', error.message);
      }
    };

    fetchGroups();
  }, [userAuthor]); // Add `userAuthor` as a dependency
  
  const handleUploadBook = async () => {
    try {
      setLoading(true)
      if (!images.image1 || !images.image2) {
      toastr.error('Both images must be selected');
      return;
    }
      if (!formState.nombreManga || !formState.idioma || !formState.autor || !formState.agrupacion || !formState.estado || !formState.demografia || !formState.categoria || !formState.etiquetas || !formState.bookContentType || !formState.descripcion ) {
        toastr.error('All fields are required');
        return;
      }

      const profileImageBase64 = await readFileAsBase64(images.image1);
      const coverImageBase64 = await readFileAsBase64(images.image2);

      const newFormState = {
        ...formState,
        imagenPerfil: profileImageBase64,
        imagenPortada: coverImageBase64,
        imagenPerfilName: images.image1.name,
        imagenPortadaName: images.image2.name,
      };

      setFormState(newFormState);

      const response = await fetch(Global.createBook, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFormState),
      });
      if (response.ok) {
        const data = await response.json();
        toastr.success('Book created successfully');
        console.log('Book created successfully:', data);
      } else {
        const errorData = await response.json();
        toastr.error(errorData.message);
        console.error('Error creating the book:', errorData.message);
      }
    } catch (error) {
      toastr.error('Error processing the request');
      console.error('Error processing the request:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (value) => {
    const backendValueMap = {
      "Public Domain (translation)": { id: null, tipo: "PUBLIC", titulo: null },
      "Original Content (Copyrighted)": { id: null, tipo: "ORIGINAL_CONTENT", titulo: "Copyrighted" },
    };

    const selectedValue = backendValueMap[value] || null;

    // Set bookContentType to the corresponding object
    setFormState((prevFormState) => ({
      ...prevFormState,
      bookContentType: selectedValue,
    }));
  };



  const openModal = () => {
    setShowModal(true);
  };

  const handleContinueButtonClick = () => {
    if (!formState.nombreManga || !formState.idioma || !formState.autor || !formState.agrupacion || !formState.estado || !formState.demografia || !formState.categoria || !formState.etiquetas || !formState.bookContentType || !formState.descripcion ) {
      toastr.error('All fields are required');
    } else {
      setNext(true);
    }
  };

  const handleBookContentTypeChange = (selectedOption) => {
    if (selectedOption) {
      const newBookContentType = {
        tipo: 'ORIGINAL_CONTENT',
        id: selectedOption.id,
        titulo: selectedOption.title,
      };
      setBookContentType(newBookContentType);
      setFormState((prevFormState) => ({
        ...prevFormState,
        bookContentType: newBookContentType,
      }));
    } else {
      setBookContentType({
        tipo: 'PUBLIC',
        id: null,
        titulo: null,
      });
      setFormState((prevFormState) => ({
        ...prevFormState,
        bookContentType: {
          tipo: 'PUBLIC',
          id: null,
          titulo: null,
        },
      }));
    }
  };

  console.log(formState)
  return (
    <div className="interna comunidad_solicitudes">
      <div className="interna libro comunidad">
        <div className="position_header position ">
          <div className="seccion_interna">
            <div className="ui_container ui_container--946 book-upload book-edit">
            <div style={{ position: 'fixed',  top: '20px', bottom: '20px' , height: `calc(100vh - 40px)`,}}>
               <MenuLeft />
            </div>              
              <div className="col01 w-71 contenido" style={{marginLeft: '310px', marginBottom: '20px', marginTop: '20px', minHeight: '1200px'}}>
                <div className="box header" style={{ height: 32, marginTop: '15px'}}>
                  <span className='uploadbook'>Create Book</span>
                </div>
                {!next ? (
                  <div className="box body d-flex flex-column">
                    <div className="box grid-tab">
                      <FormUploadBook 
                        categoria={categoria} 
                        etiquetas={etiquetas} 
                        demografia={demografia} 
                        statusFilter={statusFilter} 
                        languageOptions={languageOptions}
                        formState={formState}
                        setFormState={setFormState}
                        typesFilter={typesFilter}
                        agrupacion ={agrupacion}
                      />
                    </div>
                     <div className={'form-check'}>
                       <input
                       className="form-check-input"
                       type="checkbox"
                       value="Public Domain (translation)"
                       checked={formState.bookContentType.tipo === "PUBLIC"}
                       onChange={() => handleCheckboxChange("Public Domain (translation)")}
                       />
                      <span className='type-content'>Public Domain (translation)</span>
                     </div>
                     <div className={'form-check'}>
                       <input
                       className="form-check-input"
                       type="checkbox"
                       value="Original Content (Copyrighted)"
                       checked={ formState.bookContentType.tipo === "ORIGINAL_CONTENT"}
                       onChange={() => handleCheckboxChange("Original Content (Copyrighted)")}
                       onClick={openModal}
                      />
                     <span className='type-content'>Original Content ({bookContentType?.titulo || "Copyrighted"})</span>
                     </div>
                    <li className="ibillete px-3 max-width-full-important">
                     <div
                      className="group-date historia "
                      style={{
                        background: "#FFFFFF",
                        border: "1px solid #5F36DA",
                        boxShadow: "0px 1px 1px rgba(51, 154, 240, 0.1)",
                        borderRadius: "8px",
                        maxWidth: "100%",
                        padding: "5px 20px",
                        display: "inline-block",
                        marginRight: "30px",
                        width: "100%",
                        marginBlock: 0,
                      }}
                    >
                      <span style={{ fontFamily: "var(--font-Poppins-Medium)", fontSize: "12px" }}>Description</span>
                      <textarea
                        className="w-100"
                        rows={3}
                        style={{
                          height: "108px",
                          maxHeight: "500px",
                          resize: "none",
                          overflow: "auto",  
                          fontFamily: "var(--font-Poppins-Medium)",
                        }}
                        onChange={(e) => {
                          const textarea = e.target;
                          textarea.style.height = "108px";  // Reset to the initial height before calculating
                          textarea.style.height = Math.min(textarea.scrollHeight, 500) + "px";  // Adjust up to 500px
                          setFormState({
                            ...formState,
                            descripcion: textarea.value,
                          });
                        }}
                      ></textarea>
                    </div>
                    </li>
                    <div className={'form-check'}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue
                      />
                      <span className='term-condition'>I have read and accept the terms and conditions</span>
                    </div>
                    <div className="w-full d-flex justify-content-center my-5">
                      <Button title="continue" onClick={handleContinueButtonClick}  />
                    </div>
                  </div>
                ) : (
                  <ul className="catalogo" style={{marginTop: '-10px'}}>
                  <li className="ibillete">
                    <span className='uploadbook-span' style={{marginBottom: '5px'}}>APPEARANCE</span>
                    <span style={{color: '#424242'}}>A good image matters:</span>
                    <div className="group-date fila no-borde">
                      <div className="apariencia">
                        <div className="group-date fila no-borde">
                          <div className={`r_item uploadbook ${add1 ? 'uploadbook-added' : ''}`}>
                           <MyDropzone
                             handleImageChange={handleImageChange}
                             imageNumber="image1"
                             imageSrc={profileImageSrc}
                            />                                         
                            <div className='inputs-perfil uploadbook'>
                              <strong className="imagen-titulo">Profile picture</strong>
                              <span className="imagen-min" style={{marginBottom: '5px', marginLeft: '0px', display: 'block', textAlign: 'left'}}>(Recommended 800x80px)</span>
                              <label className="btn-file-upload btn1 uploadbook" style={{fontSize: '14px'}}>
                                Select image
                                 <input
                                  type="file"
                                  accept="image/*"
                                  style={{ display: "none" }}
                                  onChange={(event) => handleImageChange(event, 'image1')}
                                 />
                              </label>
                           </div>
                        </div>
                          <div className="portada-section" style={{marginTop: '40px'}}>
                            <strong className='titulo-portada'>Profile picture (second view)</strong>
                            <span className="man" style={{marginLeft: '0px', marginBottom: '10px'}}>(Recommended 800x80px)</span>
                            <div>
                              <MyDropzone
                                handleImageChange={handleImageChange}
                                imageNumber="image2"
                                imageSrc={coverImageSrc}
                                add2={add2}
                              />
                              <label className="btn-file-upload btn2 "
                              style={{width: '196px',  marginTop: '20px', fontSize: '14px',  whiteSpace: 'nowrap' }} >
                              Select image
                                <input
                                  type="file"
                                  accept="image/*"
                                  style={{ display: "none" }}
                                  onChange={(event) => handleImageChange(event, 'image2')}
                                />
                              </label>
                              {loading && <CustomImageLoader/>}
                            </div>
                            <div className="mt-5">
                              <Button title={"Upload book"} type="button"  onClick={handleUploadBook}/>
                            </div>
                          </div>
                        </div>
                      </div>
                      </div>
                    </li>
                  </ul>
                  )}
                  <div className="hide_movil footer-menu">
                   <Footer  />
                  </div>                   
                 </div>
                </div>
            </div>
          </div>
        </div>
        <ContenidoOriginalModal show={showModal} setShow={setShowModal} onSeleccionarOpcion={handleBookContentTypeChange}  />
      </div>
  );
}