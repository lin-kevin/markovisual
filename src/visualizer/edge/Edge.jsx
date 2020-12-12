import React, { Component } from 'react';
import Swal from 'sweetalert2';

import './Edge.css';

export default class Edge extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getDistance(row1, col1, row2, col2, radius) {
    var a = (row1 - row2) * 2 * radius;
    var b = (col1 - col2) * 2 * radius;
    return Math.sqrt(a * a + b * b);
  }

  displayDefinition(def) {
    if (def) {
      Swal.fire({
        title: 'TRANSITION PROBABILITY',
        icon: 'info',
        html: '<div class = "align-left">' +
          'Each of these represents the probability of going from one state to another. ' +
          'Recall that the total probability exiting any state must be equal to 1. ' +
          'You will generally see transition probabilities for every Markov Chain represented in a ...</div>',
        showCloseButton: true,
        confirmButtonText: 'Continue',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'TRANSITION MATRIX',
            icon: 'info',
            html: '(insert image & explanation)',
            showCloseButton: true,
            confirmButtonText: 'Continue',
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: 'DO A RANDOM WALK',
                icon: 'success',
                html: '(insert gif & explanation)',
                showCloseButton: true,
                confirmButtonText: 'Thanks!',
              })
            }
          })
        }
      })
    }
  }

  render() {
    const { row1, col1, label1, row2, col2, label2, radius, prob, def } = this.props;
    const d = this.getDistance(row1, col1, row2, col2, radius);
    const x1 = 2 * radius * col1 + radius
    const x2 = 2 * radius * col2 + radius
    const y1 = 2 * radius * row1 + radius
    const y2 = 2 * radius * row2 + radius
    const xOff = 2 * radius * radius * (row2 - row1) / d
    const yOff = 2 * radius * radius * (col2 - col1) / d
    console.log(x1, y1, x2, y2, xOff, yOff);

    return (
      <svg onMouseOver={() => this.displayDefinition(def)}>
        <path strokeWidth='1' fill='none' stroke='black'
          d={`M ${x1}, ${y1} C ${x1 + xOff}, ${y1 - yOff}
                ${x2 + xOff}, ${y2 - yOff} ${x2}, ${y2}`}
        />
        <text x={`${(x1 + x2) / 2 + xOff}`} y={`${(y1 + y2) / 2 - yOff}`} class="edgelabel">
          {label1} &rarr; {label2}: {prob}
        </text>
      </svg>);
  }

  // straight line with mid-arrow 

  /*
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX={d / 4} refY="5"
        markerWidth="20" markerHeight="20"
        orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" />
      </marker>
    </defs>

    <path
      id='arrow-line'
      markerEnd='url(#arrow)'
      strokeWidth='1'
      fill='none' stroke='black'
      d={`M ${x1} ${y1} L ${x2} ${y2}`}
    />
  */
}