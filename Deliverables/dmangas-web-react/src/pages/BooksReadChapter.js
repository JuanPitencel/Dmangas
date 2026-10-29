import '../assets/css/App.css';
import '../assets/css/interna.css';
import '../assets/css/movil.css';
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Menu from '../components/menu/Menu';
import Banner from '../components/banner/Banner';
import Footer from '../components/footer/Footer';
import Carrusel from '../components/carousel/CarouselCustom';
import EndpointCore from './Global';
import ChapterViewer from '../components/chaptersViewer/ChapterViewer';
import CommentBox from '../components/comments/CommentBox';
import ReportDropdown from '../components/report-dropdown/ReportDropdown';
import useAuth from '../hook/useAuth';

function BooksReadChapter() {
    const params = useParams();
    const navigate = useNavigate();
    const { bookCode, chapterCode } = params; // Get bookCode and chapterCode from params
    const { auth } = useAuth();
    const userId = auth.id;
    const [chapters, setChapters] = useState([]);
    const [specificChapter, setSpecificChapter] = useState([]);
    const [showReportDropdown, setShowReportDropdown] = useState(false);

    const handleReportDropdownClick = () => {
        setShowReportDropdown(!showReportDropdown);
    };

    useEffect(() => {
        const fetchChapters = async () => {
            try {
                if (!chapterCode || !bookCode) {
                    throw new Error('Missing parameters to fetch the chapters');
                }

                const requestOptions = {
                    method: "GET",
                    redirect: "follow",
                    headers: {}
                };

                const response = await fetch(`${EndpointCore.getChapters}?bookCode=${bookCode}&chapterCode=${chapterCode}`, requestOptions);
                if (!response.ok) {
                    throw new Error('Error fetching the chapters');
                }

                const result = await response.json();
                console.log(result);

                let urlDocuments = [];
                if (result.specificChapter.urlDocument) {
                    urlDocuments = result.specificChapter.urlDocument.map(url => {
                        if (url.startsWith('data:application/pdf;base64,')) {
                            return url;
                        } else {
                            return url;
                        }
                    });
                }

                setChapters(result.chapters);
                setSpecificChapter({
                    ...result.specificChapter,
                    urlDocument: urlDocuments
                });
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchChapters();
    }, [chapterCode, bookCode]);

    useEffect(() => {
        const updateChapterHistory = async () => {
            try {
                if (!userId || !specificChapter.bookId || !specificChapter.groupId || !specificChapter.chapterId) {
                    console.error('Missing parameters to update the history.');
                    return;
                }
    
                const requestOptionsGet = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
    
                // Check whether a history entry already exists for that bookId
                const responseGet = await fetch(EndpointCore.getUserHistory(userId, specificChapter.bookId), requestOptionsGet);
                const resultGet = await responseGet.json();

                if (responseGet.ok && resultGet) {
                    // If a history entry already exists, update it with PUT
                    const requestOptionsPut = {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userId: userId,
                            bookId: specificChapter.bookId,
                            groupId: specificChapter.groupId,
                            chapterId: specificChapter.chapterId,
                        }),
                    };
                    const responsePut = await fetch(`${EndpointCore.updateUserHistory}`, requestOptionsPut);
                    if (!responsePut.ok) {
                        throw new Error('Error updating the history.');
                    }
                } else {
                    // If it doesn't exist, create a new one with POST
                    const requestOptionsPost = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userId: userId,
                            bookId: specificChapter.bookId,
                            groupId: specificChapter.groupId,
                            chapterId: specificChapter.chapterId,
                        }),
                    };
                    const responsePost = await fetch(`${EndpointCore.createUserHistory}`, requestOptionsPost);
                    if (!responsePost.ok) {
                        throw new Error('Error creating a new history record.');
                    }
                }
            } catch (error) {
                console.error('Error updating history:', error);
            }
        };

        // Call the function if specificChapter has the required data
        if (specificChapter.bookId && specificChapter.chapterId && userId) {
            updateChapterHistory();
        }
    }, [specificChapter, userId]);
    

    console.log('chapters', chapters);
    console.log('specificChapter', specificChapter);

    const items_banner = [{ foto_movil: 'img/internal/book_detail/ad.png', foto: 'img/internal/book_detail/ad.png', texto: `ADVERTISEMENT` }];
    const ibanner = [{ foto_movil: '/img/banner/slider-transparent.png', foto: '/img/banner/slider-transparent.png', texto: `` }];
    const banner02 = [{ foto_movil: '/img/internal/book_detail/slider/slider1.jpg', foto: '/img/internal/book_detail/slider/slider1.jpg', texto: `` }];

    var recommendationConfig = { rows: 1, draggable: true, slidesToShow: 2, slidesToScroll: 2, responsive: { slidesToShow: 2, slidesToScroll: 2, rows: 1 } };

    const [itemsRecommendation, setItemsRecommendation] = useState([]);
    useEffect(() => {
        const requestOptions = {
            method: "GET",
            redirect: "follow",
            headers: {}
        };
        fetch(EndpointCore.recommends, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                let data_items = [];
                result.items.forEach((i, index) => {
                    data_items.push({
                        "id": index + 1,
                        "foto": i.images[0].image.path,
                        "texto": i.bookTitle,
                        "capitulo": "chapter",
                        "novela": i.bookType.name.value,
                        "time": i.attributes.bookHourLatest + " hours ago",
                        "manga": "Seinen",
                        "shoujo": "Novel",
                        "puntuacion": i.bookRate,
                        "vistas": i.bookLabelViews
                    });
                });
                setItemsRecommendation(data_items);
            })
            .catch((error) => console.log("error", error));
    }, []);

    const closeDropdown = () => {
        setShowReportDropdown(false);
    };
     
    return (
        <div className="interna BookReadChapter  ">
            <div className='position_header position hide_movil ' >
                <div className='ui_header' ><Menu></Menu></div>
                <div className='top-banner'><Banner items_banner={ibanner} heightAuto={true}></Banner></div>
            </div>
            <div className='position_top_A position'>
                <div className='container'>
                    <div className='banner-simple hide_movil'><Banner items_banner={items_banner} heightAuto={true}></Banner></div>
                </div>
                <div className='container'>
                <div className="psidebar">
                        <div className='box-row subtitulo margin-button-20'>
                            <span>Published by: </span>
                        </div>
                        <ul className="rz-photo publicado_por">
                            <li><img src="img/internal/book_detail/icon_avatar.png" alt="" /></li>
                            <li>
                                <div className="li-publi"><span>We Are Party</span></div>
                                <div className="li-publi">
                                    <img src="/img/internal/book_detail/user2.png" alt="" />
                                    <span>253K</span>
                                </div>
                            </li>
                            <li><button type="button" className="globo_red">Follow</button></li>
                        </ul>
                        <ul className="rz-photo social-icon">
                            <li>
                                <img src="/img/internal/book_detail/icon_item1.jpg" alt="" />
                                <img src="/img/internal/book_detail/icon_item2.jpg" alt="" />
                                <img src="/img/internal/book_detail/icon_item3.jpg" alt="" />
                            </li>
                            <li>
                                <img src="/img/internal/book_detail/icon_item4.jpg" alt="" />
                                <img src="/img/internal/book_detail/icon_item5.jpg" alt="" />
                                <img src="/img/internal/book_detail/icon_item6.jpg" alt="" />
                            </li>
                        </ul>
                        <div className="bgblue color_white icomentario">
                            <div className='container recomendation'>
                                <Carrusel icarrusel={itemsRecommendation} key_position={'key003'} titulo={'Recommended'} config={recommendationConfig}></Carrusel>
                            </div>
                        </div>
                   </div>
                    <div className="pcontent">
                        <div className="lbox_container oculta_desktop">
                            <ul className="header-icon-mobile-detalle-libro">
                                <li className="icon1">
                                    <a href="/#" onClick={(e) => { e.preventDefault(); navigate(-1); }}><img src="img/internal/book_detail/m-prev.png" alt="" />
                                        <span>Chapter 1</span></a>
                                </li>
                                <li className="icon2">
                                    <img src="img/internal/book_detail/m-share.png" alt="" />
                                    <img src="img/internal/book_detail/m-star.png" alt="" />
                                    <img src="img/internal/book_detail/m-tres.png" alt="" />
                                </li>
                            </ul>
                        </div>

                        <div className='continer-slider'>
                            <div className="itext ">
                                <div className="titulo"> Ch. {specificChapter.number}</div>
                                <div className='container-reportar-chapter'>
                                  <div className="subtitulo">{specificChapter.name}</div>
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
              <a className="reportar-movil" onClick={handleReportDropdownClick}>
                <img
                  src="/img/internal/book_detail/m-tres.png"
                  alt="report"
                />
              </a>
              <div className="reportar">
                {showReportDropdown && <ReportDropdown user_id={userId} entity_id={specificChapter.chapterId} notification_type={'CHAPTER'} closeDropdown={closeDropdown}/>}
              </div>
            </li>
             
          </ul>
                                </div>
                            </div>
                            <div className='Banner02'><Banner items_banner={banner02}></Banner></div>
                            <div className='Banner02'><Banner items_banner={banner02}></Banner></div>
                            <div className='Banner02'><Banner items_banner={banner02}></Banner></div>
                              {/* ChapterViewer */}
                            <div id="carouselExampleControls" className="carousel slide">
                            <div style={{  }}>
                               {specificChapter && <ChapterViewer specificChapter={specificChapter} />}
                              </div>
                            </div>
                             {/* ChapterViewer */}
                            <div id="slider_bootom" className="w-full bgwhite info ">
                                <div className="grupo1">
                                    <img data-toggle="collapse" data-target="#lista-capitulos" style={{ cursor: 'pointer' }} src="img/internal/book_detail/hamburger.svg" alt="" />
                                    <span>Chapters</span>
                                </div>
                                <div className="grupo2 pagination owl-nav">
                                    <button type="button">Previous</button>
                                    <button type="button">Next</button>
                                </div>
                            </div>
                            {/* lista-capitulos */}
                            <div id="lista-capitulos" className="w-full bgwhite collapse oculta_movile">
                             {chapters.map((chapter, index) => (
                              <div className="item w-full" key={index}>
                                  <div className="titulo w-full">Ch. {chapter.number}</div>
                                  <div className="subtitulo w-full">{chapter.name || 'Name not available'}</div>
                              </div>
                             ))}
                              </div>
                            {/* lista-capitulos */}
                        </div>
                        <div className="icontainer slider bggris">
                            {/* item*/}
                            <div className="w-full bgwhite top oculta_desktop">
                                <div className="lbox_container">
                                    <div className="lbox_bold bgwhite">Published by:</div>
                                    <div className="lbox_normal">
                                        <ul className="rz-photo publicado_por">
                                            <li><img src="img/internal/book_detail/icon_avatar.png" alt="" /></li>
                                            <li>
                                                <div className="li-publi"><span>We Are Party</span></div>
                                                <div className="li-publi">
                                                    <img src="img/internal/book_detail/user2.png" alt="" />
                                                    <span>253K</span>
                                                </div>
                                            </li>
                                            <li><button type="button" className="globo_red">Follow</button></li>
                                        </ul>
                                    </div>
                                    <div className="lbox_normal">
                                        <ul className="rz-photo social-icon">
                                            <li>
                                                <img src="img/internal/book_detail/icon_item1.jpg" alt="" />
                                                <img src="img/internal/book_detail/icon_item2.jpg" alt="" />
                                                <img src="img/internal/book_detail/icon_item3.jpg" alt="" />
                                            </li>
                                            <li>
                                                <img src="img/internal/book_detail/icon_item4.jpg" alt="" />
                                                <img src="img/internal/book_detail/icon_item5.jpg" alt="" />
                                                <img src="img/internal/book_detail/icon_item6.jpg" alt="" />
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* item8*/}
                            {/* item*/}
                            <CommentBox specificChapter={specificChapter}/>                         {/* item*/}
                            {/* pagination */}
                            <div id="movil-slider-pagination" className="w-full paginacion-movil bgwhite info oculta_desktop">
                                <div className="grupo2 pagination">
                                    <button type="button">Previous</button>
                                    <img onclick="openModal('lista_capitulos01')" className="btn-hamburger" src="img/internal/book_detail/hamburger.svg" alt="" />
                                    <input type="hidden" id="contador" name="contador" defaultValue={0} />
                                    <button type="button">Next</button>
                                </div>
                            </div>
                            {/* pagination */}
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default BooksReadChapter;
