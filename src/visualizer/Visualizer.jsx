import React, { Component } from 'react';
import State from './node/Node';

import './Visualizer.css';

export default class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: []
    };
  }

  componentDidMount() {
    var numRows = 11;
    var numCols = 17;

    var nodes = [];
    for (let row = 0; row < numRows; row++) {
      var currRow = [];
      for (let col = 0; col < numCols; col++) {
        var currNode = {
          row, col,
        };
        currRow.push([currNode]);
      }
      nodes.push(currRow);
    }
    this.setState({ nodes });
  }

  render() {
    var { nodes } = this.state;

    return (
      <div className="grid">
        {nodes.map((row, rowIdx) => {
          return <div>
            {row.map((node, nodeIx) => <State></State>)}
          </div>
        })}
      </div>
    )
  }
}