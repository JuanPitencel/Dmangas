import React, { useEffect, useState } from "react";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import MenuLeft from "../components/menu-left";
import TabsMain from "../components/tabs-main";
import FooterC from "../components/footer/html/FooterC";
import Footer from "../components/footer/Footer";
import { Link, useParams } from "react-router-dom";
import Menu from "../components/menu/Menu";
import EndpointCore from "../pages/Global";
import checked from '../assets/img/svg/tilde.svg';


export default function Profile(props) {
  const [groupsData, setGroupsData] = useState([]);
  const [currentGroupData, setCurrentGroupData] = useState(null);
  const { group, code } = useParams();
  const [libroData, setLibroData] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [responseData, setResponseData] = useState(null)
  const dropdownOptions = ["Option 1", "Option 2", "Option 3"];
 
  const groupAuthor = libroData?.[0]?.groupAuthor || responseData?.author || null;

  console.log('responseData', responseData)
  console.log('libroData', libroData)
  console.log('groupsData', groupsData)
  const [tab, setTab] = useState({
    id: 1,
    name: "All",
  });

  const optionTabs = [
    {
      id: 1,
      name: "My Books",
    },
    {
      id: 2,
      name: "Members",
    },
    {
      id: 3,
      name: "Comments",
    },
    {
      id: 4,
      name: "",
    },
  ];
  const ibanner = [
    {
      foto_movil: "/img/banner/slider-transparent.png",
      foto: "/img/banner/slider-transparent.png",
      texto: ``,
    },
  ];

  const protocol = window.location.protocol;
  const host = window.location.host;
  const protocolAndHost = protocol + "//" + host;

  var width = window.innerWidth;
  var footerComponent = width <= 900 ? <FooterC
  titulo1="Profile"
  href1="/profile"
  titulo2="Wallet"
  href2="/wallet"
  titulo3="Settings"
  href3="/my-books"
  titulo4="Trash"
  href4="/#"
  img1={{
    gris: '/img/svg/icon_mobile/icon_user.svg',
    color: '/img/svg/icon_mobile/icon_user.svg'
  }}
  img2={{
    gris: '/img/svg/icon_navigation_2_gray.svg',
    color: '/img/svg/icon_navigation_2_gray.svg'
  }}
  img3={{
    gris: '/img/internal/book_detail/m-share.png',
    color: '/img/internal/book_detail/m-share.png'
  }}
  img4={{
    gris: '/img/internal/profile/trash.png',
    color:'/img/internal/profile/trash.png'
  }}
/> :
   <Footer />;
  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const userToken = localStorage.getItem("token");  
        const response = await fetch(`${EndpointCore.getGroupWithImages}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

         if (response.ok) {
         const responseData = await response.json();
         if (responseData.success) {
         const groupInfo = responseData.data;
        setGroupsData(groupInfo);

        const currentGroup = groupInfo.find(group => group.code === code);
        if (currentGroup) {
        setCurrentGroupData(currentGroup);
       } else {
       console.log("No group found with the specified ID.");
       }
       } else {
       console.log("There are no groups for the current member");
        }
      }

      } catch (error) {
        console.error(
          "Error fetching group information:",
          error
        );
      }
    };

    fetchGroupData();
  }, [code]);

  let imageAvatar = null;
  if (currentGroupData && currentGroupData.images && currentGroupData.images.length >= 1) {
    imageAvatar= `data:image/png;base64,${currentGroupData.images[0].base64}`;
  }
  
  let imageCover = null;
  if (currentGroupData && currentGroupData.images && currentGroupData.images.length >= 2) {
   imageCover= `data:image/png;base64,${currentGroupData.images[1].base64}`;
  }
  

  let groupName = null;
  if (currentGroupData) {
    const { name } = currentGroupData;
    groupName = name;
  } 

  let groupDescription = null;
  if (currentGroupData) {
    const {group_description} = currentGroupData;
    groupDescription = group_description;
  }
  useEffect(() => {
    const fetchBooksByGroupCode = async () => {
      try {
        const userToken = localStorage.getItem("token");
        const response = await fetch(`${EndpointCore.booksByGroup}/${group}/${code}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          if (responseData.success) {
            const booksInfo = responseData.data;
            setLibroData(booksInfo);
            setResponseData(responseData);
          } else {
            console.log("No books found for the given group");
          }
        } else {
          console.log("Error fetching book information:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching book information:", error);
      }
    };

    fetchBooksByGroupCode();
  }, [group, code]);
  
  
  const handleCheckboxClick = (bookId) => {
    const isSelected = selectedBooks.includes(bookId);

    if (isSelected) {
      setSelectedBooks(selectedBooks.filter((id) => id !== bookId));
    } else {
      setSelectedBooks([...selectedBooks, bookId]);
    }
  };

  const handleDeleteSelectedBooks = async () => {
    try {
      const userToken = localStorage.getItem("token");
      const response = await fetch(`${EndpointCore.deleteBook}`, {
        method: "PUT", 
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookIds: selectedBooks }), 
      });
  
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.success) {
          toastr.success('Books deleted successfully');
          window.location.reload();
        } else {
          toastr.error(responseData.message);
        }
      } else {
        toastr.error('Error marking the books as deleted');
        console.log("Error marking the books as deleted:", response.statusText);
      }
    } catch (error) {
      toastr.error('Error marking the books as deleted');
      console.error("Error marking the books as deleted:", error);
    }
  };

 return (
    <> 
      <div className="interna comunidad_solicitudes">
      <div className='ui_header hide_desk'><Menu></Menu></div>
        <div className="interna libro  ">
          <div className="position_header position ">
            <div className="seccion_interna">
              <div className=" ui_container--946" style={{marginTop: '20px', marginBottom: '20px'}}>
              <div style={{ position: 'fixed',  top: '20px', bottom: '20px' , height: `calc(100vh - 40px)`,}}>
               <MenuLeft groupAuthor={groupAuthor}/>
              </div>
                <div className="col01 w-71 contenido" style={{marginLeft: '280px'}}>
                  <div className=" body d-flex flex-column">
                    <div
                      id="anuncio01"
                      className="ui_slider" 
                      style={{ overflow: "hidden" }}
                    >
                      <div style={{ height: '296px' , width: '100%'}}>
                       <div className="item" style={{ width: '100%' , height: '100%'}}>
                        <img
                        className="image-cover"
                        src={imageCover}
                        alt=""
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    </div>
                   </div>
                    <div className="contenido">
                      <div className="box body" style={{ paddingLeft: 30 }}>
                        <div
                          className="box Party"
                          style={{
                            marginTop: "-20px",
                            zIndex: 10,
                            position: "relative",
                            display: "flex",
                            
                          }}
                       
                        >
                           <div style={{ overflow: "hidden",
                             width: '135px',
                             height: '135px',
                             borderRadius: '25px'}}>
                          <img
                            className="circulo"
                            style={{ maxWidth: '100%',width: '100%', height:'100%'}}
                            src={imageAvatar}
                            alt=""
                          />
                          </div>
                          <div>
                            <div style={{marginTop: '40px', marginLeft: '10px'}} >                        
                            {groupName}
                            </div>
                            <ul
                              style={{
                                display: "flex",
                                gridColumnGap: 5,
                                paddingLeft: 10,
                              }}
                              className="oculta_movile"
                            >
                              <li style={{ display: "flex" }}>
                                <div className="item d-flex align-items-center mr-2">
                                  8.9
                                  <img
                                    src="/img/internal/community_book_detail/star_blue.png"
                                    alt=""
                                    style={{ width: "10px", height: "10px" }}
                                  />
                                </div>
                                <div className="item">Rating</div>
                              </li>
                              <li style={{ display: "flex" }}>
                                <div className="item">8k</div>
                                <div className="item">Followers</div>
                              </li>
                              <li style={{ display: "flex" }}>
                                <div className="item">235</div>
                                <div className="item">Books</div>
                              </li>
                              <li style={{ display: "flex" }}>
                                <div className="item">1</div>
                                <div className="item">Top</div>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <ul className="box ui_cols ui_cols--books_card_button">
                          <li className="col01 w-100 oculta_movile">
                            <div className="box informacion">
                              <div className="titulo">Information: </div>
                              <p>
                              {groupDescription}
                              </p>
                            </div>
                          </li>
                          <li id="zona-blue" className="col01 w-100 div">
                            <div className="lbox_container">
                              <div className="estadistica oculta_desktop">
                                <ul className="d-flex">
                                  <li className="d-flex">
                                    <div className="item d-flex">
                                      8.9{" "}
                                      <img
                                        src="/img/internal/community_book_detail/star_blue.png"
                                        alt=""
                                        style={{
                                          width: "10px",
                                          height: "10px",
                                        }}
                                      />
                                    </div>
                                    <div className="item">Rating</div>
                                  </li>
                                  <li className="d-flex">
                                    <div className="item">8k</div>
                                    <div className="item">Followers</div>
                                  </li>
                                  <li className="d-flex">
                                    <div className="item">235</div>
                                    <div className="item">Books</div>
                                  </li>
                                  <li className="d-flex">
                                    <div className="item">1</div>
                                    <div className="item">Top</div>
                                  </li>
                                </ul>
                              </div>
                              <div className="box texto-descriptivo oculta_desktop">
                                <p>
                                  Qin Tian was stranded on a desert island
                                  after a shipwreck. All he has equipped is a
                                  survival system and a pocketknife. He has to
                                  start from scratch. Building a camp, making
                                  fire and fishing, he has to do everything he
                                  can to survive. Fortunately, there are many
                                  beauties by his side! School goddess, blonde
                                  sister, violent loli...
                                </p>
                              </div>
                              <div className="box red oculta_desktop">
                                <span>
                                  See more{" "}
                                  <img
                                    src="/img/internal/community_book_detail/arrow-red.png"
                                    alt=""
                                  />
                                </span>
                              </div>
                              <div className="box nuestro-libros">
                                <h5>
                                  <img
                                    className="oculta_desktop"
                                    src="/img/internal/community_book_detail/arrow-blue.png"
                                    alt=""
                                  />
                                </h5>
                              </div>
                            </div>
                            <div className="box grid-tab">
                              <TabsMain
                                optionTabs={optionTabs}
                                setTab={setTab}
                                tab={tab}
                              />
                              <button className="btn-rosado" 
                              style={{ float: 'right', marginTop: '-80px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
                              onClick={handleDeleteSelectedBooks}>
                                <img src="/img/svg/trash-white.svg" style={{ marginRight: '5px' }} />
                                <span>Trash</span>
                              </button>
                              <ul className="ui_blocks tab-head oculta_movile">
                                <li className="ui_blocks__li">
                                  <div className="ui_cols ui_cols--order_list mb-4">
                                    <div className="ui_col">
                                      <div className="ui_paragraph_12 ui_paragraph_12--medium">
                                        <span>Books 1-15 of 280</span>
                                      </div>
                                    </div>

                                    <div className="ui_col">
                                      <div className="ui_order_list">
                                        <div className="ui_order_list--dropdown dropdown">
                                          <button
                                            className="btn btn-secondary dropdown-toggle"
                                            type="button"
                                            id="dropdownMenu2"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                          >
                                            Sort by:
                                            <span id="dropdown_id">
                                              Recommended
                                            </span>
                                          </button>
                                          <ul
                                            className="dropdown-menu cbo_libro"
                                            aria-labelledby="dropdownMenu2"
                                          >
                                            <li>
                                              <button
                                                className="dropdown-item dropdown-item--ui"
                                                type="button"
                                              >
                                                <span className="libro_titulo">
                                                  SORTED BY
                                                </span>
                                              </button>
                                            </li>
                                            <li>
                                              <button
                                                className="dropdown-item dropdown-item--ui"
                                                type="button"
                                              >
                                                <div className="ui_dropdown_circle">
                                                  <div className="ui_dropdown_circle__check"></div>
                                                </div>
                                                <span>
                                                  Latest updates
                                                </span>
                                              </button>
                                            </li>
                                            <li>
                                              <button
                                                className="dropdown-item dropdown-item--ui"
                                                type="button"
                                              >
                                                <div className="ui_dropdown_circle">
                                                  <div className="ui_dropdown_circle__check"></div>
                                                </div>
                                                <span>Recommended</span>
                                              </button>
                                            </li>
                                            <li>
                                              <button
                                                className="dropdown-item dropdown-item--ui"
                                                type="button"
                                              >
                                                <div className="ui_dropdown_circle">
                                                  <div className="ui_dropdown_circle__check"></div>
                                                </div>
                                                <span>Most popular</span>
                                              </button>
                                            </li>
                                            <li>
                                              <button
                                                className="dropdown-item dropdown-item--ui"
                                                type="button"
                                              >
                                                <div className="ui_dropdown_circle">
                                                  <div className="ui_dropdown_circle__check"></div>
                                                </div>
                                                <span>Top rated</span>
                                              </button>
                                            </li>
                                          </ul>
                                        </div>
                                        <div className="ui_order_list--dropdown dropdown">
                                          <button
                                            className="btn btn-secondary dropdown-toggle"
                                            type="button"
                                            id="dropdownMenu2"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                          >
                                            Show:
                                            <span id="dropdown_id">15</span>
                                          </button>
                                          <ul
                                            className="dropdown-menu cbo_libro"
                                            aria-labelledby="dropdownMenu2"
                                          >
                                            <li>
                                              <button
                                                className="dropdown-item dropdown-item--ui"
                                                type="button"
                                              >
                                                <div className="ui_dropdown_circle">
                                                  <div className="ui_dropdown_circle__check"></div>
                                                </div>
                                                <span>20</span>
                                              </button>
                                            </li>
                                            <li>
                                              <button
                                                className="dropdown-item dropdown-item--ui"
                                                type="button"
                                              >
                                                <div className="ui_dropdown_circle">
                                                  <div className="ui_dropdown_circle__check"></div>
                                                </div>
                                                <span>25</span>
                                              </button>
                                            </li>
                                            <li>
                                              <button
                                                className="dropdown-item dropdown-item--ui"
                                                type="button"
                                              >
                                                <div className="ui_dropdown_circle">
                                                  <div className="ui_dropdown_circle__check"></div>
                                                </div>
                                                <span>30</span>
                                              </button>
                                            </li>
                                            <li>
                                              <button
                                                className="dropdown-item dropdown-item--ui"
                                                type="button"
                                              >
                                                <div className="ui_dropdown_circle">
                                                  <div className="ui_dropdown_circle__check"></div>
                                                </div>
                                                <span>35</span>
                                              </button>
                                            </li>
                                          </ul>
                                        </div>
                                        <ul className="ui_order_list_button tabs">
                                          <li className="ui_order_list_button__item active">
                                            <figure>
                                              <img
                                                src="img/svg/icon_order_list_1.svg"
                                                alt=""
                                              />
                                            </figure>
                                          </li>
                                          <li className="ui_order_list_button__item">
                                            <figure>
                                              <img
                                                src="/img/svg/icon_order_list_2.svg"
                                                alt=""
                                              />
                                            </figure>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                              <div
                                id="tab1"
                                className="tabcontent"
                                style={{ display: "block" }}
                              >
                                <div className="box">
                                  <ul
                                    className="catalogo custom-grid"
                                    style={{
                                      display: "grid",
                                      gridTemplateColumns: "repeat(3, 159px)",
                                      gridColumnGap: "60px",
                                      gridRowGap: "10px",
                                    }}
                                  >
                            {libroData ? (
                               libroData.map((book, index) => (
                               <li className="ibanner" key={index}>
                               <div className="item" style={{ width: "100%", margin: 0, position: 'relative' }}>
                               <div style={{ position: 'absolute', top: 10, right: 10 }}>
                               <div type="checkbox" style={{ border: 'solid 1px #FF0055', width: '18px', height: '18px', backgroundColor: 'white' }} onClick={() => handleCheckboxClick(book.id)}>
                              {selectedBooks.includes(book.id) && (
                              <img src={checked} alt="Tilde" style={{ width: "13px", height: "13px", position: 'absolute', zIndex: '100' }} />
                              )}
                            </div>
                          </div>
                            <Link to={`/book-edit/${book.title.trim().toLowerCase().replace(/\s+/g, '-')}`} state={{ libroData: book }}
                              onClick={() => console.log("Book object being passed:", book)}
                              >
                              {book.imagePaths.find(img => img.view === 'PROFILE') ? ( // Look for the image with view "PROFILE"
                              <img src={`data:image/png;base64,${book.imagePaths.find(img => img.view === 'PROFILE').base64}`} alt="" style={{ width: "100%", height: "100%", margin: 0 }} />
                              ) : (
                              <img src="/ruta/de/imagen/por/defecto" alt="Default image" style={{ width: "100%", height: "100%", margin: 0 }} /> // If no image is found, show a default image or handle it another way
                              )}
                             </Link>
                            </div>
                             <div className="item text d-flex" style={{ alignItems: "center" }}>
                               <div>{book.title}</div>
                            </div>
                             <div className="ui_recommended_tag">
                              <span style={{ color: "white" }}>novel</span>
                             </div>
                            </li>
                               ))
                                ) : (
                                  <p>This group doesn't have any books yet</p>
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="footer-menu hide_movil">
                 <Footer  />  
                 </div>
              </div>
            </div>   
          </div>
        </div>
       </div>
      </div>
    </>
  );
}
