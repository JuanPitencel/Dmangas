import React, { useEffect, useState }  from 'react';
import EndpointCore from "../../../../../pages/Global";

export default function BottomColumnPageUrl()  {
	const [ pageList, setPageList ] = useState([])
	const [ bottomPageHtml, setBottomPageHtml ] = useState("")
	console.log(pageList)

	useEffect(() => {
	    const requestOptions = { method: "GET", headers: {} };
	    fetch(EndpointCore.bootom, requestOptions)
	        .then((response) => response.json())
	        .then((result) => {
	        	let pageItems = []
	        	for(var index in result.items) {
	        		switch(index) {
	        			case "category":
	        				pageItems.push({
	        					"class"	: "info link categoria oculta_movile",
	        					"pageGroup": result.items[index]
	        				});
	        				break;
	        			case "about_us":
	        				pageItems.push({
	        					"class"	: "info link nosotros",
	        					"pageGroup": result.items[index]
	        				});
	        				break;
	        			case "information":
	        				pageItems.push({
	        					"class"	: "info link informacion",
	        					"pageGroup": result.items[index]
	        				});
	        				break;
	        			default:
	        				break;
	        		}
	        	}
	            setPageList(pageItems)
	        })
	        .catch((error) => console.log("error", error));
	}, []);

	return(
		<>
			{
				pageList.length > 0 &&
				pageList.map((value, index) => 
					<li className={`${value.class}`} key={index}>
						<ul className='lista'>
							<li key={"categoryInitial"}>{ value.pageGroup.group.name.value }</li>
							{
								value.pageGroup.pages.map((val,ind) =>                                     
			                        <li key={"category_"+ind}><img src="img/svg/icon_check_white.svg" alt="" /><a href={'/'+val.linkRelative.value}> <span className="texto-check">{val.name.value}</span></a></li>
			                	)
			               	}
						</ul>
					</li>
				)
			}
		</>
	);
};