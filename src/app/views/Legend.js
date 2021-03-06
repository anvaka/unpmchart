import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactList from 'react-list';
import LegendItem from './LegendItem.js';
import formatNumber from '../utils/formatNumber.js';
import getHeight from '../utils/getItemHeight.js';

class LegendView extends Component {
  render() {
    const { legend, dispatch } = this.props;
    if (!legend) return null;
    let suffix = 'unique ' + (legend.length > 1 ? 'keys': 'key');

    return (
      <div className='legend pkg-panel'>
        <h4>
          <strong>{formatNumber(legend.length)}</strong> {suffix}
        </h4>

        <div className='list-container'>
          <ReactList itemRenderer={renderItem}
            length={legend.length}
            itemSizeGetter={getHeight}
            type='variable' />
        </div>
      </div>
    );

    function renderItem(idx, key) {
      var vm = legend[idx];
      return <LegendItem key={key}
        model={vm}
        onClick={model => dispatch({
          type: 'selectedGroupChanged',
          name: model.name
        })} />;
    }
  }
}

function select(globalState) {
  var state = globalState.mainPage;

  return {
    legend: state.legend,
    selectedGroup: state.selectedGroup
  };
}

export default connect(select)(LegendView);
