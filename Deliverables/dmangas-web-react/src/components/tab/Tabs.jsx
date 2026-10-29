import './style.css';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Filter from './filter/Filter';
import EndpointCore from '../../pages/Global';
import CustomImageLoader from '../CustomLoader/CustomImageLoader';
import CarouselBanner from '../carousel/CarouselBanner';

function Tabs(props) {   
    const [itemsHeadTabGender, setItemsHeadTabGender] = useState([]);  
    const [items, setItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const titulo = props.titulo;
    const keyPosition = props.key_position; 
    const config = props.config;
    const isUserLoggedIn = localStorage.getItem('data');
    const ancho = props.ancho;
    
    const data = [
        {
          ordenar: "Sort by",
          recomendados: "Recommended",
          ordenado_por: "SORTED BY",
          data: [
            { ibutton: "Latest publications" },
            { ibutton: "Recommended" },
            { ibutton: "Most popular" },
            { ibutton: "Top rated" },
          ],
        },
      ];
      
    const booksByCategories = (category) => {
        setIsLoading(true);
        setTimeout(() => {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
            headers: {}
        };
        fetch(
            EndpointCore.filterByCategory+"&filterCategoryAlias="+category,
            requestOptions
        )
        .then((response) => response.json())
        .then((result) => {
            console.log(result)
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
                    "manga": "Seinen",//i.attributes.name.value,
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
            setItems(data_items);
            setIsLoading(false);  
        })
           .catch((error) => console.log("error", error));
           setIsLoading(false)  
        
        }, 2000); 
    };
        /* CATEGORIES HOME BY GENDER SECTION */
       
    useEffect(() => {
    
        var requestOptions = {
            method: "GET", redirect: "follow", headers: {}
        };
        fetch(EndpointCore.categoriesOnHomeByGenderSection, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                let data = [];
                result.items.forEach((i, index) => {
                    data.push({
                        "selected": false,
                        "href": i.attributeCode,
                        "texto": i.attributeName.value,
                        "alias": i.attributeAlias,
                    })
                });
                data[0].href = 'comedia';
                data[0].selected = true;
                setItemsHeadTabGender(data)
                booksByCategories(data[0].alias)   
            })
            .catch((error) => console.log("error", error)); 
    }, []);

    const handleCardClick = (index) => {
        console.log("Book index:", index);
        const libroData = items[index];
        console.log("Book data:", libroData);
        navigate(`/book-detail/${libroData.titulo.trim().toLowerCase().replace(/\s+/g, '-')}`, { state: { libroData } });
    };

    return (
        <>
            <div className='tabs libro'> 
                <div className="icard-header">
                    <div className="icar-h4">
                        <div className='mi-titulo'>{titulo}</div> 
                    </div>
                    { ancho > 900 ? (
                        <div  className="icar-boton">
                            <button type="button">Show More</button>
                        </div> ) : (
                            <div className="icar-boton" > 
                                <a href="/#"><img className='link-simple normal hide_desk ' src="/img/svg/icon_arrow_right_5028C6.svg" alt="" /></a>
                                <a href="/#"><img className=' link-simple white hide_desk ' src="/img/svg/icon_arrow_right_FFFFFF.svg" alt="" /></a>   
                            </div>
                        )
                    }
                </div> 
                <div className="scroll-cabecera">
                    <div className='mi-scroll'>
                        <ul className="nav nav-tabs" id="myTab" role="tab-list">
                            {itemsHeadTabGender.map((value, i) =>
                                <li key={keyPosition+'01'+i} className="nav-item">
                                    <a 
                                        className={`nav-link ${value.href=== 'comedia' ? 'active' : ''}`}
                                        id={'tab_'+value.href}
                                        data-toggle="tab"
                                        href={'#'+value.href}
                                        role="tab"
                                        aria-controls={value.href}
                                        aria-selected={value.selected}
                                        onClick={() => booksByCategories(value.alias)}
                                    >
                                        {value.texto}
                                    </a>
                                </li>  
                            )}
                        </ul>
                    </div> 
                </div>   
                <div className='li-filtro'>               
                    <Filter data={data} />
                </div>
                {
                    isLoading ? ( 
                        <CustomImageLoader/> ) : (
                            items.length > 0 &&
                            <div className="tab-content" id="myTabContent">
                                {
                                    items.map((val, i) =>
                                        <div 
                                            key={keyPosition + '02' + i}
                                            className={`tab-pane fade ${i=== 0 ? 'show active' : ''}`}
                                            id={val.href}
                                            role="tabpanel"
                                            aria-labelledby={'tab_'+val.href}
                                        >
                                            <CarouselBanner
                                                icarrusel={items}
                                                key_position={keyPosition + '03' + i}
                                                titulo={titulo}
                                                config={config}
                                                onCardClick={handleCardClick}
                                                showBanner={props.showBanner}
                                            /> 
                                            </div>
                                    )
                                }     
                            </div>
                        )
                }
            </div>
        </>
    );
}

export default Tabs;
