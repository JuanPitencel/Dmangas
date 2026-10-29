import React from "react";
import { parseISO, differenceInHours, differenceInMinutes, differenceInDays } from "date-fns";

export default function CardLibraryNoLogin({ book, isSelection, selectedBooks, handleCheckboxChange, isHistorial }) {

  const getCustomTimeAgo = (updatedAt) => {
    // Check if the date is valid
    if (!updatedAt) {
      return "Date not available";
    }

    try {
      const now = new Date();
      const parsedDate = parseISO(updatedAt);

      const daysDifference = differenceInDays(now, parsedDate);
      const hoursDifference = differenceInHours(now, parsedDate);
      const minutesDifference = differenceInMinutes(now, parsedDate);

      if (daysDifference > 0) {
        return `${daysDifference} days ago`;
      } else if (hoursDifference > 0) {
        return `${hoursDifference} hours ago`;
      } else {
        return `${minutesDifference} minutes ago`;
      }
    } catch (error) {
      console.error("Error processing date:", error);
      return "Invalid date";
    }
  };

  return (
    <li className={isHistorial ? "card-history" : "ibanner"}>
      <div className="item">
        {isSelection && (
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value={book.id}
              id={`book-${book.id}`}
              onChange={(e) => handleCheckboxChange(e, book.id)}
              checked={selectedBooks.includes(book.id)}
            />
          </div>
        )}
        <img src={book.profileImage} alt="Book cover" />
      </div>
      
        {!isHistorial ? (
          <div>
          <div className="item text">{book.title}</div>
          <div className="item estrellita">
            {book.lastVisitedChapter === "Not read" ? (
            <div className="no-leido">
              Up to Ch. {book.totalChapters}
            </div>
            ) : (
            <>
            <div className="num-rosado">{book.remainingChapters}</div>
            <div className="cap">Ch.{book.lastVisitedChapter}</div>
            </>
             )}
          </div>        
       </div>

        ) : (
          <div className="history-info">
            <div className="history-title">
              {book.title}
            </div>
            <div className="cap">
              Ch.{book.chapter_number}
            </div>
            <div className="date">
              <p>
                {getCustomTimeAgo(book.last_visited_at)}
              </p>
            </div>
            <div className="group-author">
              {book.author}
              </div>
            </div>
        )}
    </li>
  );
}
