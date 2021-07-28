import React from 'react';

import './Review.css';
import StarRating from '../../StarRating/StarRating';
import {faThumbsUp,faThumbsDown} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Review = (props) => (
    <article className="review">
        <div className="review_title">{props.title}</div>
        <StarRating rating={props.rating}/>
        <div className = "review_comments">{props.text}</div>
        <div>Helpful? <FontAwesomeIcon icon={faThumbsUp} /> {props.positiveFeedbackCount} <FontAwesomeIcon icon={faThumbsDown} />{props.negativeFeedbackCount}</div>
    </article>
);

export default Review;