import React, { Component } from 'react';
import Review from './Review/Review';
import { connect } from 'react-redux';
import { initReviews, readMore } from '../../store/actions/action';
import Dropdown from '../Dropdown/Dropdown';
import TextFilter from '../TextFilter/TextFilter';
import Adidas from '../../Adidas.jpg';
import { REVIEW_PAGE_SIZE } from '../../constants';
import './Reviews.css';

class Reviews extends Component {

    componentDidMount() {
        this.props.fetchReviews();
    }
    clickReadMore = () => {
        const more = JSON.parse(JSON.stringify(this.props.reviewSearch));
        more["offset"] += REVIEW_PAGE_SIZE;
        this.props.onReadMore(more);
    }
    render() {
        const totalResult = this.props.reviewList ? this.props.reviewList.totalResults : 0;
        const reviews = this.props.reviewList ? (this.props.reviewList.reviews.length!==0?
        this.props.reviewList.reviews.map((review, index) => {
            return <Review
                key={review.id + index}
                title={review.title}
                rating={review.rating}
                text={review.text}
                positiveFeedbackCount={review.positiveFeedbackCount}
                negativeFeedbackCount={review.negativeFeedbackCount} />;
        }):"No Search Results Found") : null;

        return (
            <div className="ReviewsContainer">
                <div className="ReviewHeading">RATINGS & REVIEWS</div>
                <div className="ReviewBody">
                    <div className="TotalResult">
                        <div><img src={Adidas} alt="Adidas_Review_Shoe_Image" width="100%" /></div>
                        <div style={{ textAlign: "center", fontSize: "16px" }}>{totalResult} Reviews</div>
                        <div style={{ margin:"30px 0px 35px 0px"}}><TextFilter/></div>
                    </div>
                    <div className="Ratings">
                        <div className="DropdownSection"><Dropdown selectOption={this.props.reviewSearch["sort"]} searchParam={this.props.reviewSearch} />
                        </div>
                        <div className="ReviewsList">{reviews}</div>
                        <div className="ButtonSection">
                            <button onClick={this.clickReadMore} className="ReadMoreButton" 
                                    style={{ display: this.props.reviewList && this.props.reviewList.totalResults > this.props.reviewSearch["offset"] ? 'block' : 'none' }}>Read more reviews &gt;&gt;</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        reviewList: state.reviewList,
        reviewSearch: state.searchParam
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchReviews: () => dispatch(initReviews()),
        onReadMore: (val) => dispatch(readMore(val))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Reviews);