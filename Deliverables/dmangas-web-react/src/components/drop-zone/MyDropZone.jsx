import React from 'react';
import { useDropzone } from 'react-dropzone';
import './style.css';

const MyDropzone = ({ handleImageChange, imageNumber, imageSrc, add2 }) => {
  const onDrop = (acceptedFiles) => {
    handleImageChange({ target: { files: [acceptedFiles[0]] } }, imageNumber);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const containerClassName = imageNumber === 'image1' ? 'perfil-container' : 'portada-container';
  const imgClassName = 
    imageNumber === 'image1' 
      ? 'ifoto' 
      : add2 
        ? 'banner-upload-add2' 
        : 'banner-upload2';

  return (
    <div className={containerClassName} {...getRootProps()} style={dropzoneStyles}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here...</p>
      ) : (
        <img className={imgClassName} src={imageSrc} alt="" />
      )}
    </div>
  );
};

const dropzoneStyles = {
  textAlign: 'center',
  cursor: 'pointer',
};

export default MyDropzone;
