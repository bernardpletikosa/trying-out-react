import React, { Component } from 'react';
import '../App.css';

export class Info extends Component {
  constructor(props) {
    super(props);
    const {victory, player} = this.props

    if (victory > 0) {
      this.state = {
        text: <strong>Player {victory} WINS!</strong>,
        className: `cell${victory}-text`
      }
    } else {
      this.state = {
        text: `Player ${player} turn`,
        className: `cell${player}-text`
      }
    }
  }

  render() {
    return (
      <div className={this.state.className}>{this.state.text}</div>
    );
  }
}
