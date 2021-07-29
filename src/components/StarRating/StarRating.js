import React from 'react';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StarRating = (props) => {
  const starsArray = [];
  for (let i = 1; i <= 5; i++) {
    starsArray.push(
      <FontAwesomeIcon
        key={'star' + i}
        icon={i <= props.rating ? faStar : emptyStar}
      />
    );
  }
  return <div>{starsArray}</div>;
};

export default StarRating;
