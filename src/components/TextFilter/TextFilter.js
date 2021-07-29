import React, { Component } from 'react';

import { applyTextFilter } from '../../store/actions/action';
import { connect } from 'react-redux';
import { TEXT_FILTER_ARRAY, TEXT_FILTER } from '../../constants';
import './TextFilter.css';

class TextFilter extends Component {
  state = {
    toogleTextFilter: TEXT_FILTER_ARRAY,
  };

  textArray = Object.keys(TEXT_FILTER);

  onTextFilterClick = (val, i) => {
    const filter = { ...this.state.toogleTextFilter };
    filter[val] = !filter[val];
    for (const key in filter) {
      if (key !== val) {
        filter[key] = false;
      }
    }
    const text = filter[val] ? val : null;
    this.setState({ toogleTextFilter: filter });
    this.props.onTextFilter(text);
  };

  render() {
    const textFilterButtons = this.textArray.map((val, i) => {
      const assignedClasses = ['textFilter_buttons_style'];
      if (this.state.toogleTextFilter[val]) {
        assignedClasses.push('textFilter_buttons_style_active');
      } else assignedClasses.push('textFilter_buttons_style_inActive');

      return (
        <button
          key={'textFil' + i}
          className={assignedClasses.join(' ')}
          onClick={() => this.onTextFilterClick(val, i)}>
          {val}
        </button>
      );
    });

    return (
      <div className="textFilter">
        <div>Filter reviews by</div>
        <div className="textFilter_buttons">{textFilterButtons}</div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTextFilter: (val) => dispatch(applyTextFilter(val)),
  };
};

export default connect(null, mapDispatchToProps)(TextFilter);
