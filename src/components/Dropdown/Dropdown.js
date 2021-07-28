import React, { Component } from 'react';
import './Dropdown.css';
import { connect } from 'react-redux';
import { SORT_OPTIONS } from '../../constants';

import { sortFilter, sortSelect } from '../../store/actions/action';

class Dropdown extends Component {
   
    componentDidMount() {
        if (!document.getElementById(this.props.selectOption).checked) {
            document.getElementById(this.props.selectOption).checked = true;
        }
    }

    selectSortFilter = (e) => {
        const more = JSON.parse(JSON.stringify(this.props.searchParam));
        more["offset"] = 0;
        more["sort"] = e.target.value;
        this.props.onSortFilter(more);
    }

    render() {
        const options = [];
        for (const key in SORT_OPTIONS) {
            let displayOption = (<div key={key}>
                <input type="radio" onChange={this.selectSortFilter} id={key} name="sort_options" value={key}></input>
                <label className ="options" htmlFor={key}>{SORT_OPTIONS[key]}
                </label><br />
            </div>)
            options.push(displayOption);
        }
        
        return (
            <div className="dropdown">
                <button onClick={this.props.onSortClick} className="dropbtn">SORT BY</button>
                <div id="myDropdown" className={this.props.open ? "show" : "dropdowncontent"}>
                    {options}
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        open: state.sortFilterOpen
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onSortFilter: (val) => dispatch(sortFilter(val)),
        onSortClick: () => dispatch(sortSelect())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);