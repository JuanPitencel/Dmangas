import React from "react";
import toastr from 'toastr'; 
import 'toastr/build/toastr.min.css'; 
import EndpointCore from "../../pages/Global"; 

export default function CardCommunityRequest({ userName, memberType, createdAt, memberCode }) {
  const handleAccept = async () => {
    try {
      const response = await fetch(EndpointCore.requestResponse, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          response: 1 , 
          code: memberCode,
        })
      });
      if (!response.ok) {
        throw new Error("Error accepting the request");
      }
      toastr.success('The request was accepted successfully');
    } catch (error) {
      console.error(error);
      toastr.error('Error accepting the request');
    }
  };

  const handleReject = async () => {
    try {
      const response = await fetch(EndpointCore.requestResponse, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          response: 0, 
          code: memberCode,
        })
      });
      if (!response.ok) {
        throw new Error("Error rejecting the request");
      }
      toastr.success('The request was rejected successfully');
    } catch (error) {
      console.error(error);
      toastr.error('Error rejecting the request');
    }
  };

  return (
    <li className="irem">
      <div className="item avatar">
        <img src="img/internal/book_detail/icon_avatar.png" alt="" />
      </div>
      <div className="item text">
        <ul className="list-cargo">
          <li className="nombre">{userName}</li>
          <li className="cargo-nombre">
            <span className="cargo">{memberType}</span>
            <span className="tiempo">{createdAt}</span>
          </li>
        </ul>
      </div>
      <div className="item button" style={{ display: 'flex' }}>
        <button className="btn btn-rosado m-1" type="button" onClick={handleAccept}>
          Accept
        </button>
        <button className="btn btn-blanco" type="button" onClick={handleReject}>
          Reject
        </button>
      </div>
    </li>
  );
}

