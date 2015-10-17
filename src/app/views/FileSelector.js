import React, { Component, PropTypes } from 'react';

export default class FileSelector extends Component {
  render() {
    const { files } = this.props;

    return (
      <select ref='input' name='select' onChange={e => this.handleSelected(e)}>
        {files.map(toOption)}
      </select>
    );
  }

  handleSelected(e) {
    const node = this.refs.input;
    let name = this.props.files[node.selectedIndex];
    this.props.onSelected(name);
  }
}

FileSelector.propTypes = {
  onSelected: PropTypes.func.isRequired
};

function toOption(fileName) {
  return (
    <option value={fileName} key={fileName}>{fileName}</option>
  );
}
