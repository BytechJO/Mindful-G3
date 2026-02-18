import React, { useState } from 'react';
import './StarRating.css';

// import starFilledUrl from '../unitOne/L1/assets/star-filled.svg';
// import starEmptyUrl from '../unitOne/L1/assets/star-empty.svg';

import { FaStar } from 'react-icons/fa';

const Star = ({ marked, starId, onClick, onMouseOver }) => {
  return (
    <span data-star-id={starId} className="star" role="button" onClick={onClick}
      onMouseOver={onMouseOver} >
      <FaStar
        color={marked ? '#f1607e' : '#ffff'}
        // size={40}
      />
    </span>
  );
};

const StarRating = ({ value, onChange  }) => {
  const [rating, setRating] = useState(parseInt(value) || 0);
  const [selection, setSelection] = useState(0);

  const handleMouseOver = (e) => {
    const starId = e.currentTarget.dataset.starId;
    if (starId) setSelection(parseInt(starId));
  };

  const handleMouseLeave = () => {
    setSelection(0);
  };

  const handleClick = (e) => {
    const starId = parseInt(e.currentTarget.dataset.starId);
    if (!isNaN(starId)) {
      setRating(starId);
      onChange?.(starId);   // ← هذا مهم جداً
    }
  };

  return (
    <div
      className="star-rating-container"
      onMouseLeave={handleMouseLeave}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={`star_${i + 1}`}
          starId={i + 1}
          marked={selection ? selection >= i + 1 : rating >= i + 1}
          onClick={handleClick}
          onMouseOver={handleMouseOver}
        />
      ))}
    </div>
  );
};


export default StarRating;
