import React, { Component } from 'react';
import Node from './node/Node';

import './Visualizer.css';

export default class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.model = [];
    this.numRows = 11;
    this.numCols = 17;
    this.state = {
      nodes: [], // (id, type, label, size)
      edges: []  // (start, stop, probability)
    };
  }

  generateModel() {
    let newModel = [];
    for (let row = 0; row < this.numRows; row++) {
      let newRow = [];
      for (let col = 0; col < this.numCols; col++) {
        newRow.push(0);
      }
      newModel.push(newRow);
    }
    this.model = newModel;
  }

  updateRender() {
    let newRender = []

    for (let row = 0; row < this.model.length; row++) {
      const currRow = [];
      for (let col = 0; col < this.model[row].length; col++) {
        const currNode = {
          row,
          col,
          label: "",
          type: this.model[row][col]
        };
        currRow.push(currNode);
      }
      newRender.push(currRow);
    }

    return newRender
  }

  updateLabel = (row, col) => {
    this.model[row][col] = 1;
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
              const { row, col, label, type } = node;
              return (
                <Node key={(row, col)}
                  row={row}
                  col={col}
                  label={label}
                  type={type}
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