import React from 'react';
import { Dropdown } from 'react-bootstrap';
import './MobileSearch.css';

const MobileSearch = () => {
  return (
    <Dropdown className=' buscador-container hide_desk' style={{ width: '340px', height: '40px', borderRadius: '20px', }}>
      <Dropdown.Toggle variant="default" id="dropdown-buscador">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
           src="/img/svg/icon_search.svg"
            alt="Search icon"
            width="20"
            height="20"
            style={{ marginRight: '10px' }}
          />
          <span className='text-container'>Search Manga and Novels</span>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item header>Recent searches</Dropdown.Item>
        <Dropdown.Item>
          <div className='aspa' style={{ display: 'inline-block', marginLeft: '10px' }}>
            <img loading="lazy" src="/img/svg/aspa_delete.svg" alt="" width="10" height="10" />
          </div>
          <span style={{ display: 'inline-block' }}>Blood</span>

        </Dropdown.Item>
        <Dropdown.Item>
          <div className='aspa' style={{ display: 'inline-block', marginLeft: '10px' }}>
            <img loading="lazy" src="/img/svg/aspa_delete.svg" alt="" width="10" height="10" />
          </div>
          <span style={{ display: 'inline-block' }}>Fukushuu o Koinegau yussha</span>

        </Dropdown.Item>
        <Dropdown.Item>
          <div className='aspa' style={{ display: 'inline-block', marginLeft: '10px' }}>
            <img loading="lazy" src="/img/svg/aspa_delete.svg" alt="" width="10" height="10" />
          </div>
          <span style={{ display: 'inline-block' }}>Beauties on the Desert Island</span>
        </Dropdown.Item>
        <Dropdown.Item>
          <div className='aspa' style={{ display: 'inline-block', marginLeft: '10px' }}>
            <img loading="lazy" src="/img/svg/aspa_delete.svg" alt="" width="10" height="10" />
          </div>
          <span style={{ display: 'inline-block' }}>Hoinegau saikyou yussha</span>

        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default MobileSearch;

