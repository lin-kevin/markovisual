import React, { Component } from 'react';

import './Node.css';

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: ""
    };
  }

  setColor = (e) => {
    const colors = ["red", "orange", "yellow"];
    this.setState({
      bgColor: colors[Math.floor(Math.random() * colors.length)]
    })
  }

  unSetColor = (e) => {
    this.setState({
      bgColor: ""
    })
  }

  render() {
    var { isStart, isFinish } = this.props;
    var startOrFinish = isFinish ? 'finish' : isStart ? 'start' : '';
    return (<div className={`node ${startOrFinish}`}
      style={{ backgroundColor: this.state.bgColor }}
      onMouseDown={this.setColor}
      onMouseUp = {this.unSetColor}>
    </div>);
  }
}
