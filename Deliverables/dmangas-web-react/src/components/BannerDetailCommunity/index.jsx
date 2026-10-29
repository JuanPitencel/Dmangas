import React from "react";

export default function index({image}) {
  const protocol = window.location.protocol;
  const host = window.location.host;
  const protocolAndHost = protocol + "//" + host;
  return (
    <div className="grupo-banner w-full">
      <div className="banner">
        <img
          className="img-banner oculta_movile"
          src={`${image}`}
          alt=""
        />
        <img
          className="img-banner oculta_desktop"
          src={`${protocolAndHost}/img/internal/community_book_detail/community_book_detail_mobile/banner.jpg`}
          alt=""
        />
        <img
          className="prev"
          src={`${protocolAndHost}/img/internal/community_book_detail/community_book_detail_mobile/prev.png`}
          alt=""
        />
      </div>
      <div className="icons">
        <ul>
          <li>
            <div className="shared">
              <img
                src={`${protocolAndHost}/img/internal/community_book_detail/community_book_detail_mobile/icon-shared.png`}
                alt=""
              />
            </div>
          </li>
          <li>
            <img
              src={`${protocolAndHost}/img/internal/community_book_detail/community_book_detail_mobile/star.png`}
              alt=""
            />
          </li>
          <li>
            <img
              src={`${protocolAndHost}/img/internal/community_book_detail/community_book_detail_mobile/circles.png`}
              alt=""
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
