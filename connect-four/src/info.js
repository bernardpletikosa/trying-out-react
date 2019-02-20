export class Info extends React.Component {
  constructor(props){
    super(props);
    const victory = this.props.victory

    let text = null
    let className = `alert alert-${victory === 0 ? 'light' : victory === 1 ? 'info' : 'dark'}`

    if(victory > 0){
      text = <strong>Player {victory} WINS!</strong>
    } else {
      text = `Player ${this.props.player} turn`
    }

    this.state = {text, className}
  }

  render(){
    return (
      <div className={this.state.className}>
        {this.state.text}
      </div>
    );
  }
}
