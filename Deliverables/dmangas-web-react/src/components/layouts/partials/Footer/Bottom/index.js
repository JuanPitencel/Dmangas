import React  from 'react';
import BottomColumnRRSS from "./BottomColumnRRSS";
import BottomColumnPageUrl from "./BottomColumnPageUrl";

export default function Bottom() {
	return (
		<div className='container footer footer-one'>
            <div className="html">
                <div className="html-footer">
			        <ul className="col-footer">
			            <BottomColumnRRSS />
			            <BottomColumnPageUrl />         
			        </ul>
		       </div>        
            </div>
        </div>
	);
};