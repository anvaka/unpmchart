import React, { Component } from 'react';
import formatNumber from '../utils/formatNumber.js';

export default class LegendItem extends Component {
  render() {
    const { model } = this.props;
    let iconStyle = {
      backgroundColor: '#' + model.color
    };

    return (
      <div className='row'>
        <div className='col-md-1 col-xs-1' style={iconStyle}>
        </div>
        <div className='no-oveflow col-md-5 col-xs-5' title={model.name}>
          {model.name}
        </div>
        <div className='col-md-5 col-xs-5'>
          {formatNumber(model.count)}
        </div>
      </div>
  );
  }
}
