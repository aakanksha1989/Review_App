import * as actionTypes from '../actions/actionTypes';
import { REVIEW_PAGE_SIZE, TEXT_FILTER } from '../../constants';

const initialState = {
    reviewList: null,
    sortFilterOpen: false,
    searchParam: {
        limit: REVIEW_PAGE_SIZE,
        offset: 0,
        sort: "newest"
    },
    reviewListfromAPI: null,
    averageRating: 0,
    textFilter: null
}

//return true if any of the text in 'pattern' is present in the given 'targetStr' string. 
function contains(targetStr,pattern){
    for(const x of pattern){
        if(targetStr.includes(x.toUpperCase()))
            return true;
    }
    return false;
}

//return the list of reviews that passed the filter validation.
function applyTextFilter(val, list) {
    const temp = [...list.reviews];
    const filterReview = temp.filter((review) => {
        return (
            contains(review.title.toUpperCase(),TEXT_FILTER[val]) || 
            contains(review.text.toUpperCase(),TEXT_FILTER[val])
        )
    })
    return filterReview;
}

let overallList;
let temp;
let filteredList;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_REVIEWS:
            let average = 0, total = 0;
            if (action.reviews) {
                action.reviews.reviews.forEach((review) => {
                    total += review.rating;
                })
                average = total / action.reviews.reviews.length;
            }
            return {
                ...state,
                reviewListfromAPI: action.reviews,
                reviewList: action.reviews,
                averageRating: average
            }
        case actionTypes.SET_REVIEWS_SEARCH_PARAM:
            const newReviewList = (state.reviewListfromAPI.reviews).concat(action.reviews.reviews);
            const totalReviews = action.reviews.totalResults;

            overallList = { totalResults: totalReviews, reviews: newReviewList }
            temp = state.textFilter ? applyTextFilter(state.textFilter, overallList) : overallList.reviews;
            filteredList = { ...overallList, reviews: temp };
            return {
                ...state,
                searchParam: action.search,
                reviewList: filteredList,
                reviewListfromAPI: overallList
            }
        case actionTypes.RESET_REVIEWS_SEARCH_PARAM:
            overallList = { totalResults: action.reviews.totalResults, reviews: action.reviews.reviews }
            temp = state.textFilter ? applyTextFilter(state.textFilter, overallList) : overallList.reviews;
            filteredList = { ...overallList, reviews: temp };
            const open = !state.sortFilterOpen;
            return {
                ...state,
                searchParam: action.search,
                reviewList: filteredList,
                reviewListfromAPI: overallList,
                sortFilterOpen: open
            }
        case actionTypes.CLICK_SORT:
            temp = !state.sortFilterOpen
            return {
                ...state,
                sortFilterOpen: temp
            }
        case actionTypes.APPLY_TEXT_FILTER:
            temp = action.searchText ? applyTextFilter(action.searchText, state.reviewListfromAPI) : state.reviewListfromAPI.reviews;
            return {
                ...state,
                textFilter: action.searchText,
                reviewList: { ...state.reviewList, reviews: temp }
            }
        default: return state;
    }
}

export default reducer;