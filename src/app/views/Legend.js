import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactList from 'react-list';
import LegendItem from './LegendItem.js';
import formatNumber from '../utils/formatNumber.js';

class LegendView extends Component {
  render() {
    const { legend, dispatch } = this.props;
    if (!legend) return null;

    return (
      <div className='legend-window'>
        <h3>Legend</h3>
        <h4>
          <strong>{formatNumber(legend.length)}</strong> unique keys
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

function getHeight() {
  return 20;
}

function select(globalState) {
  var state = globalState.mainPage;

  return {
    legend: state.legend,
    selectedGroup: state.selectedGroup
  };
}

export default connect(select)(LegendView);
