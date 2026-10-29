import React, { useEffect, useState } from "react";
import DropdownForm from "../dropdownForm/DropdownForm";
import DropdownAgrupacion from "../dropdownForm/DropdownGroup";
import DropdownAttribute from "../dropdown-attribute/DropdownAttribute";
import './style.css';
export default function FormUploadBook({
  formState,
  setFormState,
  categoria,
  etiquetas,
  demografia,
  statusFilter,
  languageOptions,
  typesFilter,
  agrupacion,
  bookData,
}) 
{
  const [showAltName2, setShowAltName2] = useState(false);

  useEffect(() => {
    if (bookData) {
      const formattedDate = new Date(bookData.bookData.created_at).toISOString().slice(0, 16);

      setFormState((prevState) => ({
        ...prevState,
        nombreManga: bookData.bookData.title || "",
        autor: bookData.bookData.author || "",
        nombreAlternativo: bookData.bookData.alternative_title || "",
        nombreAlternativo2: bookData.bookData.alternative_title2 || "",
        estado: bookData.bookData.activity_status || "",
        fecha: formattedDate || "",
        bookTypeId: bookData.bookData.bookTypeAlias || null,
        agrupacion: bookData.bookData.groupName || null,
        categoria: bookData.bookData.categoria || [],
        etiquetas: bookData.bookData.etiquetas || [],
        demografia: bookData.bookData.demografia || "",
      }));
    }
  }, [bookData]);

  const handleInputChange = (label, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [label]: value,
    }));
  };

  const handleMultiSelectChange = (label, selectedOptions, maxLimit) => {
    if (selectedOptions.length <= maxLimit) {
      setFormState((prevState) => ({
        ...prevState,
        [label]: selectedOptions,
      }));
    } else {
      alert(`You can choose up to ${maxLimit} of ${label}`);
    }
  };

  const handleBookTypeSelect = (label, option) => {
    const selectedType = typesFilter.find((type) => type.item === option);
  
    if (selectedType) {
      setFormState((prevState) => ({
        ...prevState,
        bookTypeId: selectedType.item,
      }));
    }
  };
  const toggleAltName2 = () => {
    setShowAltName2(true);
  };
  

  return (
    <div className="uploadbook-wrap">
      <div id="tab1" className="tabcontent" style={{ display: "block" }}>
        <div className="box ">
          <div className="catalogo">
            <div className="ibillete">
              <span className="mb-0" style={{ fontSize: 14 }}>
                CREATE NEW TITLE
              </span>
              <p className="mb-5">Tell us more about the book</p>
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <div className="group-date historia texto">
                      <span>Manga name</span>
                      <input
                        className="form-input"
                        type="text"
                        value={formState.nombreManga}
                        onChange={(e) =>
                          handleInputChange("nombreManga", e.target.value)
                        }
                      />
                    </div>
                    <div className="group-date historia texto">
                      <span>Author</span>
                      <input
                        className="form-input"
                        type="text"
                        value={formState.autor}
                        onChange={(e) =>
                          handleInputChange("autor", e.target.value)
                        }
                      />
                    </div>
                    <div
                      className={`group-date historia texto ${
                        !showAltName2 ? "nombre-alternativo" : ""
                      }`}
                      >
                      <span>Alternative name</span>
                      <input
                        className="form-input"
                        type="text"
                        value={formState.nombreAlternativo}
                        onChange={(e) =>
                          handleInputChange("nombreAlternativo", e.target.value)
                        }
                      />
                    </div>
                    {!showAltName2 && (

                        <button className="add-btn" onClick={toggleAltName2}>
                           +
                        </button>
                        )}
                    {showAltName2 && (
                      <div className="group-date historia texto ">
                        <span>Second alternative name </span>
                        <input
                          className="form-input"
                          type="text"
                          value={formState.nombreAlternativo2 || ""}
                          onChange={(e) =>
                            handleInputChange("nombreAlternativo2", e.target.value)
                          }
                        />
                      </div>
                    )}
                    <div className="group-date historia">
                      <span>Date</span>
                      <input
                        className=""
                        type="datetime-local"
                        value={formState.fecha}
                        onChange={(e) =>
                          handleInputChange("fecha", e.target.value)
                        }
                      />
                    </div>
                    <div className="group-date historia">
                      <DropdownAttribute
                        modalTitle={'Demographics'}
                        modalSubtitle={'Select the option(s)'}
                        options={demografia}
                        onSelect={(option) =>
                          handleInputChange("demografia", option)
                        }
                        label={"Demographics"}
                        initialValue={bookData ? bookData.bookData.demografia : null}
                        singleSelect={true}
                      />
                    </div>
                    <div className="group-date historia">
                      <DropdownAttribute
                        maxLimit={6}
                        modalTitle={'Tags'}
                        modalSubtitle={'Select the option(s)'}
                        options={etiquetas}
                        onSelect={(selectedOptions) =>
                          handleMultiSelectChange("etiquetas", selectedOptions, 6)
                        }
                        label={"Tags"}
                        initialValue={bookData ? bookData.bookData.etiquetas : []}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="group-date historia">
                      <DropdownForm
                        options={languageOptions}
                        onSelect={(option) => handleInputChange("idioma", option)}
                        label={"Language"}
                        initialValue={bookData ? bookData.bookData.language : null}
                      />
                    </div>
                    <div className="group-date historia">
                      <DropdownAgrupacion
                        options={agrupacion}
                        onSelect={(option) =>
                          handleInputChange("agrupacion", option)
                        }
                        label={"Group"}
                      />
                    </div>
                    <div className="group-date historia">
                      <DropdownForm
                        options={statusFilter}
                        onSelect={(option) => handleInputChange("estado", option)}
                        label={"Status"}
                        initialValue={bookData ? bookData.bookData.statusTranslation : null}
                      />
                    </div>
                    <div className="group-date historia">
                      <DropdownForm
                        options={typesFilter}
                        onSelect={(option) =>
                          handleBookTypeSelect("bookTypeId", option)
                        }
                        label={"Book Type"}
                        initialValue={bookData ? bookData.bookData.bookTypeAlias : null}
                      />
                    </div>
                    <div className="group-date historia">
                      <DropdownAttribute
                        maxLimit= {4}
                        modalTitle={'Categories'}
                        modalSubtitle={'Select the option(s)'}
                        options={categoria}
                        onSelect={(selectedOptions) =>
                          handleMultiSelectChange("categoria", selectedOptions, 4)
                        }
                        label={"Category"}
                        initialValue={bookData ? bookData.bookData.categorias : []}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
