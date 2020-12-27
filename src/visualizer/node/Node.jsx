import React, { Component } from 'react';
import Swal from 'sweetalert2';

import './Node.css';

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // style={{ backgroundColor: this.state.bgColor }}
  // onClick={this.setColor}
  // onMouseUp={this.unSetColor}

  /*
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
  */

  displayDefinitions(def, label) {
    if (def && label.length > 0) {
      Swal.fire({
        title: 'STATE',
        icon: 'info',
        html: '<div class = "align-left">' +
          'Together, these states form the <i>state space</i>, which is the set of all possible states. ' +
          'These states can be anything: numbers, letters, symbols, weather conditions, stock performances, you name it! </div>',
        showCloseButton: true,
        confirmButtonText: 'Continue',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'GO EXPERIMENT!',
            icon: 'success',
            html: '<div class = "align-left">' +
              'Feel free to simulate any real-world process you are interested in by changing the name of your sates! </div>',
            showCloseButton: true,
            confirmButtonText: 'Thanks!',
          })
        }
      })
    }
  }

  checkNode(label) {
    if (this.props.label === null) return "invalid";
    else if (this.props.label === "") return "blank";
    return "state";
  }

  render() {
    const { row, col, radius, label, def, updateLabel } = this.props;
    const property = this.checkNode(label);
    const topMargin = radius / 8;
    return (<g>
      <circle className={`node ${property}`} r={radius}
        cx={col * radius * 2 + radius} cy={row * radius * 2 + radius}
        onMouseOver={() => this.displayDefinitions(def, label)}
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
