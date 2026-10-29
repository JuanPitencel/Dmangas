import "./style.css";
import React from "react";
import { Link } from "react-router-dom";

function LittleBookEdit({ btnTitle, libroData, handleSubmit }) {
  const { activity_status, alternative_title, author, autor, description, imagePaths, foto, fotoCover, rate, title, demografia, bookTypeAlias, groupName, titulo } = libroData;

  console.log('LittleBookEdit libroData:', libroData);

  // Initialize variables with the images
  let imageCover = '';
  let imageProfile = '';

  // If there are imagePaths, try to assign the values
  if (imagePaths && imagePaths.length > 0) {
    const imageCoverObj = imagePaths.find(image => image.view === 'COVER');
    const imageProfileObj = imagePaths.find(image => image.view === 'PROFILE');
    if (imageCoverObj) {
      imageCover = `data:image/png;base64,${imageCoverObj.base64}`;
    }
    if (imageProfileObj) {
      imageProfile = `data:image/png;base64,${imageProfileObj.base64}`;
    }
  }

  // If the images were not found in imagePaths, use foto and fotoCover
  if (!imageCover && fotoCover) {
    imageCover = fotoCover;
  }

  if (!imageProfile && foto) {
    imageProfile = foto;
  }

  console.log('imageCover:', imageCover);  // Verify that the URL is correct
  console.log('imageProfile:', imageProfile);

  const titleUrl = title?.trim().toLowerCase().replace(/\s+/g, '-');
  const rating = rate;
  const views = 'views';

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
                  alt="Cover"
                />
                <img
                  className="pic-foto"
                  src={imageProfile || '/path/to/default/profile.png'}
                  alt="Profile"
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
            <li className="titulo">{titulo || title}</li>
            <li className="etitulo">Group:{autor || groupName}</li>
            <li className="subtitulo">
              <div className="botones">
                <button type="button" className="btn red">
                  {bookTypeAlias}
                </button>
                <button type="button" className="btn mora">
                  {demografia}
                </button>
              </div>
            </li>
            <li className="puntuacion">
              <div className="number">
                <span>{rating}</span>
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
                <span>{views}</span>
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
                <span>3k</span>
              </div>
              <span>Comments</span>
            </li>
            <li className="vistas">
              <div className="acciones">
                <ul className="book-action">
                  <li>
                    <img src="img/internal/book/icon/like.png" alt="" />
                  </li>
                  <li>
                    <img src="img/internal/book/icon/ribbon.png" alt="" />
                  </li>
                  <li>
                    <Link
                      to={`/book-upload-chapter/${titleUrl}` }
                      state={{ libroData: libroData, }}
                      className="btn btn_rosado edit" style={{ display: 'flex' }}
                      onClick={handleSubmit}
                    >
                      <img src="/img/internal/community_requests/upload.png" style={{ marginRight: '10px' }} />
                      <span>Upload chapter</span>
                    </Link>
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
              <span>{rating} <img src="img/internal/book/icon/star.png" alt="" /> </span> Rating
            </li>
            <li>
              <span>{views}</span> Views
            </li>
            <li>
              <span>8k</span> Favorites
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

export default LittleBookEdit;