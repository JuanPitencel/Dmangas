import React from "react";

export default function CardGroupListResume(props) {
	const groupName = props.groupName?? "";
	const groupRate = props.groupRate?? 0.00;

	return (
		<div class="lbox_container">
			<div class="lbox_bold">{ groupName }</div>
			<div class="lbox_container clasificado icontainer slider bgwhite">
                <div class="clasificado">
                    <ul class="slider_data">
                        <li>
                            <span>
                            	{ groupRate }
	                            <img
	                                src="img/internal/book/icon/star_blue.png"
	                                alt=""
	                            />
                            </span>
                            Rating
                        </li>
                        <li>
                            <span>8k </span> Followers
                        </li>
                        <li>
                            <span>235 </span> Books
                        </li>
                    </ul>
                </div>
            </div>

                    {/* <div class="lbox_container somos-party-fotos"> */}
                    <div className="somos-party-fotos col-md-12 ">
                      <div className="w-full">
                        <div className="item-album">
                          <img src="img/internal/community/img_1.png" alt="" />
                          <div>Love Me Gently</div>
                        </div>
                        <div className="item-album">
                          <img src="img/internal/community/img_2.png" alt="" />
                          <div>The CEO's Dismissal </div>
                        </div>
                      </div>

                      <div className="w-full">
                        <div className="item-album">
                          <img src="img/internal/community/img_3.png" alt="" />
                          <div>The Art of War</div>
                        </div>
                        <div className="item-album">
                          <img src="img/internal/community/img_4.png" alt="" />
                          <div>Wan Gu Shen Wang 2.0</div>
                        </div>
                      </div>
                    </div>
                    <div className="lbox_container text-center">
                      <button class="btn mostrar" type="button">
                        Show More
                      </button>
                    </div>
                  </div>
	);
}