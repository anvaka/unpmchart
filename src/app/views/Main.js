import React, { Component } from 'react';
import { connect } from 'react-redux';
import Legend from './Legend.js';
import FileSelector from './FileSelector.js';

class MainView extends Component {
   render() {
     const {dispatch, files} = this.props;
     return (
       <div>
        <FileSelector
          files={files}
          onSelected={file => dispatch({
            type: 'fileChanged',
            name: file
          })} />
        <Legend legend={this.props.legend}></Legend>
       </div>
     );
   }
}

export default connect(select)(MainView);

function select(state) {
  return state;
}
