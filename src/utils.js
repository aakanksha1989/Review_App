import { TEXT_FILTER } from './constants';

export const createSearchParam = (val) => {
  let searchParam = '';
  for (let key in val) {
    searchParam = `${searchParam}&${key}=${val[key]}`;
  }
  return searchParam;
};

const contains = (targetStr, pattern) => {
  for (const x of pattern) {
    if (targetStr.includes(x.toUpperCase())) return true;
  }
  return false;
};

const applyTextFilter = (val, list) => {
  const temp = [...list.reviews];
  const filterReview = temp.filter((review) => {
    return (
      contains(review.title.toUpperCase(), TEXT_FILTER[val]) ||
      contains(review.text.toUpperCase(), TEXT_FILTER[val])
    );
  });
  return filterReview;
};

/**
 * This function will accept the filterText and list
 * and returns a filtered list.
 * @param {String} filterText
 * @param {Object} list
 * @returns {Object} The filtered list of reviews
 */
export const filterReviewsList = (filterText, list) => {
  const result = filterText ? applyTextFilter(filterText, list) : list.reviews;
  return result;
};
