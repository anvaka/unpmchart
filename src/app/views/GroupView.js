import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactList from 'react-list';
import GroupItem from './GroupItem.js';
import formatNumber from '../utils/formatNumber.js';
import getHeight from '../utils/getItemHeight.js';

class GroupView extends Component {
  render() {
    const { group } = this.props;
    if (!group) return null;
    let members = group.members;

    return (
      <div className='group-details pkg-panel'>
        <h4 className='no-overflow' title={group.name}>
          <strong>{group.name}</strong> ({formatNumber(members.length)} items)
        </h4>

        <div className='list-container'>
          <ReactList itemRenderer={renderItem}
            length={members.length}
            itemSizeGetter={getHeight}
            type='variable' />
        </div>
      </div>
    );

    function renderItem(idx, key) {
      var name = members[idx];
      return <GroupItem key={key} name={name} />;
    }
  }
}

function select(state) {
  return {
    group: state.mainPage.selectedGroup
  };
}

export default connect(select)(GroupView);
