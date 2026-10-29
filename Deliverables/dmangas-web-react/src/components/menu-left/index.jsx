import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Modal } from "react-bootstrap";
import EndpointCore from "../../pages/Global.jsx";
import Dropdown from "../dropdownForm/DropdownForm.jsx";
import './style.css';
import lupaIcon from "../../assets/img/icon-search.png";
import jwtDecode from 'jwt-decode';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import useAuth from "../../hook/useAuth.js";

export default function Menu({onGroupLabelClick, hideLogo, hideBuscar, isNavBar, groupAuthor}) {
  const [collapsed, setCollapsed] = useState(false);
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filteredCommunities, setFilteredCommunities] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [roles, setRoles] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');
  const [collapsedGroup, setCollapsedGroup] = useState(true);
  const [collapsedRequests, setCollapsedRequests] = useState(true);
  const [groupsData, setGroupsData] = useState([]);
  const auth = useAuth();
  const userName = auth.auth.user_name;
  const avatar = auth.auth.avatar;
  const [userGroups, setUserGroups] = useState([]);
  const [otherGroups, setOtherGroups] = useState([]);
  const [isParticipantUser, setIsParticipantUser] = useState(false);
  const [isAuthorUser, setIsAuthorUser] = useState(false);
  const [hasNoGroup, setHasNoGroup] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const isGroupAuthor = groupAuthor === userName;

  useEffect(() => {
    if (isAuthorUser && isGroupAuthor) {
      setOpenDropdown("Agrupacion");
    }
  }, [isAuthorUser, isGroupAuthor]);

  const getAvatarPath = (avatarName) => {
    if (!avatarName) {
      // You can return a default image path or null
      return "null"; // or `null`
    }
    const avatarDirectory = "/img/login/avatar-selected/";
    return `${avatarDirectory}${avatarName.toLowerCase()}.png`;
  };
  
  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const userToken = localStorage.getItem('token');
        const response = await fetch(`${EndpointCore.getGroupWithImages}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${userToken}`,
          },
        });
    
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
              // A group was found, update the state
              const groupInfo = data.data;
              setGroupsData(groupInfo);
            } else {
              console.log('No group found for the current author');
            }
          }
      } catch (error) {
        console.error('Error fetching group information:', error);
      }
    };
    fetchGroupData();
  }, []);

  useEffect(() => {
    if (groupsData.length > 0) {
      const userGroups = groupsData.filter(group => group.author === userName);
      const otherGroups = groupsData.filter(group => group.author !== userName);
      setUserGroups(userGroups);
      setOtherGroups(otherGroups);
    }
  }, [groupsData, userName]);

  useEffect(() => {
    if (userGroups.length === 0 && otherGroups.length > 0) {
      setIsParticipantUser(true);
      setIsAuthorUser(false);
      setHasNoGroup(false);
    } else if (userGroups.length > 0) {
      setIsAuthorUser(true);
      setIsParticipantUser(false);
      setHasNoGroup(false);
    } else if (userGroups.length === 0 && otherGroups.length === 0) {
      setHasNoGroup(true);
      setIsParticipantUser(false);
      setIsAuthorUser(false);
    }
  }, [userGroups, otherGroups]);

  const fetchCommunities = async () => {
    try {
      const response = await fetch(`${EndpointCore.API_URL}/groups?withImages=true&limitPage=150`);
      const data = await response.json();
      setFilteredCommunities(data.items.map(item => ({
        groupName: item.groupName,
        imagePath: item.images && item.images.length > 0 && item.images[0].image ? item.images[0].image.path : '',
        groupCode: item.groupCode,
      })));
    } catch (error) {
      console.error('Error fetching community options from the API:', error);
    }
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await fetch(EndpointCore.membersRole);
      if (!response.ok) {
        throw new Error(`Error fetching roles: ${response.statusText}`);
      }
      const data = await response.json();
      const filteredRoles = data.slice(1);
      setRoles(filteredRoles);
    } catch (error) {
      console.error('Error fetching role options from the API:', error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);
  const handleOpenJoinModal = () => {
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
  };

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    setSelectedGroup(value);
  };

  const handleRoleSelect = (selectedRole) => {
    setSelectedRole(selectedRole);
  };

  const handleJoinCommunity = async () => {
    try {
      const selectedCommunity = filteredCommunities.find(community => community.groupName === selectedGroup);
      if (!selectedCommunity) {
        console.error('No community has been selected.');
        return;
      }

      // Get the JWT stored in localStorage
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No JWT token found in local storage.');
        return;
      }

      // Decode the token to get the user ID or other relevant info if needed
       const decodedToken = jwtDecode(token);
       const userId = decodedToken.id;

      const response = await fetch(EndpointCore.memberRequest, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          group_code: selectedCommunity.groupCode,
          member_type: selectedRole,
          user_id: userId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error submitting membership request: ${response.statusText}`);
      }

      setShow(false);
      toastr.success('Request sent successfully');

    } catch (error) {
      console.error('Error submitting membership request:', error);
      toastr.error(error.message || 'Error submitting membership request');

    }
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const toggleDropdown = (dropdown) => {
    // If the dropdown that was selected is already open, close it. Otherwise, open the selected one and close the other.
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
<div className=" w-custom sidebar-blue oculta_movile" style={{ transition: "all .3s", width: collapsed ? "80px" : "", borderRadius: '15px'  }}>
  <Link to="/" >
     <div className={`${hideLogo ? 'hide-profile' : 'box logo'}`}>
      <div className="d-flex " onClick={() => setCollapsed(!collapsed)}>
        <img src="/img/internal/community_requests/bob.png" alt="bob-solicitudes" />
        {!collapsed && <span>Dmangas</span>}
      </div>
     </div>
    </Link>
      {!collapsed && (
        <div className= {`${hideBuscar ? "hide-profile":"box search"}`}>
          <input type="text" id="search" placeholder="Search" name="search" />
        </div>
      )} 
      {isNavBar && (     
      <div className="box menu-item">
      <a className="avatar-container">
       <img src={getAvatarPath(avatar)} alt="User Avatar" className="group-image"/>
       <span className="username-text">{userName}</span>
      </a>
      </div>
      )}
      <div className="box menu-item containerLink ">
        <a href="/community-requests" className="notificaciones-profile">
          <img src="/img/internal/community_requests/bell.png" alt="" />
          {!collapsed && "Notifications"}
        </a>
        {collapsed && (
          <div className="titleMenu ">
            <NavLink to={"/community-requests"} className= "navlink ">
              Notifications
            </NavLink>
          </div>
        )}
      </div>

      <div className="box menu-item containerLink bordered-container" >
        <a href="/profile " className="linkMenu" style={{marginTop: '15px'}}>
          <img src="/img/internal/community_requests/smile.png" alt="" />
          {!collapsed && "View profile"}
        </a>
        {collapsed && (
          <div className="titleMenu" >
            <NavLink to={"/profile"} className="navlink">
              View profile
            </NavLink>
          </div>
        )}
      </div>
      {isParticipantUser && (
      <div className="box menu-item containerLink ">
        <a href="/upload-book " className="linkMenu selected-option">
          <img src="/img/svg/book.svg" alt="" />
          {!collapsed && "Create Book"}
        </a>
      </div>
      )}
      {/* Group Dropdown */}
      {isAuthorUser && isGroupAuthor &&(
        <>
      <div className="accordion accordion-agrupacion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne"> 
            <button
               className="accordion-button selected-option"
               type="button"
                data-bs-toggle="collapseAgrupacion"
                data-bs-target="#collapseAgrupacion"
                aria-controls="collapseAgrupacion"
                onClick={ () => 
                  toggleDropdown("Agrupacion")
                }
                  aria-expanded={openDropdown === "Agrupacion"}               
            >         
              <img src="/img/svg/groupIcon.svg" alt="" />
              {!collapsed && "Group"}
            </button>
          </h2>
          {openDropdown === "Agrupacion" &&  (
           <div id="collapseAgrupacion" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div className="accordion-body group">
                {/* Group Content */}
                <div className="form-check box menu-item">
                  <a style={{ cursor: 'pointer' }}>
                    <img src="/img/svg/wallet.svg" alt="" />
                    <label className="form-check-label selected-option" htmlFor="type1">
                      Wallet
                    </label>
                  </a>
                </div>
                <div className="form-check box menu-item">
                  <a style={{ cursor: 'pointer' }}>
                    <img src="/img/svg/Share.svg" alt="" />
                    <label className="form-check-label selected-optoin" htmlFor="type1">
                    Settings
                    </label>
                  </a>
                </div>
                <div className="form-check box menu-item">
                  <a style={{ cursor: 'pointer' }}>
                    <img src="/img/svg/trash-white.svg" alt=""  />
                    <label className="form-check-label selected-option" htmlFor="type1">
                      Trash
                    </label>
                  </a>
                </div>
                <button className="btn-crear-libro selected-option">
                <Link to="/upload-book" >
                 Create book
                </Link>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      </>
     )}
      {/* Requests Dropdown */}
      <div className="accordion" id="accordionSolicitudes">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button selected-option"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSolicitudes"
              aria-controls="collapseSolicitudes"
              onClick={() => {
                toggleDropdown("Solicitudes")
              }}
              aria-expanded={openDropdown === "Solicitudes"}
            >
              <img src="/img/svg/requests.svg" alt="" />
              {!collapsed && "Requests"}
            </button>
          </h2>
          {openDropdown === "Solicitudes" && (
             <div id="collapseSolicitudes" className="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionSolicitudes">
               <div className="accordion-body solicitudes">
                {/* Requests Content */}
                <div className="box menu-item containerLink">
                  <Link to="/community-requests" className="selected-option">
                    <img src="/img/internal/community_requests/request.png" alt="" />
                    My requests
                  </Link>
                </div>
                <div className="form-check box menu-item">
                  <a onClick={handleOpenJoinModal} style={{ cursor: 'pointer' }}>
                    <img src="/img/internal/community_requests/join.png" alt="" />
                    <label className="form-check-label selected-option" htmlFor="type1">
                      Join
                    </label>
                  </a>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
      <div className="box menu-item containerLink">
      <a href="/new-group">
    <img src="/img/internal/community_requests/upload.png" alt="upload book" />
    <label
      className="form-check-label selected-option"
      htmlFor="type2"
      onClick={onGroupLabelClick}
      style={{ cursor: 'pointer' }}
    >
      Create group
    </label>
  </a>
</div>
<div className="box menu-item containerLink">
  <a onClick={() => handleLogout()} style={{ cursor: 'pointer' }} className="selected-option">
    <img src="/img/internal/community_requests/close_session.png" alt="" />
    {!collapsed && <span style={{ marginLeft: '5px' }}>Log out</span>}
  </a>
</div>
<div className="box menu-item menu-left-profile">

      {!isNavBar &&(
      <div className="groups-contenedor ">
      <div style={{width: '275px'}}>
    {userGroups && userGroups.length > 0 && (
      <label className="form-check group-label">
      MY GROUP
    </label>
    )}
    <div >
      {userGroups && userGroups.map((group, index) => (
    
  <Link className="box menu-item  agrupacion-background"  key={index} to={`/my-books/${group.name.replace(/\s+/g, '-').toLowerCase()}/${group.code}`}>
    <a>
      {group.images && group.images.length > 0 ? (
        <img src={`data:image/png;base64,${group.images[0].base64}`} alt={`Group ${index + 1}`} className="group-image" />
      ) : (
        <div className="group-placeholder">
        </div>       
      )}
      <span className="form-check-label custom-text" style={{marginLeft: '10px'}}>{group.name}</span>
    </a>
  </Link>
))}
</div>
</div>
<div className="participante-label">
{otherGroups && otherGroups.length > 0 && (
<label className="form-check group-label" >
  PARTICIPANT GROUP
</label>
)}
{otherGroups && otherGroups.map((group, index) => (
    
  <Link className= "box menu-item agrupacion-background"key={index} to={`/my-books/${group.name.replace(/\s+/g, '-').toLowerCase()}/${group.code}`}>
     <a>      
      {group.images && group.images.length > 0 ? (
        <img src={`data:image/png;base64,${group.images[0].base64}`} alt={`Group ${index + 1}`} className="group-image" />
      ) : (
        <div className="group-placeholder">
        </div>       
      )}
      <span className="form-check-label custom-text" style={{marginLeft: '10px'}}>{group.name}</span>
    </a>
  </Link>

))}
</div>
</div>
)}
<a className="avatar-container">
<img src={getAvatarPath(avatar)} alt="User Avatar" className="group-image"/>
<span className="username-text">{userName}</span>
</a>
</div>
      
      <Modal show={show} onHide={closeModal} dialogClassName="custom-dialog">
        <Modal.Header>
          <div className="titulo-blue p-3">JOIN</div>
          <div className="ui_btn_close" data-dismiss="modal" onClick={closeModal}>
            <figure className="ui_btn_close__figure">
              <img loading="lazy" src="img/svg/icon_close_FFFFFF.svg" alt="" />
            </figure>
          </div>
        </Modal.Header>
        <div className="modal-unirse-content">
          <div style={{ marginTop: '40px' }}>
            <ul>
              <li>
                <select
                  className="input-search"
                  name="search"
                  id="searchCommunity"
                  value={selectedGroup}
                  onChange={handleSelectChange}
                  style={{
                    backgroundColor: 'rgba(200, 200, 200, 0.5)',
                    padding: '5px',
                    borderRadius: '5px',
                    border: 'none',
                    paddingLeft: '30px',
                    backgroundImage: `url(${lupaIcon})`,
                    backgroundPosition: '5px center',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                  <option value="">Search community</option>
                   {filteredCommunities.map((community, index) => (
                   <option key={index} value={community.groupName} style={{display: 'flex'}}>
                     <img src={community.imagePath} style={{ marginLeft: '5px', width:'40px', marginRight: '5px', borderRadius: '25px'}}/>
                     <span>{community.groupName}</span>
                    </option>
                  ))}
                </select>
              </li>
            </ul>
          </div>
          {searchValue ? <div style={{ marginTop: '20px' }}> {searchValue} </div> : null}
          <div className="ibillete historia group-date" style={{ border: 'solid 1px blue', marginTop: '30px', height: '25px', borderRadius: '15px' }} >
            <div>
            <Dropdown
              label={selectedRole ? selectedRole : "Select your role"}
              options={roles}
              onSelect={handleRoleSelect}
             />
            </div>
          </div>
          <div className="w-100 p-2 d-flex justify-content-center">
          <button id="guardar-cambios" type="button" className="btn-rosado mt-3 px-1 mb-2" onClick={handleJoinCommunity}>
            Join
          </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}