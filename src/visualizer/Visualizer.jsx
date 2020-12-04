import React, { Component } from 'react';
import Node from './node/Node';

import './Visualizer.css';

export default class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: []
    };
  }

  componentDidMount() {
    const numRows = 11;
    const numCols = 17;
    const nodes = [];

    for (let row = 0; row < numRows; row++) {
      const currRow = [];
      for (let col = 0; col < numCols; col++) {
        const currNode = {
          row, col,
          isStart: row === 5 && col === 2,
          isFinish: row === 5 && col === 14
        };
        currRow.push(currNode);
      }
      nodes.push(currRow);
    }

    this.setState({ nodes });
  }

  render() {
    const { nodes } = this.state;

    return (
      <div className="grid">
        {nodes.map((row, rowIdx) => {
          return (<div key={rowIdx}>
            {row.map((node) => {
              const { row, col, isStart, isFinish } = node;
              return (
                <Node key={(row, col)}
                  isStart={isStart}
                  isFinish={isFinish}>
                </Node>
              );
            })}
          </div>
          );
        })}
      </div>
    )
  }
}