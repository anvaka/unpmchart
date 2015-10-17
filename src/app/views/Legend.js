import React, { Component } from 'react';
import ReactList from 'react-list';
import LegendItem from './LegendItem.js';
import formatNumber from '../utils/formatNumber.js';

export default class LegendView extends Component {
  render() {
    const { legend } = this.props;
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
      return <LegendItem key={key} model={vm} />;
    }
  }
}

function getHeight() {
  return 20;
}
