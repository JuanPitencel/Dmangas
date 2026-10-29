import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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

const readFileAsBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = (error) => reject(error);
  });

export default function EditBookForm() {
  const location = useLocation();
  const libroData = location.state

  const [next, setNext] = useState(false);
  const [error, setError] = useState(null);
  const [categoria, setCategoria] = useState([]);
  const [etiquetas, setEtiquetas] = useState([]);
  const [demografia, setDemografia] = useState([]);
  const [statusFilter, setStatusFilter] = useState([]);
  const [typesFilter, setTypesFilter] = useState([]);
  const [agrupacion, setAgrupacion] = useState([]);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [images, setImages] = useState({
    image1: libroData?.libroData?.imagePaths[0]?.path || null,
    image2: libroData?.libroData?.imagePaths[1]?.path || null
  });
  const [showModal, setShowModal] = useState(false);
  
  const [profileImageSrc, setProfileImageSrc] = useState(
    libroData?.libroData?.imagePaths.find(img => img.view === 'PROFILE') ? 
    `data:image/png;base64,${libroData.libroData.imagePaths.find(img => img.view === 'PROFILE').base64}` : 
    "img/internal/profile/avatar.png"
);

const [coverImageSrc, setCoverImageSrc] = useState(
    libroData?.libroData?.imagePaths.find(img => img.view === 'COVER') ? 
    `data:image/png;base64,${libroData.libroData.imagePaths.find(img => img.view === 'COVER').base64}` : 
    "img/upload-banner.png"
);
   
  const [formState, setFormState] = useState({
    code: libroData?.libroData.code || "",
    nombreManga: "",
    idioma: "",
    autor: "",
    agrupacion: "",
    nombreAlternativo: "",
    estado: "",
    demografia: "",
    categoria: "",
    etiquetas: "",
    bookContentType : libroData?.book_content_type || "",
    descripcion: libroData?.libroData.description || "",
    imagenPerfil: "",
    imagenPerfilName: "",
    imagenPortada: "",
    imagenPortadaName: "",
    fecha: "",
    bookTypeId: "",
  });
  const [loading, setLoading] = useState(false);

  console.log('bookDataInEdit', libroData)
  const handleImageChange = (event, imageNumber) => {
    const file = event.target.files[0];


    // Update the state with the selected image
    setImages((prevImages) => ({
      ...prevImages,
      [imageNumber]: file,
    }));
  
    if (imageNumber === 'image1') {
      setProfileImageSrc(URL.createObjectURL(file));
    } else if (imageNumber === 'image2') {
      setCoverImageSrc(URL.createObjectURL(file));
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

    return { attributeData, typesData, statusData };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { attributeData, typesData, statusData } = await loadDataFromLocalStorage();
        const statusFilterData = statusData?.items.map((item) => ({ item: item.name.value })) || [];
        const typesFilterData = typesData?.items.map((item, index) => ({  item: item.alias, index : index + 1 })) || [];
        const etiquetasFilterData = attributeData?.items.filter(item => item.type.name === "Etiquetas") || [];
        const etiquetasData = etiquetasFilterData.map((item) => ({ 
          value: item.attributeAlias,
          label: item.attributeName.value 
        }));        
        const categoriaFilterData = attributeData?.items.filter(item => item.type.name === "Categories") || [];
        const categoriaData = categoriaFilterData.map((item) => ({ 
        value: item.attributeAlias, 
        label: item.attributeName.value 
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
          'Authorization': `Bearer ${jwt}` 
        };
    
        const response = await fetch(EndpointCore.getGroupsByMemberCode, { headers });
        const groupsData = await response.json();
        const groupsFilterData = groupsData.groups.map((item) => ( {id: item.id, name: item.name} )) ; // Here we access groupsData.groups
        setAgrupacion(groupsFilterData);

        return(groupsData);
      } catch (error) {
        throw new Error('Error fetching groups: ' + error.message);
      }
    };
    fetchGroups()

  }, []);

 
  const handleEditBook = async () => {
    try {
      setLoading(true);
      
      if (!formState.nombreManga || !formState.idioma || !formState.autor || !formState.agrupacion || !formState.estado || !formState.demografia || !formState.categoria || !formState.etiquetas || !formState.bookContentType || !formState.descripcion) {
        toastr.error('All fields are required');
        return;
      }

      let profileImageBase64;
      let coverImageBase64;

      // Check whether the images are URLs or were selected from the inputs
     if (images.image1 instanceof File) {
     profileImageBase64 = await readFileAsBase64(images.image1);
     } else {
     // The profile image hasn't changed, keep the default image
     profileImageBase64 = images.image1;
     }

     if (images.image2 instanceof File) {
     coverImageBase64 = await readFileAsBase64(images.image2);
     } else {
     // The cover image hasn't changed, keep the default image
     coverImageBase64 = images.image2;
     }

      const newFormState = {
        ...formState,
        imagenPerfil: profileImageBase64,
        imagenPortada: coverImageBase64,
        imagenPerfilName: images.image1 ? images.image1.name : "avatar.png",
        imagenPortadaName: images.image2 ? images.image2.name : "upload-banner.png",
      };

      setFormState(newFormState);

      const response = await fetch(Global.editBook, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFormState),
      });

      if (response.ok) {
        const data = await response.json();
        toastr.success('Book edited successfully');
        console.log('Book edited successfully:', data);
      } else {
        const errorData = await response.json();
        toastr.error(errorData.message);
        console.error('Error editing the book:', errorData.message);
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
      "Public Domain (translation)": "PUBLIC",
      "Original Content (Copyrighted)": "ORIGINAL_CONTENT",
    };
  
    const backendValue = backendValueMap[value] || "";
  
    setFormState((prevFormState) => ({
      ...prevFormState,
      bookContentType: prevFormState.bookContentType === backendValue ? "" : backendValue,
    }));
  };
  const handleContinueButtonClick = () => {
    if (!formState.nombreManga || !formState.idioma || !formState.autor || !formState.agrupacion || !formState.estado || !formState.demografia || !formState.categoria || !formState.etiquetas || !formState.bookContentType || !formState.descripcion ) {
      toastr.error('All fields are required');
    } else {
      setNext(true);
    }
  };
  const openModal = () => {
    setShowModal(true);
  };
  return (
    <div className="interna comunidad_solicitudes">
      <div className="interna libro comunidad">
        <div className="position_header position ">
          <div className="seccion_interna ">
            <div className="ui_container ui_container--946 book-edit">
            <div style={{ position: 'fixed',  top: '20px', bottom: '20px' , height: `calc(100vh - 40px)`,}}>
              <MenuLeft />
            </div>
              <div className="col01 w-71 contenido" style={{marginLeft: '275px', marginTop: '20px', marginBottom:'20px'}}>
                <div className="box header" style={{ height: 32, marginTop: 20 }}>
                  <span>Edit Book</span>
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
                        libroData={libroData}
                      />
                    </div>
                     <div className={`form-check`}>
                       <input
                       className="form-check-input"
                       type="checkbox"
                       value="Public Domain (translation)"
                       checked={formState.bookContentType === "PUBLIC"}
                       onChange={() => handleCheckboxChange("Public Domain (translation)")}
                       />
                      <span>Public Domain (translation)</span>
                     </div>
                     <div className={`form-check`}>
                       <input
                       className="form-check-input"
                       type="checkbox"
                       value="Original Content (Copyrighted)"
                       checked={formState.bookContentType === "ORIGINAL_CONTENT"}
                       onChange={() => handleCheckboxChange("Original Content (Copyrighted)")}
                       onClick={openModal}
                      />
                      <span>Original Content (Copyrighted)</span>
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
                          height: "108px",
                          padding: "5px 20px",
                          display: "inline-block",
                          marginRight: "30px",
                          width: "100%",
                          marginBlock: 0,
                        }}
                      >
                        <span>Description</span>
                        <textarea
                           className="w-100"
                           rows={3}
                           onChange={(e) =>
                           setFormState({
                          ...formState,
                          descripcion: e.target.value,
                         })
                         }
                         defaultValue={libroData ? libroData.libroData.description : ""}
                        ></textarea>
                      </div>
                    </li>
                    <div className={`form-check`}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                      />
                      <span>I have read and accept the terms and conditions</span>
                    </div>
                    <div className="w-full d-flex justify-content-center my-5">
                      <Button title="continue" onClick={handleContinueButtonClick} />
                    </div>
                  </div>
                ) : (
                  <ul className="catalogo">
                    <li className="ibillete">
                      <span>APPEARANCE</span>
                      <div className="group-date fila no-borde">
                        <div className="apariencia">
                          <div className="group-date fila no-borde">
                            <span>A good image matters:</span>
                            <div className="r_item">
                             <MyDropzone
                               handleImageChange={handleImageChange}
                               imageNumber="image1"
                               imageSrc={profileImageSrc}
                              />
                               <div className="inputs-perfil">
                                <strong className="imagen-titulo">Profile picture</strong>
                                <span className="imagen-min">(Recommended 800x80px)</span>
                                <label className="btn-file-upload btn1">
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
                            <div className="portada-section">
                              <strong >Cover image</strong>
                              <span className="man">(Recommended 800x80px)</span>
                              <div>
                                <MyDropzone
                                  handleImageChange={handleImageChange}
                                  imageNumber="image2"
                                  imageSrc={coverImageSrc}
                                />
                                <label className="btn-file-upload btn2" style={{ margin:" 0 auto", width: "45%" }}>
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
                                <Button title={"Upload changes"} type="button"  onClick={handleEditBook}/>
                              </div>
                            </div>
                          </div>
                        </div>
                        </div>
                      </li>
                    </ul>
                  )}
                <div className="hide_movil footer-menu">
                 <Footer />
                 </div>
                </div>         
              </div>            
            </div>           
          </div>         
        </div>
        <ContenidoOriginalModal show={showModal} setShow={setShowModal} />       
      </div>
  );
}
