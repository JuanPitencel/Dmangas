import React from "react";

export default function Card({ book, handleBookClick }) {
  const protocol = window.location.protocol;
  const host = window.location.host;
  const protocolAndHost = `${protocol}//${host}`;

  return (
    <li className="ibanner">
      <div
        className="item"
        onClick={() => handleBookClick(book.bookTitle)}
        style={{ cursor: 'pointer' }}
      >
        <img src={book.images[0].image.path} alt="" />
      </div>
      <div className="item text">{book.bookTitle}</div>
      <div className="item estrellita">
        <img
          src={`${protocolAndHost}/img/internal/tab01/star_blue.png`}
          alt=""
        />
        <img
          src={`${protocolAndHost}/img/internal/tab01/star_blue.png`}
          alt=""
        />
        <img
          src={`${protocolAndHost}/img/internal/tab01/star_blue.png`}
          alt=""
        />
        <img
          src={`${protocolAndHost}/img/internal/tab01/star_blue.png`}
          alt=""
        />
        <img
          src={`${protocolAndHost}/img/internal/tab01/star_white.png`}
          alt=""
        />
        <span>{book.bookRate}</span>
      </div>
    </li>
  );
}