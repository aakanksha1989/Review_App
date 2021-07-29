import * as actionTypes from '../actions/actionTypes';
import { REVIEW_PAGE_SIZE } from '../../constants';
import { filterReviewsList } from '../../utils';

const initialState = {
  reviewList: null,
  sortFilterOpen: false,
  searchParam: {
    limit: REVIEW_PAGE_SIZE,
    offset: 0,
    sort: 'newest',
  },
  reviewListfromAPI: null,
  averageRating: 0,
  textFilter: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_REVIEWS:
      return {
        ...state,
        reviewListfromAPI: action.reviews,
        reviewList: action.reviews,
      };

    case actionTypes.SET_REVIEWS_SEARCH_PARAM:
      const overallList = {
        ...action.reviews,
        reviews: state.reviewListfromAPI.reviews.concat(action.reviews.reviews),
      };
      return {
        ...state,
        searchParam: action.search,
        reviewList: {
          ...overallList,
          reviews: filterReviewsList(state.textFilter, overallList),
        },
        reviewListfromAPI: overallList,
      };

    case actionTypes.RESET_REVIEWS_SEARCH_PARAM:
      return {
        ...state,
        searchParam: action.search,
        reviewList: {
          ...action.reviews,
          reviews: filterReviewsList(state.textFilter, action.reviews),
        },
        reviewListfromAPI: action.reviews,
        sortFilterOpen: !state.sortFilterOpen,
      };

    case actionTypes.CLICK_SORT:
      return { ...state, sortFilterOpen: !state.sortFilterOpen };

    case actionTypes.APPLY_TEXT_FILTER:
      return {
        ...state,
        textFilter: action.searchText,
        reviewList: {
          ...state.reviewList,
          reviews: filterReviewsList(
            action.searchText,
            state.reviewListfromAPI
          ),
        },
      };

    default:
      return state;
  }
};

export default reducer;
