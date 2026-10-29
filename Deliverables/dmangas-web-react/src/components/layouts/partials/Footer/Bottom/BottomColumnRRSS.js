import React, { useEffect, useState }  from 'react';
import EndpointCore from "../../../../../pages/Global";

export default function BottomColumnRRSS() {
	const [linkRRSS, setLinkRRSS] = useState([]);

	useEffect(() => {
	    const requestOptions = { method: "GET", headers: {} }
	    const filtersKey = 
	    	"&filtersKey[]=rrss_facebook_url"+
	    	"&filtersKey[]=rrss_instagram_url"+
	    	"&filtersKey[]=rrss_discord_url"+
	    	"&filtersKey[]=rrss_whatsapp_url"+
	    	"&filtersKey[]=rrss_tiktok_url"+
	    	"&filtersKey[]=rrss_youtube_url"
	    fetch(EndpointCore.settings + "associateByKey=true"+ filtersKey, requestOptions)
	        .then((response) => response.json())
	        .then((result) => {
	              setLinkRRSS(result.items)
	        })
	        .catch((error) => console.log("error", error));
	}, []);

	return(
		<>
			<li className='info mensaje'>
			    <ul id='mensaje' className='lista'>
			        <li className='mensaje'>WHERE THE BEST STORIES ARE BORN</li>
				    <li className="sociales">
				        {
				            linkRRSS['rrss_facebook_url'] &&
				            <a href={linkRRSS['rrss_facebook_url']['value']} target='_blank'>
				                <img src="/img/svg/icon_facebook_white.svg" alt="" />
				            </a>
				        }
				        {
				            linkRRSS['rrss_instagram_url'] &&
				            <a href={linkRRSS['rrss_instagram_url']['value']} target='_blank'>
				                <img src="/img/svg/icon_instagram_white.svg" alt="" />
				            </a>
				        }
				        {
				            linkRRSS['rrss_discord_url'] &&
				            <a href={linkRRSS['rrss_discord_url']['value']} target='_blank'>
				                <img src="/img/svg/icon_discord_white.svg" alt="" />
				            </a>
				        }
				        {
				            linkRRSS['rrss_whatsapp_url'] &&
				            <a href={linkRRSS['rrss_whatsapp_url']['value']} target='_blank'>
				                <img src="/img/svg/icon_whatsapp_white.svg" alt="" />
				            </a>
				        }
				        {
				            linkRRSS['rrss_tiktok_url'] &&
				            <a href={linkRRSS['rrss_tiktok_url']['value']} target='_blank'>
				                <img src="/img/svg/icon_tiktok_white.svg" alt="" />
				            </a>
				        }
				        {
				            linkRRSS['rrss_youtube_url'] &&
				            <a href={linkRRSS['rrss_youtube_url']['value']} target='_blank'>
				                <img src="/img/svg/icon_youtube_white.svg" alt="" />
				            </a>
				        }
				    </li>
			        <li className='derechos'>
			            <p>All rights reserved, we do not claim ownership of any project © 2022 Dmangas Online</p>
			        </li>
			    </ul>
			</li>
		</>
	);
}