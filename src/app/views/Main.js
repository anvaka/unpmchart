import React, { Component } from 'react';
import { connect } from 'react-redux';
import Legend from './Legend.js';
import Tooltip from './Tooltip.js';

// TODO: Rename to Details?
import Group from './GroupView.js';
import FileSelector from './FileSelector.js';
import { fetchFile, fetchHistogramIfNeeded } from '../actions/fetchFile.js';

class MainView extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchFile('labels.json'));
  }

  render() {
    const {dispatch, files, tooltip} = this.props;
    return (
      <div>
        <FileSelector files={files} onSelected={file => dispatch(fetchHistogramIfNeeded(file))} />
        <div className='legend-window'>
          <Legend></Legend>
          <Group></Group>
        </div>
        <Tooltip model={tooltip}/>
      </div>
      );
  }
}

export default connect(select)(MainView);

function select(state) {
  return {
    files: state.mainPage.files,
    tooltip: state.mainPage.tooltip
  };
}
