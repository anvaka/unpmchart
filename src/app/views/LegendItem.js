import React, { Component } from 'react';
import noop from 'nop';
import formatNumber from '../utils/formatNumber.js';

class LegendItem extends Component {
  render() {
    const { model, onClick } = this.props;
    let iconStyle = {
      backgroundColor: '#' + model.color,
      height: '18px',
      marginTop: '1px'
    };

    return (
      <div className='row' onClick={ e => onClick(model) }>
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

LegendItem.defaultProps = { onClick: noop };

export default LegendItem;
