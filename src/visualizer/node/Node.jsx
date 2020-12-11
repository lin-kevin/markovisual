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
    const colors = ["red", "orange", "yellow", "green", "blue", "purple"];
    this.setState({
      bgColor: colors[Math.floor(Math.random() * colors.length)]
    })
  }

  unSetColor = (e) => {
    this.setState({
      bgColor: ""
    })
  }

  checkNode(label) {
    if (this.props.label === null) return "invalid";
    else if (this.props.label === "") return "blank";
    return "state";
  }

  render() {
    const {row, col, radius, label, updateLabel} = this.props;
    const property = this.checkNode(label);
    const topMargin = radius/8;
    return (<g>
      <circle className={`node ${property}`} r={radius}
        cx={col * radius * 2} cy={row * radius * 2}
        // style={{ backgroundColor: this.state.bgColor }}
        // onClick={this.setColor}
        // onMouseUp={this.unSetColor}
        onClick={() => updateLabel(row, col)}>
      </circle>
      <text className='type' x={col * radius * 2} y={row * radius * 2 + topMargin}>
        {label}
      </text>
    </g>);
  }

  /*
  render() {
    const property = this.checkNode(this.props.label);

    return (<div className={`node ${property}`}
      // style={{ backgroundColor: this.state.bgColor }}
      // onClick={this.setColor}
      // onMouseUp={this.unSetColor}
      onClick={() => this.props.updateLabel(this.props.row, this.props.col)}>
      <div className = 'type'>
        {this.props.label}
      </div>
    </div>);
  }
  */
}
