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

  displayDefinition(def, label) {
    if (def && label.length > 0) {
      alert(" ");
    }
  }

  checkNode(label) {
    if (this.props.label === null) return "invalid";
    else if (this.props.label === "") return "blank";
    return "state";
  }

  render() {
    const { row, col, radius, label, definitions, updateLabel } = this.props;
    const property = this.checkNode(label);
    const topMargin = radius / 8;
    return (<g>
      <circle className={`node ${property}`} r={radius}
        cx={col * radius * 2 + radius} cy={row * radius * 2 + radius}
        // style={{ backgroundColor: this.state.bgColor }}
        // onClick={this.setColor}
        // onMouseUp={this.unSetColor}
        onMouseOver={() => this.displayDefinition(definitions, label)}
        onClick={() => updateLabel(row, col)}>
      </circle>
      <text className='type'
        x={col * radius * 2 + radius}
        y={row * radius * 2 + topMargin + radius}>
        {label}
      </text>
    </g>);
  }
}
