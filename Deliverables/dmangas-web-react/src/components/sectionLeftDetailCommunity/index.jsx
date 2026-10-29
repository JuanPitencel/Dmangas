import React from "react";
import useFormattedNumber from "../../hook/useFormattedNumber";

export default function SectionLeftDetailCommunity({detailGroup}) {
  const protocol = window.location.protocol;
  const host = window.location.host;
  const protocolAndHost = protocol + "//" + host;
  return (
    <li className="col01 w-28 gris-F5F7FA oculta_movile">
      <div className="box Party">
        <img
          className="circulo"
          src={detailGroup && detailGroup?.images[0]?.image.path}
          alt=""
        />
        <div className="circulo-texto" style={{ width: "100px" }}>
          <h2 className="text-truncate">
            {detailGroup && detailGroup.groupName}
          </h2>
        </div>
      </div>
      <div className="box icons">
        <ul>
          <li>
            <img
              src={`${protocolAndHost}/img/internal/somos-party/like.png`}
              alt=""
            />
          </li>
          <li>
            <img
              src={`${protocolAndHost}/img/internal/somos-party/flag.png`}
              alt=""
            />
          </li>
          <li>
            <img
              src={`${protocolAndHost}/img/internal/somos-party/p.jpg`}
              alt=""
            />
          </li>
          <li>
            <img
              src={`${protocolAndHost}/img/internal/somos-party/glasses.jpg`}
              alt=""
            />
          </li>
          <li>
            <img
              src={`${protocolAndHost}/img/internal/somos-party/f.jpg`}
              alt=""
            />
          </li>
        </ul>
      </div>
      <div className="box estadistica">
        <ul>
          <li>
            <div className="item">
              {detailGroup?.groupRate}{" "}
              <img
                src={`${protocolAndHost}/img/internal/community_book_detail/star_blue.png`}
                alt=""
              />
            </div>
            <div className="item">Rating</div>
          </li>
          <li>
            <div className="item">
              {useFormattedNumber(detailGroup?.groupFollowers)}
            </div>
            <div className="item">Followers</div>
          </li>
          <li>
            <div className="item">{detailGroup?.groupBooks}</div>
            <div className="item">Books</div>
          </li>
          <li>
            <div className="item">1</div>
            <div className="item">Top</div>
          </li>
        </ul>
      </div>
      <div className="box informacion">
        <div className="titulo">Information</div>
        <p>
        {detailGroup && detailGroup?.groupDescription}
        </p>
      </div>
    </li>
  );
}
