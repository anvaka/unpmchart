import React, { Component } from 'react';

class GroupItem extends Component {
  render() {
    return (
      <div className='row'>
        <div className='no-overflow col-md-12 col-xs-12' title={this.props.name}>
          {this.props.name}
        </div>
      </div>
  );
  }
}

export default GroupItem;
