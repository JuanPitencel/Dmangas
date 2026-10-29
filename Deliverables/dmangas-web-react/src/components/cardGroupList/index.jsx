import React from "react";
import { Link } from "react-router-dom";

export default function CardGroupList({
    group,
    index,
    setGroupName,
    setGroupRate
}) {
    const handleMouseEnter = (group, event) => {
        console.log("test");
        setGroupName(group.groupName)
        setGroupRate(group.groupRate)
        const grayRightPanel = document.getElementById("gris_rigth_01");
        grayRightPanel.style.width = "0px";
        grayRightPanel.style.overflow = "hidden";
        setTimeout(() => {
            grayRightPanel.style.width = "25%";
        }, 500);
    };

    return (
        <Link 
            to={`/community/${group.groupLink.value}`}
            onMouseEnter={(e) => handleMouseEnter(group, e)}
        >
            <div class="ibanner g cardHover">
                <div
                    class="icard left-a w-full hide_movil overflow-hidden"
                    style={{ height: "138px" }}
                >
                    <ul className="h-100">
                        <li className="w-50 h-50 rounded-circle overflow-hidden">
                            <img
                              src={group.images[0].image.path}
                              alt={group.images[0].image.name}
                            />
                        </li>
                        <li className="w-100">
                            <p className="h6 text-truncate">{group.groupName}</p>
                        </li>
                        <li>
                            <img src="img/internal/book_detail/user2.png" alt="" />
                            <span className="h-20">{group.groupMembers}K</span>
                        </li>
                    </ul>
                </div>
                <div
                    class="icardbanner left-a w-full overflow-hidden"
                    style={{ height: "138px" }}
                >
                    <img className="w-100" src={group.images[1].image.path} alt="" />
                    <div class="nro_rojo">
                        {index.toString().length > 1 ? index : `0${index}`}
                    </div>
                    <div class="m-info-ibanner oculta_desktop">
                        <div class="img w-10 h-10 rounded-circle overflow-hidden">
                            <img
                              src={group.images[0].image.path}
                              alt={group.images[0].image.name}
                            />
                        </div>
                        <div class="ul-lista">
                            <ul>
                                <li>{group.groupName}</li>
                                <li>
                                    <img src="img/internal/book_detail/user2.png" alt="" />
                                    <span> {group.groupMembers}K</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
