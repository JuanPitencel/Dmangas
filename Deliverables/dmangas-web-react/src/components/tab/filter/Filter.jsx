import React, { useState } from 'react';
import { Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';
import './style.css';

function Filter(props) {

    const data = props.data;
    const sortOptions = data[0].data;
    const showOptions = [15, 20, 25, 30, 35];
    const [selectedSortTitle, setSelectedSortTitle] = useState(data[0].recomendados);
    const [selectedShowTitle, setSelectedShowTitle] = useState(showOptions[0]);

    const handleOptionSelect = (title) => {
        setSelectedSortTitle(title);
    };

    const handleShowSelect = (title) => {
        setSelectedShowTitle(title);
    };
    return (
        <div className="filtro-tab">
            <ul className="d-flex align-items-center">
            
               <div className="  ui_cols--order_list">
                    <div className="ui_col">
                        <div className="ui_paragraph_12 ui_paragraph_12--medium">
                            <span>books 1-280</span>
                        </div>
                    </div>
                    <div className=" resultados oculta_desktop">
                        <div className="ui_paragraph_12 ui_paragraph_12--medium">
                            <span>90 results</span>
                        </div>
                    </div>
                </div>

                <li><span>{data[0].nro_result}</span></li>
                <li className="mr-2">
                    <DropdownButton
                        as={ButtonGroup}
                        title={`Sort by: ${selectedSortTitle}`}
                        id="dropdownID"
                        className='custom-dropdown-button'

                    >
                         <Dropdown.Item className="custom-dropdown-title">
                            <span>SORTED BY</span>
                        </Dropdown.Item>
                        {sortOptions.map((option, index) => (
                            <Dropdown.Item
                                key={index}
                                className="custom-dropdown-item"
                                onClick={() => handleOptionSelect(option.ibutton)} // Change the title on click
                            >
                                <div className="custom-dropdown-circle">
                                    <div className="custom-dropdown-check" />
                                </div>
                                <span>{option.ibutton}</span>
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                </li>
                <li>
                <DropdownButton
                        as={ButtonGroup}
                        title={`Show: ${selectedShowTitle}`}
                        id="dropdownID"
                        className='custom-dropdown-button'
                    >

                        <Dropdown.Item className="custom-dropdown-title">
                            <span>{selectedShowTitle}</span>
                        </Dropdown.Item>
                        {showOptions.map((option, index) => (
                            <Dropdown.Item
                                key={index}
                                className="custom-dropdown-item"
                                onClick={() => handleShowSelect(option)}
                            >
                                <div className="ui_dropdown_circle">
                                    <div className="ui_dropdown_circle__check" />
                                </div>
                                <span>{option}</span>
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                </li>
                <li>
                    <div className="grid-filtro"><img src="/img/svg/icon_order_list_1.svg" alt="" /></div>
                    <div className="grid-filtro"><img src="/img/svg/icon_order_list_2.svg" alt="" /></div>
                </li>
            </ul>
        </div>
    );
}

export default Filter;
