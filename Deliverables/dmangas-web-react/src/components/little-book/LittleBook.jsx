import "./style.css";
import React from "react";
import { Link } from "react-router-dom";
import EndpointCore from '../../pages/Global';
import toastr from "toastr";

function LittleBook({ sortedGroupedChapters, btnTitle, libroData, firstChapterCode, isUserLoggedIn, chapters, userId, commentCount, bookViews }) {

  const { foto, bookType, puntuacion, titulo, vistas, contenido, autor, code , favoritos} = libroData;
  const formatedTitleForUrl = (title) => {
    return title.trim().toLowerCase().replace(/\s+/g, '-');
  };

  const bookTitle = formatedTitleForUrl(titulo);

  // Check whether there is data in `sortedGroupedChapters`
  const firstChapterGroup = sortedGroupedChapters?.[0]?.chapters?.[0];

  // If there is no `firstChapterGroup`, assign default values or `null`
  const firstTitle = firstChapterGroup ? formatedTitleForUrl(firstChapterGroup.name) : '';
  const chapterTitle = firstChapterGroup ? formatedTitleForUrl(firstChapterGroup.name) : '';
  const chapterNumber = firstChapterGroup ? firstChapterGroup.number : '';
  const chapterCode = firstChapterGroup ? firstChapterGroup.chapter_code : '';

  // If there isn't enough data, `chapterReadUrl` will remain an empty string or `null`
  const chapterReadUrl = firstChapterGroup ? `/book-read-chapter/${chapterTitle}/${chapterNumber}/${chapterCode}/${code}` : '';
  
 
 
  const handleAddToLibrary = async (userId, bookCode) => {
    
    const url = EndpointCore.userLibraryGet(userId, bookCode); 
    const putUrl = EndpointCore.userLibraryPut(userId, bookCode); 
    try {
      const checkResponse = await fetch(url, { method: 'GET' });
      
      if (!checkResponse.ok) {
        toastr.error('Error checking whether the book is already in the library');
        return;
      }

      const isBookInLibrary = await checkResponse.json();

      if (isBookInLibrary.exists) {
        const updateResponse = await fetch(putUrl, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({  status: 'Seguidos' }),
        });

        if (updateResponse.ok) {
          toastr.success('Status updated in your library');
        } else {
          toastr.error('Error updating the book in the library');
        }
      } else {
        const createResponse = await fetch(EndpointCore.userLibraryPost, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, bookCode, status: 'Seguidos' }),
        });

        if (createResponse.ok) {
          toastr.success('Book added to your library');
        } else {
          toastr.error('Error adding the book to the library');
        }
      }
    } catch (error) {
      console.error('Error managing the user library:', error);
      toastr.error('There was an error managing the library');
    }
  };
  
  return (
    <div className="LittleBookData">
      <div className="icar item cd"> 
        <div className="pic-nuevos-capitulos">
          <span>New chapters</span>
        </div>
        <div className="info-foto">
          <ul>
            <li className="picture">
              <div className="content-foto">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="key0010type1"
                    defaultValue="true"
                  />
                </div>
                <img
                  className="pic-estrellita"
                  loading="lazy"
                  src="/img/svg/icon_poster_star.svg"
                  alt=""
                />
                <img
                  className="pic-foto"
                  src={foto}
                  alt=""
                />
                <div className="pic-categ">Novel</div>
                <div className="pic-titulo">Love Me Gently</div>
              </div>
            </li>
          </ul>
        </div>
        <div className="info-descripcion">
          <ul>
            <li className="boton puntuacion">
              <div className="number">
                <img
                  className="estrellita"
                  loading="lazy"
                  src="/img/svg/icon_star_purple.svg"
                  alt=""
                />
                <img
                  className="estrellita_white"
                  loading="lazy"
                  src="/img/svg/icon_star_white.svg"
                  alt=""
                />
                <span>8.9 (53)</span>
              </div>
              <div className="red nuevo">New</div>
            </li>
            <li className="titulo">{titulo}</li>
            <li className="etitulo">Group: {autor}</li>
            <li className="subtitulo">
              <div className="botones">
                <button type="button" className="btn red">
                  {bookType}                
                </button>
                <button type="button" className="btn mora">
                  Shoujo
                </button>
              </div>
            </li>

            <li className="puntuacion">
              <div className="number">
                <span>{puntuacion}</span>
                <img
                  className="estrellita"
                  loading="lazy"
                  src="/img/svg/icon_star_purple.svg"
                  alt=""
                />
                <img
                  className="estrellita_white"
                  loading="lazy"
                  src="/img/svg/icon_star_white.svg"
                  alt=""
                />
              </div>
              <span>Rating</span>
            </li>
            <li className="puntuacion">
              <div className="number">
                <span>{bookViews}</span>
              </div>
              <span>Views</span>
            </li>
            <li className="puntuacion">
              <div className="number">
                <span>8k</span>
              </div>
              <span>Favorites</span>
            </li>
            <li className="puntuacion">
              <div className="number">
                <span>{commentCount}</span>
              </div>
              <span>Comments </span>
            </li>

            <li className="vistas">
              <div className="acciones">
                <ul className="book-action">
                  {isUserLoggedIn && (
                  <>
                  <li>
                    <img src="/img/svg/Like.svg" alt="Like" />
                  </li>
                  <li>
                    <img
                      src="/img/svg/Followed.svg"
                      alt="Following"
                       onClick={() => {
                        handleAddToLibrary(userId, code);
                      }} 
                    />
                  </li>
                  </>
                  )}
                  <li className="littleBook-button-container">
                    {!(btnTitle || !isUserLoggedIn || contenido === "ORIGINAL_CONTENT") && (
                      <button type="button" className="btn btn_rosado unete">
                        <Link 
                          to={`/book-upload-chapter/${bookTitle}`}
                          state={{ libroData, chapters }}
                        >
                          Join this story
                        </Link>
                      </button>
                    )}
                    <button type="button" className="btn btn_rosado">
                      {btnTitle ? btnTitle : (
                        <Link 
                          to={chapterReadUrl}
                          state={{ libroData, firstChapterCode }}
                        >
                          Start reading
                        </Link>
                      )}
                    </button>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="linea_completa" />
        <div className="linea_completa2">
          <div className="linea_media_left" />
          <div className="linea_media_right" />
        </div>
      </div>
      <div className="lbox_container clasificado icontainer slider oculta_desktop">
        <div className="clasificado">
          <ul className="slider_data">
            <li>
              <span>{puntuacion}</span>
              <img
                src="img/internal/book/icon/star.png"
                alt="Star"
              />
              Rating
            </li>
            <li>
              <span>{vistas}</span> Views
            </li>
            <li>
              <span>{favoritos}</span> Favorites
            </li>
            <li>
              <span>3k</span> Comments
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LittleBook;
