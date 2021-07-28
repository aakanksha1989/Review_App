import React, { Component } from 'react';

import { applyTextFilter } from '../../store/actions/action';
import { connect } from 'react-redux';
import { TEXT_FILTER_ARRAY, TEXT_FILTER } from '../../constants';
import './TextFilter.css';

class TextFilter extends Component {
    state = {
        toogleTextFilter: TEXT_FILTER_ARRAY
    }
    
    textArray = Object.keys(TEXT_FILTER);

    onTextFilterClick = (val,i) => {
        const filter = {...this.state.toogleTextFilter};
        filter[val]=!filter[val];
        for (const key in filter) {
            if (key !== val) {
                filter[key] = false;
            }
        }
        const text= filter[val]?val:null;
        this.setState({toogleTextFilter:filter});
        this.props.onTextFilter(text);
    }

    render() {
        const textFilterButtons = this.textArray.map((val,i) => {
            return <button key={"textFil"+i} className="FilterBtn"
                    onClick={() => this.onTextFilterClick(val,i)}
                    style={this.state.toogleTextFilter[val]?{backgroundColor:"#3498DB"}:{backgroundColor:"white"}}>
                {val}
            </button>
        })
        return (
            <div className="TextFilter">
                <div>Filter reviews by</div>
                <div className="BtnSection">
                    {textFilterButtons}
                </div>

            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTextFilter: (val) => dispatch(applyTextFilter(val))
    }
}

export default connect(null, mapDispatchToProps)(TextFilter);