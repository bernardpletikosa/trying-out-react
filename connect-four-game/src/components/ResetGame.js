import React, { Component } from 'react';
import '../App.css';

export class ResetGame extends Component {
  render() {
    return (
      <button
        className='button' 
        type='button'
        onClick={this.props.onClick}
      >Start new game!</button>
    );
  }
}
