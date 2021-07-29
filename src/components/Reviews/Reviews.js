import React, { Component } from 'react';
import Review from './Review/Review';
import { connect } from 'react-redux';
import { initReviews, readMore } from '../../store/actions/action';
import Dropdown from '../Dropdown/Dropdown';
import TextFilter from '../TextFilter/TextFilter';
import Adidas from '../../assets/Adidas.jpg';
import { REVIEW_PAGE_SIZE } from '../../constants';
import './Reviews.css';

class Reviews extends Component {
  componentDidMount() {
    this.props.fetchReviews();
  }

  clickReadMore = () => {
    const more = JSON.parse(JSON.stringify(this.props.reviewSearch));
    more['offset'] += REVIEW_PAGE_SIZE;
    this.props.onReadMore(more);
  };

  render() {
    const totalResult = this.props.reviewList
      ? this.props.reviewList.totalResults
      : 0;

    const reviews = this.props.reviewList
      ? this.props.reviewList.reviews.length !== 0
        ? this.props.reviewList.reviews.map((review, index) => {
            return (
              <Review
                key={review.id + index}
                title={review.title}
                rating={review.rating}
                text={review.text}
                positiveFeedbackCount={review.positiveFeedbackCount}
                negativeFeedbackCount={review.negativeFeedbackCount}
              />
            );
          })
        : 'No Search Results Found'
      : null;

    const assignedClasses = ['reviews_body_right_button-readMore'];
    if (
      this.props.reviewList &&
      this.props.reviewList.totalResults > this.props.reviewSearch['offset']
    ) {
      assignedClasses.push('reviews_body_right_button-readMore_show');
    } else assignedClasses.push('reviews_body_right_button-readMore_hide');

    return (
      <div className="reviews">
        <div className="reviews_heading">RATINGS & REVIEWS</div>
        <div className="reviews_body">
          <div className="reviews_body_left">
            <div>
              <img src={Adidas} alt="Adidas_Review_Shoe_Image" width="100%" />
            </div>
            <div className="reviews_body_left_total">{totalResult} Reviews</div>
            <div className="reviews_body_left_filter">
              <TextFilter />
            </div>
          </div>
          <div className="reviews_body_right">
            <div className="reviews_body_right_dropdown">
              <Dropdown
                selectOption={this.props.reviewSearch['sort']}
                searchParam={this.props.reviewSearch}
              />
            </div>
            <div className="reviews_body_right_reviewList">{reviews}</div>
            <div className="reviews_body_right_button">
              <button
                onClick={this.clickReadMore}
                className={assignedClasses.join(' ')}>
                Read more reviews &gt;&gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reviewList: state.reviewList,
    reviewSearch: state.searchParam,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchReviews: () => dispatch(initReviews()),
    onReadMore: (val) => dispatch(readMore(val)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
