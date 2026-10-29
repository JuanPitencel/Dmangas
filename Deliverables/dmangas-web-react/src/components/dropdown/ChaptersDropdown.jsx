import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ChaptersDropdown = ({ sortedGroupedChapters, libroData, handleDeleteChapter }) => {
  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleDropdown = (groupIndex) => {
    setOpenDropdowns(prevState => ({
      ...prevState,
      [groupIndex]: !prevState[groupIndex]
    }));
  };

  const formatTitleForURL = (title) => {
    return title.trim().toLowerCase().replace(/\s+/g, '-');
};

  const ChapterItem = ({ chapter, isFirst }) => {
    const isMember = chapter.isMember; 

    const formattedTitle = formatTitleForURL(chapter.name);


    const chapterURL = `/book-read-chapter/${formattedTitle}/${chapter.number}/${chapter.chapter_code}/${libroData.code}`;

  
    return (
      <div
        className="accordion-item"
        style={{
          marginTop: '15px',
          height: '76px',
          width: isFirst ? '95%' : '90%', // Change the width based on the isFirst condition
        }}
      >
        <Link to={chapterURL} state={{ libroData, chapterCode: chapter.chapter_code }}>
          <div className="accordion-collapse collapse show" aria-labelledby={`headingDetail${chapter.chapter_code}`}>
            <div className="accordion-body" style={{ display: 'flex', alignItems: 'center' }}>
              {chapter.profileImage ? (
                <div className="ifoto" style={{ width: '99px', height: '76px', overflow: 'hidden', borderRadius: '10px' }}>
                  <img
                    src={chapter.profileImage}
                    alt="profileImage"
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}
                  />
                </div>
              ) : null}
              <div className="itext" style={{ marginLeft: '10px', flexGrow: 1 }}>
                {isFirst ? (
                  <div className="titulo">
                    {chapter.name}
                    <div className="btn_cbo"></div>
                  </div>
                ) : null}
                <div className="subtitulo1">
                  {isFirst ? `Cap. ${chapter.number}` : chapter.group_name}
                </div>
                <div className="subtitulo2">
                  {chapter.created_at}
                </div>
              </div>
              {isMember && ( // Condition to render if the user is a member
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                  <Link
                    to="/book-edit-chapter"
                    state={{
                      libroData: libroData,
                      chapterInfo: chapter,
                    }}
                    style={{ marginRight: '10px' }}
                  >
                    <img src="/img/edit.png" alt="edit chapter" style={{ marginRight: '5px' }} />
                  </Link>
                  <img
                    src="/img/trash.png"
                    alt="delete chapter"
                    onClick={() => handleDeleteChapter(chapter.chapter_code)}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              )}
            </div>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div className="accordion" id="accordionDetailsItem" style={{ marginTop: '25px' }}>
      {sortedGroupedChapters.map((group, groupIndex) => {
        const originalChapter = group.chapters[0];
        const alternateChapters = group.chapters.slice(1);

        return (
          <div key={groupIndex} className="acordeon-item" style={{ marginBottom: '35px' }}>
            <h2 className="accordion-header" id={`heading${groupIndex}`} style={{ marginBottom: '20px' }}>
              <button
                className="accordion-button"
                type="button"
                onClick={() => toggleDropdown(groupIndex)}
                aria-expanded={openDropdowns[groupIndex] || false}
                aria-controls={`collapse${groupIndex}`}
                style={{ backgroundColor: 'transparent', marginBottom: '50px' }}
              >
                <ChapterItem chapter={originalChapter} isFirst={true} />
              </button>
            </h2>
            <div
              id={`collapse${groupIndex}`}
              className={`accordion-collapse collapse ${openDropdowns[groupIndex] ? 'show' : ''}`}
              aria-labelledby={`heading${groupIndex}`}
              data-bs-parent="#accordionDetailsItem"
              style={{ marginTop: '25px' }}
            >
              <div className="accordion-body">
                <div className="contenido">
                  {alternateChapters.map((chapter, chapterIndex) => (
                    <ChapterItem key={chapterIndex} chapter={chapter} isFirst={false} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChaptersDropdown;