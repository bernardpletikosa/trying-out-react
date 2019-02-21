import React, { Component } from 'react';
import '../App.css';

export class Cell extends Component {
  constructor(props) {
    super(props);
    const {num, status} = this.props;

    this.state = {num, status};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onCLick(this.state.num);
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.status !== this.props.status || nextState.status !== this.state.status){
      this.setState({num: nextProps.num, status:nextProps.status});
      return true;
    }
    return false;
  }

  render() {
    const className = `cell cell${this.state.status}`;

    return (
      <button type="button" className={className} onClick={this.handleClick}/>
    );
  }
}
