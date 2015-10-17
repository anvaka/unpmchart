import React, { Component } from 'react';
import formatNumber from '../utils/formatNumber.js';

export default class LegendItem extends Component {
  render() {
    const { model } = this.props;
    let iconStyle = {
      backgroundColor: '#' + model.color,
      height: '18px',
      marginTop: '1px'
    };

    return (
      <div className='row'>
        <div className='col-md-1 col-xs-1' style={iconStyle}>
        </div>
        <div className='no-oveflow col-md-8 col-xs-8' title={model.name}>
          {model.name}
        </div>
        <div className='col-md-2 col-xs-2'>
          {formatNumber(model.count)}
        </div>
      </div>
  );
  }
}
