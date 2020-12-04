import React, { Component } from 'react';

import './Node.css';

export default class State extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="node"></div>
  }
}