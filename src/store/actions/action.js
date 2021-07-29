import axios from 'axios';
import * as actionTypes from './actionTypes';
import { createSearchParam } from '../../utils';
import { URL } from '../../constants';

const setReviews = (reviews) => {
  return {
    type: actionTypes.SET_REVIEWS,
    reviews: reviews,
  };
};

const setReviewWithSearchParam = (reviews, searchPara) => {
  return {
    type: actionTypes.SET_REVIEWS_SEARCH_PARAM,
    reviews: reviews,
    search: searchPara,
  };
};

const resetReviewWithSearchParam = (reviews, searchPara) => {
  return {
    type: actionTypes.RESET_REVIEWS_SEARCH_PARAM,
    reviews: reviews,
    search: searchPara,
  };
};

export const initReviews = () => {
  return (dispatch) => {
    axios
      .get(URL.concat('&limit=5&offset=0&sort=newest'))
      .then((response) => {
        dispatch(setReviews(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const readMore = (val) => {
  return (dispatch) => {
    axios
      .get(URL.concat(createSearchParam(val)))
      .then((response) => {
        dispatch(setReviewWithSearchParam(response.data, val));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const sortFilter = (val) => {
  return (dispatch) => {
    axios
      .get(URL.concat(createSearchParam(val)))
      .then((response) => {
        dispatch(resetReviewWithSearchParam(response.data, val));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const sortSelect = () => {
  return {
    type: actionTypes.CLICK_SORT,
  };
};

export const applyTextFilter = (val) => {
  return {
    type: actionTypes.APPLY_TEXT_FILTER,
    searchText: val,
  };
};
