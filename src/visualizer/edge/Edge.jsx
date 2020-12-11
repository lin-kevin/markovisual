import React, { Component } from 'react';

import './Edge.css';

export default class Edge extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { row1, col1, row2, col2, radius, prob } = this.props;
    return (
      <svg>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5"
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
          d={`M ${2 * radius * col1} ${2 * radius * row1} 
              L ${2 * radius * col2} ${2 * radius * row2}`}
        />
        <text x="40" y="20" class="edgelabel">
          Testing
        </text>
      </svg>);
  }
}