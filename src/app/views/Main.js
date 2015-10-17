import React, { Component } from 'react';
import { connect } from 'react-redux';
import Legend from './Legend.js';

class MainView extends Component {
   render() {
     return (
       <Legend legend={this.props.legend}></Legend>
     );
   }
}

export default connect(select)(MainView);

function select(state) {
  return state;
}
