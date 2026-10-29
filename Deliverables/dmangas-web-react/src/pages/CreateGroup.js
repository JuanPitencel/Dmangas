import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer/Footer";
import MenuLeft from "../components/menu-left";
import Button from "../components/button/Button";
import Global from "./Global";
import '../assets/css/interna.css';
import MyDropzone from "../components/drop-zone/MyDropZone";

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupId, setGroupId] = useState(null);
  const [images, setImages] = useState({ image1: null, image2: null });
  const [profileImageSrc, setProfileImageSrc] = useState("img/internal/profile/avatar.png");
  const [coverImageSrc, setCoverImageSrc] = useState("img/upload-banner.png");
  const [isGroupData, setIsGroupData] = useState(false);
  const [edit, setEdit] = useState(false);
  const [imagePaths, setImagePaths] = useState([]);

  const navigate = useNavigate();

  const handleGroupLabelClick = (event) => {
  event.preventDefault();
  setEdit(true);
};
  
  const handleNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setGroupDescription(event.target.value);
  };

  const handleImageChange = (event, imageNumber) => {
    const file = event.target.files[0];
  
    if (imageNumber === 'image1') {
      setProfileImageSrc(URL.createObjectURL(file));
    } else if (imageNumber === 'image2') {
      setCoverImageSrc(URL.createObjectURL(file));
    }
  
    setImages((prevImages) => ({
      ...prevImages,
      [imageNumber]: file,
    }));
  };
  
  const handleSaveChanges = async () => {
    try {
      const userToken = localStorage.getItem('token');
      const response = await fetch(Global.createGroup, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          name: groupName,
          group_description: groupDescription,
          edit: edit,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const createdGroupId = data.data.id;
        setGroupId(createdGroupId);
        alert('Group saved successfully');

      } else {
        const errorData = await response.json();
        alert(errorData.message);

        console.error('Error sending data to server:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        resolve(reader.result.split(',')[1]);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleSaveImages = async () => {
    try {
      const userToken = localStorage.getItem('token');
      if (!groupId) {
      alert("You must create a group before uploading images.");
      return;
      }
      if (imagePaths.length > 0 && !edit) {
        alert("You must edit to change the images.");
        console.log('imagePaths', imagePaths)
        return;
      }
      if (!images.image1 || !images.image2) {
        alert("You must upload images for both the profile and the cover.");
        return;
      }
  
      const requestData = {
        groupId: groupId,
        groupName: groupName,
        images: [
          { name: images.image1.name, data: await readFileAsBase64(images.image1) },
          { name: images.image2.name, data: await readFileAsBase64(images.image2) },
        ],
      };
  
      const response = await fetch(Global.uploadImages, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify(requestData),
        
      });
  
      if (response.ok) {
        const data = await response.json();
        setEdit(true);
        alert('Images saved successfully');


      } else {
        console.error('Error processing images on the client:', response.statusText);
      }
    } catch (error) {
      console.error('Error processing images on the client:', error);
    }
  };
  const handleUpdateChanges = async () => {
    try {
      const userToken = localStorage.getItem('token');
      const response = await fetch(Global.updateGroup, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          name: groupName,
          group_description: groupDescription,
          edit: edit,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Group updated:', data);
        alert('Group updated successfully');


      } else {
        const errorData = await response.json();
        alert(errorData.message);
        console.error('Error sending data to server:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdateImages = async () => {
    try {
      const userToken = localStorage.getItem('token');

      if (!groupId) {
        alert("You must create a group before uploading images.");
        return;
      }

      if (!images.image1 && !images.image2) {
        alert("You must upload at least one image (profile or cover) for the update.");
        return;
      }
  
      const requestData = {
        groupId: groupId,
        groupName: groupName,
        images: [
          {
            name: images.image1?.name,
            data: images.image1 ? await readFileAsBase64(images.image1) : null,
            code: imagePaths[0] ?.code,
          },
          {
            name: images.image2 ?.name,
            data: images.image2 ? await readFileAsBase64(images.image2) : null,
            code: imagePaths[1] ?.code,

          },
        ],
      };
  
      const response = await fetch(Global.updateImages, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify(requestData),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert('Images updated successfully');


      } else {
        console.error('Error processing images on the client:', response.statusText);
      }
    } catch (error) {
      console.error('Error processing images on the client:', error);
    }
  };

    return (
    <div className="interna comunidad_solicitudes">
      <div className="interna libro comunidad">
        <div className="position_header position ">
          <div className="seccion_interna">
            <div className="ui_container ui_container--946 book-edit">
              <div style={{ position: 'fixed',  top: '20px', bottom: '20px' , height: `calc(100vh - 40px)`,}}>   
               <MenuLeft isGroupData={isGroupData} onGroupLabelClick={handleGroupLabelClick} />
              </div>
              <div className="col01 w-71 contenido" style={{marginLeft: '275px', marginTop:'20px', marginBottom: '20px'}}>
                <div className="box ">
                  <div className="box header" style={{ height: 32, marginTop: 20 }}>
                  <span>{edit ? 'Edit Group' : 'Create Group'}</span>
                  </div>
                    <div className="box header" style={{ fontWeight: 'bold', marginTop: 10 }}>
                      <span style={{ color: 'black', fontSize: 16 }}>
                      {edit ? 'ENTER YOUR NEW DATA' : 'ENTER YOUR DATA'}
                      </span>
                     </div>
                  <div className="box header" style={{ marginTop: -65, height: '30px' }}>
                    <span style={{ color: "#424242", fontSize: '12px' }}>Tell us more</span>
                  </div>
                  <ul className="mt- -6">
                    <li className="ibillete px-3 max-width-full-important ">
                      <div
                        className="group-date historia"
                        style={{
                          background: "#FFFFFF",
                          border: "1px solid #5F36DA",
                          boxShadow: "0px 1px 1px rgba(51, 154, 240, 0.1)",
                          borderRadius: "8px",
                          maxWidth: "100%",
                          height: "50px",
                          padding: "5px 20px",
                          display: "inline-block",
                          marginRight: "30px",
                          width: "89%",
                          marginBlock: 0,
                        }}
                      >
                        <input
                          type="text"
                          value={groupName}
                          onChange={handleNameChange}
                          className="w-100"
                          placeholder="Group name"
                        />
                      </div>
                    </li>
  
                    <li className="ibillete px-3 max-width-full-important">
                    <div
                     className="group-date historia"
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
                     marginTop: "2rem",
                     }}
                    >
                     <textarea
                       placeholder="Group description"
                       value={groupDescription}
                       onChange={handleDescriptionChange}
                       className="w-100"
                       rows={3}
                       style={{ border: "none", outline: "none", width: "100%", marginTop: "5px" }}
                     ></textarea>
                  </div>
               </li>
             </ul>
                  <ul className="catalogo">
                     <li className="ibillete">
                      <div className="group-date fila no-borde">
                        <div className="mt-3">
                          <Button
                          title={edit ? "Update Changes" : "Save Changes"}
                           onClick={edit ? handleUpdateChanges : handleSaveChanges}
                          />
                        </div>
                        <div className="apariencia">
                        <span>APPEARANCE</span>
                        <div className="group-date fila no-borde">
                             <span>Making a good impression is important:</span>
                             <div className="r_item">
                             <MyDropzone
                              handleImageChange={handleImageChange}
                              imageNumber="image1"
                              imageSrc={profileImageSrc}
                             />
                            <div className="inputs-perfil">
                                <strong className="imagen-titulo">Profile image</strong>
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
                                 </div>
                                   <div className="mt-5">
                                   <Button
                                      title={edit ? "Update Changes" : "Save Changes"}
                                      onClick={edit ? handleUpdateImages : handleSaveImages}
                                    />
                                     </div>
                                 </div>
                                 </div>
                                 </div>
                               <hr style={{ width: '100%', borderBottom: '1px solid #000' }} />
                               <h2 style={{ fontWeight: 'bold', fontSize: '16px' }}>My Payments</h2>
                               <p style={{ marginBottom: '20px' }}>How to manage my payments</p>
                               <div style={{display:"flex"}} >
                               <div style={{displya:'block'}}>
                                 <img src="img/paypal.png" style={{marginRight:'auto'}} />
                               </div>
                               <div style={{marginLeft:'auto', display:'flex'}}>
                            <img src="img/edit.png" alt="Edit icon" style={{ marginRight: '10px' }} />
                            <img src="img/trash.png" alt="Trash icon" style={{ marginRight: '10px' }} />
                          </div>
                        </div>
                        <div className="mt-5">
                          <Button title="Save Changes" />
                        </div>
                        <hr style={{ width: '100%', borderBottom: '1px solid #000' }} />
                        <h2 style={{ fontWeight: 'bold', fontSize: '16px' }}>My Social Networks</h2>
                        <p style={{ marginBottom: '20px' }}>How people can find you on social media</p>
                        <div style={{display:"flex"}} >
                          <div style={{displya:'block'}}>
                            <img src="img/facebook.png" style={{marginRight:'auto'}} />
                          </div>
                          <div style={{marginLeft:'auto', display:'flex'}}>
                            <img src="img/edit.png" alt="Edit icon" style={{ marginRight: '10px' }} />
                            <img src="img/trash.png" alt="Trash icon" style={{ marginRight: '10px' }} />
                          </div>
                        </div>
                        <div style={{display:"flex"}} >
                          <div style={{displya:'block'}}>
                            <img src="img/twitter.png" style={{marginRight:'auto'}}/>
                          </div>
                          <div style={{marginLeft:'auto', display:'flex'}}>
                            <img src="img/edit.png" alt="Edit icon" style={{ marginRight: '10px' }} />
                            <img src="img/trash.png" alt="Trash icon" style={{ marginRight: '10px' }} />
                          </div>
                        </div>
                        <div className="mt-5">
                          <Button title="Save Changes" />
                        </div>
                      </div>
                    </li>          
                  </ul>       
                </div>
                <div className="hide_movil footer-menu">
                 <Footer  />
                </div>
              </div>
           
            </div>
           
          </div>
          
        </div>
       
      </div>
     
    </div>
  );
}
export default CreateGroup;
