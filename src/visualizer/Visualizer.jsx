import React, { Component } from 'react';
import Node from './node/Node';

import './Visualizer.css';

export default class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.grid = [];
    this.numRows = 9;
    this.numCols = 15;
    this.state = {
      nodes: [], // (row, col, label, size)
      edges: new Map()  // "row1,col1" : ["row2,col2,prob", ...]
    };
  }

  // generate default grid
  generateGrid() {
    let newgrid = [];
    for (let row = 0; row < this.numRows; row++) {
      let newRow = [];
      for (let col = 0; col < this.numCols; col++) {
        newRow.push("");
      }
      newgrid.push(newRow);
    }
    this.grid = newgrid;
  }

  // add edge between two states 
  addEdge() {
    const newRow1 = parseInt(prompt("Row 1: ")); // improve
    const newCol1 = parseInt(prompt("Col 1: ")); // improve
    const label1 = this.grid[newRow1][newCol1];
    if (label1 === null || label1.length === 0) {
      alert("Cannot add edge to non-existent state");
      return;
    }

    const newRow2 = parseInt(prompt("Row 2: ")); // improve
    const newCol2 = parseInt(prompt("Col 2: ")); // improve
    const label2 = this.grid[newRow2][newCol2];
    if (label2 === null || label2.length === 0) {
      alert("Cannot add edge to non-existent state");
      return;
    }

    const newProb = parseFloat(prompt("Probability: "));
    const key = newRow1.toString() + "," + newCol1.toString();
    const val = newRow2.toString() + "," + newCol2.toString() + "," + newProb.toString();
    var newEdges = this.state.edges;

    if (key in newEdges) {
      var totalProb = 0;
      for (let i = 0; i < newEdges[key].length; i++) {
        var triple = newEdges[key][i].split(",");
        totalProb += parseFloat(triple[2]);
      }
      if (totalProb + newProb > 1) {
        alert("Total probability out of state " + this.grid[newRow1][newCol1] + " may not exceed 1");
        return; // improve
      } else {
        newEdges[key].push(val);
      }
    } else {
      if (newProb <= 1) newEdges[key] = [val];
    }

    console.log(newEdges);
    this.setState({ edges: newEdges });
  }

  // gray out node's neighbors, row, and col
  grayNodes = (row, col) => {
    for (let r = 0; r < this.grid.length; r++) {
      for (let c = 0; c < this.grid[row].length; c++) {
        if ((r === row || c === col) && !(r === row && c === col)) {
          this.grid[r][c] = null;
        }
      }
    }

    for (var dr of [-1, 0, 1]) {
      for (var dc of [-1, 0, 1]) {
        if (!(dr === 0 && dc === 0)
          && row + dr >= 0 && row + dr < this.numRows
          && col + dc >= 0 && col + dc < this.numCols) {
          this.grid[row + dr][col + dc] = null;
        }
      }
    }
  }

  // return updated nodes matrix
  updateRender() {
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[row].length; col++) {
        const label = this.grid[row][col];
        if (label !== null && label.length > 0) {
          this.grayNodes(row, col);
        }
      }
    }

    let newRender = []
    for (let row = 0; row < this.grid.length; row++) {
      const currRow = [];
      for (let col = 0; col < this.grid[row].length; col++) {
        const currNode = { row, col, label: this.grid[row][col] };
        currRow.push(currNode);
      }
      newRender.push(currRow);
    }
    return newRender
  }

  updateLabel = (row, col) => {
    var newLabel = prompt("Please enter a new label: "); // improve
    this.grid[row][col] = newLabel;
    this.setState({ nodes: this.updateRender() });
  }

  componentDidMount() {
    this.generateGrid();
    this.setState({ nodes: this.updateRender() });
  }

  render() {
    const { nodes } = this.state;

    // improve 
    return (
      <div className="grid">
        <div className="button" onClick={() => this.addEdge()}>
          ADD EDGE
        </div>
        <div className="nodes">
          {nodes.map((row, rowIdx) => {
            return (<div key={rowIdx}>
              {row.map((node) => {
                const { row, col, label } = node;
                return (
                  <Node key={(row, col)}
                    row={row}
                    col={col}
                    label={label}
                    grid={this.grid}
                    updateLabel={this.updateLabel}>
                  </Node>
                );
              })}
            </div>
            );
          })}
        </div>
      </div>
    )
  }
}