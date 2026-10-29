import React from 'react';
function Search(){
        return(
            <div className='html'>
                <ul>
                    <li><input type="text" placeholder="Search manga or novels" className="input-search" name="search" /></li>
                    <li>
                        <ul className='info-login'>
                            <li><span>Recent searches</span></li>
                            <li>
                              <span>Blood</span><div className='aspa'><img loading="lazy" src="/img/svg/aspa_delete.svg" alt="" /></div>
                            </li>
                            <li>
                              <span>Fukushuu o Koinegau yussha</span><div className='aspa'><img loading="lazy" src="/img/svg/aspa_delete.svg" alt="" /></div>
                            </li>
                            <li>
                              <span>Beauties on the Desert Island</span><div className='aspa'><img loading="lazy" src="/img/svg/aspa_delete.svg" alt="" /></div>
                            </li>
                            <li>
                              <span>Hoinegau saikyou yussha</span><div className='aspa'><img loading="lazy" src="/img/svg/aspa_delete.svg" alt="" /></div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
}
export default Search;