import React from 'react';
import './StarRating.css'; 

const StarRating = ({ totalStars = 5, rating, onRatingChange }) => {
  const handleClick = (value) => {
    onRatingChange(value);
  };

  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((_, index) => (
        <div className="star-container" key={index}>
          <svg
            className={`star ${rating > index ? 'filled' : ''}`}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => handleClick(index + 1)}
          >
            <polygon
              fill={rating > index ? '#7048E8' : 'transparent'}
              stroke="#7048E8"
              strokeWidth="2"
              points="12,2 15,8 21,9 17,14 18,21 12,18 6,21 7,14 3,9 9,8"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default StarRating;