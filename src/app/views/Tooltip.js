import React, { Component } from 'react';

class Tooltip extends Component {
  render() {
    var model = this.props.model;
    if (!model) return null;

    let tooltipStyle = {
      left: model.x + 4,
      top: model.y - 36
    };
    return (
      <div className='tooltip-window' style={tooltipStyle}>
        {model.name}
      </div>
  );
  }
}

export default Tooltip;
