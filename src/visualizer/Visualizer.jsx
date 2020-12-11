import React, { Component } from 'react';
import Node from './node/Node';

import './Visualizer.css';

export default class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.model = [];
    this.numRows = 9;
    this.numCols = 15;
    this.state = {
      nodes: [], // (row, col, label, size)
      edges: []  // (start, stop, probability)
    };
  }

  generateModel() {
    let newModel = [];
    for (let row = 0; row < this.numRows; row++) {
      let newRow = [];
      for (let col = 0; col < this.numCols; col++) {
        newRow.push("");
      }
      newModel.push(newRow);
    }
    this.model = newModel;
  }

  grayNeighbors = (row, col) => {
    for (var dr of [-1, 0, 1]) {
      for (var dc of [-1, 0, 1]) {
        var newRow = row + dr
        var newCol = col + dc
        if (!(dr === 0 && dc === 0)
          && newRow >= 0 && newRow < this.numRows
          && newCol >= 0 && newCol < this.numCols) {
          this.model[newRow][newCol] = null;
        }
      }
    }
  }

  updateRender() {
    for (let row = 0; row < this.model.length; row++) {
      for (let col = 0; col < this.model[row].length; col++) {
        const label = this.model[row][col];
        if (label !== null && label.length > 0) {
          this.grayNeighbors(row, col);
        }
      }
    }

    let newRender = []

    for (let row = 0; row < this.model.length; row++) {
      const currRow = [];
      for (let col = 0; col < this.model[row].length; col++) {
        const currNode = {row, col, label: this.model[row][col]};
        currRow.push(currNode);
      }
      newRender.push(currRow);
    }

    return newRender
  }

  updateLabel = (row, col) => {
    var newLabel = prompt("Please enter a new label: ");
    this.model[row][col] = newLabel;
    this.setState({ nodes: this.updateRender() });
  }

  componentDidMount() {
    this.generateModel();
    this.setState({ nodes: this.updateRender() });
  }

  render() {
    const { nodes } = this.state;

    return (
      <div className="grid">
        {nodes.map((row, rowIdx) => {
          return (<div key={rowIdx}>
            {row.map((node) => {
              const { row, col, label } = node;
              return (
                <Node key={(row, col)}
                  row={row}
                  col={col}
                  label={label}
                  model={this.model}
                  updateLabel={this.updateLabel}>
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