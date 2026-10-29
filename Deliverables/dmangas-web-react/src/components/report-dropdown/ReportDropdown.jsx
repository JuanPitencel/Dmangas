import React, { useState } from 'react';
import './style.css'; 
import EndpointCore from '../../pages/Global';

function ReportDropdown({ notification_type, user_id, entity_id, isComment, comment_id, reply_id, closeDropdown }) {
    // Get the authorization token (e.g. from localStorage)
    const token = localStorage.getItem('token'); // Adjust the key according to your implementation

    const defaultOptions = [
        { ibutton: "Inappropriate content" },
        { ibutton: "Unauthorized copyright" },
        { ibutton: "Content error" },
        { ibutton: "Plagiarized work" },
    ];

    const commentOptions = [
        { ibutton: "Targeted harassment" },
        { ibutton: "Spam" },
        { ibutton: "Inappropriate profile" },
        { ibutton: "Threatening content" },
        { ibutton: "Impersonation" },
        { ibutton: "Private information" },
    ];

    const options = isComment ? commentOptions : defaultOptions;

    const [dropdownTitle, setDropdownTitle] = useState('Report type');
    const [selectedOption, setSelectedOption] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [reportContent, setReportContent] = useState('');

    const handleOptionSelect = (title) => {
        setDropdownTitle(title);
        setSelectedOption(title);
        setShowPopup(true); // Show the popup when an option is selected
        console.log('Option selected:', title);
        console.log('Showing popup:', showPopup);
    };

    const handlePopupClose = () => {
        console.log('Closing popup');
        setShowPopup(false); // Hide the popup
    };

    const handleContentChange = (event) => {
        console.log('Changing report content:', event.target.value);
        setReportContent(event.target.value); // Update the report content
    };

    const handleSubmit = async () => {
        if (!selectedOption || !reportContent.trim()) {
            console.error("You must select an option and write the report content.");
            return;
        }

        // Build the request body
        const payload = {
            report_type: selectedOption,
            content: reportContent,
            notification_type,
            user_id,
            entity_id,
        };

        // Add comment_id and reply_id if present
        if (comment_id) {
            payload.comment_id = comment_id;
            console.log('THE COMMENTID REPLY REPORTS',comment_id)
        }
        if (reply_id) {
            payload.reply_id = reply_id;
        }

        try {
            const response = await fetch(EndpointCore.createReport, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Include the token in the headers
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Report sent successfully:', data);
                setShowPopup(false);
                closeDropdown();
            } else {
                console.error('Error sending the report:', response.statusText);
            }
        } catch (error) {
            console.error('Error sending the report:', error);
        }
    };

    return (
        <div className='custom-dropdown-button'>
            <div className='custom-dropdown-container'>
                <div className="custom-dropdown-title">{dropdownTitle}</div>
                {options.map((option, index) => (
                    <div
                        key={index}
                        className={`custom-dropdown-item ${selectedOption === option.ibutton ? 'selected' : ''}`}
                        onClick={() => handleOptionSelect(option.ibutton)}
                    >
                        <div className="custom-dropdown-circle">
                            <div className={`custom-dropdown-check ${selectedOption === option.ibutton ? 'selected' : ''}`} />
                        </div>
                        <span>{option.ibutton}</span>
                    </div>
                ))}
            </div>
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h3>Add report content</h3>
                        <textarea
                            value={reportContent}
                            onChange={handleContentChange}
                            placeholder="Write the report content here..."
                        />
                        <div className='dropdown-button-container'>
                            <button onClick={handleSubmit} className='btn-rosado'>Send</button>
                            <button onClick={handlePopupClose} className='cancel-edit'>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default ReportDropdown