import React, { Component } from 'react';

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

  getAcos(row1, col1, row2, col2, radius) {
    return Math.acos((col1 - col2) / this.getDistance(row1, col1, row2, col2, radius))
  }

  getAsin(row1, col1, row2, col2, radius) {
    return Math.asin((row1 - row2) / this.getDistance(row1, col1, row2, col2, radius))
  }

  render() {
    const { row1, col1, label1, row2, col2, label2, radius, prob } = this.props;
    const d = this.getDistance(row1, col1, row2, col2, radius);
    const x1 = 2 * radius * col1 + radius
    const x2 = 2 * radius * col2 + radius
    const y1 = 2 * radius * row1 + radius
    const y2 = 2 * radius * row2 + radius
    const xOff = 2 * radius * radius * (row2 - row1) / d
    const yOff = 2 * radius * radius * (col2 - col1) / d
    console.log(x1, y1, x2, y2, xOff, yOff);

    return (
      <svg>
        <path
          id='arrow-line'
          strokeWidth='1'
          fill='none' stroke='black'
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