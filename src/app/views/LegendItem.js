import React, { Component } from 'react';
import noop from 'nop';
import formatNumber from '../utils/formatNumber.js';
import getHeight from '../utils/getItemHeight.js';

class LegendItem extends Component {
  render() {
    const { model, onClick } = this.props;
    let height = getHeight() - 2;
    let iconStyle = {
      backgroundColor: '#' + model.color,
      height: height + 'px',
      marginTop: '1px'
    };

    return (
      <div className='row' onClick={ e => onClick(model) }>
        <div className='col-md-1 col-xs-1' style={iconStyle}>
        </div>
        <div className='no-overflow col-md-8 col-xs-8' title={model.name}>
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
