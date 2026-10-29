import React, { useState, useEffect } from "react";
import Footer from "../components/footer/Footer";
import MenuLeft from "../components/menu-left";
import Tabs from "../components/tabs-main";
import CardCommunityRequest from "../components/cardCommunityRequest";
import EndpointCore from "./Global";

export default function CommunityRequest() {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [memberInfoData, setMemberInfoData] = useState({});
  const [groupNames, setGroupNames] = useState({});

  const [tab, setTab] = useState({
    id: 1,
    name: "Requests",
  });
  const optionTabs = [
    {
      id: 1,
      name: "Requests",
    },
    {
      id: 2,
      name: "My Requests",
    },
  ];
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await fetch(EndpointCore.memberStatus, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error("Error fetching pending requests");
        }
        const data = await response.json();
        const pendingRequests = data.data;  
        setPendingRequests(pendingRequests);

        const user_ids = pendingRequests.map(request => request.user_id);
        const url = `${EndpointCore.memberInfo}?user_ids=${user_ids.join(',')}`;
  
        const memberInfoResponse = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!memberInfoResponse.ok) {
          throw new Error("Error fetching member information");
        }
        const memberInfoData = await memberInfoResponse.json();
        setMemberInfoData(memberInfoData); 
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchPendingRequests();
  
  }, []);

  useEffect(() => {
    const fetchMyRequests = async () => {
      try {
        const response = await fetch(EndpointCore.myRequests, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error("Error fetching the user's requests");
        }
        const data = await response.json();
        console.log('User requests:', data);
        setMyRequests(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchMyRequests();
  }, []);

  const idToAlias = {
    1: 'leader',
    2: 'reviser',
    3: 'editor',
    4: 'typer',
    5: 'writer',
    6: 'cartoonist',
    7: 're-drawnist',
    8: 'translator',
    9: 'intern'
  };
  
  // Convert member_type_id to alias
  const aliases = pendingRequests.map((request) => {
    const memberTypeId = request.member_type_id;
    return idToAlias[memberTypeId];
  });

  const memberTypeIdToAlias = {
    1: 'leader',
    2: 'reviser',
    3: 'editor',
    4: 'typer',
    5: 'writer',
    6: 'cartoonist',
    7: 're-drawnist',
    8: 'translator',
    9: 'intern'
  };
  
  // Convert member_type_id to alias for MyRequestItem
  const aliasesForMyRequests = myRequests.map((request) => {
    const memberTypeId = request.member_type_id;
    return memberTypeIdToAlias[memberTypeId];
  });

  useEffect(() => {
    const getGroupNames = async (groupCodes) => {
      try {
        const token = localStorage.getItem('token');
        const url = `${EndpointCore.getGroupByCode}?group_codes=${groupCodes.join(',')}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error("Error fetching group names");
        }
        const data = await response.json();
        console.log('getGroupNames RESPONSE:', data);
        setGroupNames(data.groupNames);
      } catch (error) {
        console.error(error);
        setGroupNames([]);
      }
    };
  
    const groupCodes = myRequests.map(request => request.group_code);
  
    getGroupNames(groupCodes);
  }, [myRequests]); 
  

  
  const MyRequestItem = ({ groupName, role, date, acceptanceStatus }) => {
    return (
      <li className="irem">
        <div className="item avatar">
          <img src="img/internal/book_detail/icon_avatar.png" alt="" />
        </div>
        <div className="item text">
          <ul className="list-cargo">
            <li className="nombre">{groupName}</li>
            <li className="cargo-nombre">
              <span className="cargo">{role}</span>
            </li>
          </ul>
        </div>
        <span className="tiempo">{date}</span>
        <div className="btn btn-rosado m-1" type="button">
         {acceptanceStatus}
        </div>
      </li>
    );
  };

  return (
    <>
      <div className="interna comunidad_solicitudes">
        <div className="seccion_interna">
          <div className="ui_container ui_container--946" style={{ display: 'flex', marginTop: '20px', marginBottom: '20px' }}>
          <div style={{ position: 'fixed',  top: '20px', bottom: '20px' , height: `calc(100vh - 40px)`,}}>
            <MenuLeft />
          </div>            
              <div className="col01 w-71 contenido" style={{marginLeft: '280px'}}>
              <div className="box header">
                <span>My group</span>
              </div>
              <div className="box body">
                <div className="box grid-tab">
                  <Tabs optionTabs={optionTabs} tab={tab} setTab={setTab} />
                  <div id="tab1" className="tabcontent" style={{ display: "block" }}>
                    <div className="box ">
                      <ul className="catalogo">
                        {tab.name === "Requests" && pendingRequests.map((request, index) => (
                          <CardCommunityRequest
                            key={index}
                            userName={memberInfoData[request.user_id]}
                            memberType={aliases[index]}
                            createdAt={request.created_at.split('T')[0]}
                            memberCode={request.code}
                          />
                        ))}
                        {tab.name === "My Requests" && myRequests.map((request, index) => (
                          <MyRequestItem
                            key={request.id}
                            groupName={groupNames.find(group => group.code === request.group_code)?.name || 'Group name not found'}
                            role={aliasesForMyRequests[index]}
                            date={request.created_at.split('T')[0]}
                            acceptanceStatus={request.acceptance_status}

                          />
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div> 
              <div className="hide_movil footer-menu">
                 <Footer  />
              </div>            
            </div>
          </div>
        </div>
      </div>
    </>
  );
 }
