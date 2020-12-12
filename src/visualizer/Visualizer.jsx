import React, { Component } from 'react';
import swal from 'sweetalert';
import Node from './node/Node';
import Edge from './edge/Edge';

import './Visualizer.css';

export default class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.grid = [];
    this.numRows = 9;
    this.numCols = 15;
    this.radius = 40;
    this.state = {
      nodes: [], // (row, col, label, size)
      edges: new Map(), // "row1,col1" : ["row2,col2,prob", ...]
      labels: new Map()
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
    var labels = this.state.labels;

    swal("Please enter your start state: ", {
      content: "input",
    }).then((start) => {

      if (!(start in labels)) {
        swal("ERROR", "Cannot add edge to non-existent state!", "error");
        return;
      }

      swal("Please enter your end state: ", {
        content: "input",
      }).then((end) => {

        if (!(end in labels)) {
          swal("ERROR", "Cannot add edge to non-existent state!", "error");
          return;
        }

        swal("Please enter the transition probability: ", {
          content: "input",
        }).then((prob) => {

          const newProb = parseFloat(prob);
          const [newRow1, newCol1] = labels[start];
          const [newRow2, newCol2] = labels[end];
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
              swal("ERROR", `Total probability out of state ${start} may not exceed 1`, "error");
              return;
            } else {
              newEdges[key].push(val);
            }
          } else {
            if (newProb <= 1) newEdges[key] = [val];
          }

          this.setState({ edges: newEdges });
        })
      })
    });
  }

  // gray out node's neighbors
  grayNodes = (row, col) => {
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
    return newRender;
  }

  // add or update label to node
  updateLabel = (row, col) => {
    swal("Please enter a new label:", {
      content: "input",
    }).then((value) => {
      var newLabels = this.state.labels;
      var newLabel = value;
      var oldLabel = this.grid[row][col];
      if (newLabel === null || newLabel === "") return;
      if (oldLabel !== null && oldLabel.length > 0) newLabels.delete(oldLabel);
      if (newLabel in newLabels) {
        swal("ERROR", "Each node must have a unique label!", "error");
        return;
      }
      console.log(newLabel, oldLabel);
      newLabels[newLabel] = [row, col];
      console.log(newLabels);
      this.grid[row][col] = newLabel;
      this.setState({ nodes: this.updateRender(), labels: newLabels });
    });
  }

  componentDidMount() {
    this.generateGrid();
    this.setState({ nodes: this.updateRender() });
  }

  // converts edges map to edges list
  // {"row1,col1" : ["row2,col2,prob", ...], ...} 
  // => [[row1,col1,row2,col2,prob], [row1,col1,...]]
  edgesToList(edges) {
    const edgesList = [];
    for (var key in edges) {
      for (let val of edges[key]) {
        var combo = key + "," + val;
        var comboSplit = combo.split(",");
        edgesList.push(comboSplit.map((elem) => parseFloat(elem)));
      }
    }
    return edgesList;
  }

  render() {
    const { nodes, edges } = this.state;
    const edgesList = this.edgesToList(edges);

    return (
      <div className="grid">
        <div className="topbar">
          <div className="button">
            DEFINITIONS
          </div>
          <div className="button" onClick={() => this.addEdge()}>
            ADD EDGE
          </div>
        </div>
        <div className="nodes">
          <svg viewBox={`0 0
            ${2 * this.radius * (this.numCols)} 
            ${2 * this.radius * (this.numRows)}`}
            xmlns="http://www.w3.org/2000/svg">
            {edgesList.map((edge, edgeId) => {
              return (
                <Edge key={{ edgeId }}
                  row1={edge[0]}
                  col1={edge[1]}
                  row2={edge[2]}
                  col2={edge[3]}
                  prob={edge[4]}
                  label1={this.grid[edge[0]][edge[1]]}
                  label2={this.grid[edge[2]][edge[3]]}
                  radius={this.radius}>
                </Edge>
              )
            })}
            {nodes.map((row, rowId) => {
              return (
                <g key={rowId}>
                  {row.map((node) => {
                    const { row, col, label } = node;
                    return (
                      <Node key={(row, col)}
                        row={row}
                        col={col}
                        radius={this.radius}
                        label={label}
                        grid={this.grid}
                        updateLabel={this.updateLabel}>
                      </Node>
                    );
                  })}
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    )
  }
}