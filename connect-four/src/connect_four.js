// -------------------------------------------------------------------------------------------
// Idea is that cells are numbered like below
//
// | 0 | 1 | 2 | 3 |
// | 4 | 5 | 6 | 7 |
// | 8 | 9 | 10| 11|
// | 12| 13| 14| 15|
//
// For checking the wining combination, the is a loop through all the cells
// For each cell possible combinations (straight right, straight below, diagonally down and diagonally up) are checked
//
// example for cell 0:
// 0->1->2->3, then 0->4->8->12, then 0->5->10->15
// example for cell 12:
// 12->13->14->15, then 12->9->6->3
// -------------------------------------------------------------------------------------------

const ROWS = 5;
const COLUMNS = 6;
const TOTAL_CELLS = ROWS * COLUMNS;
const CELL_SIZE = 100;
const CONNECT = 4;

const frameStyle = {
  margin: 'auto',
  width: `${(COLUMNS + 1) * CELL_SIZE}px`,
  height: `${(ROWS + 1) * CELL_SIZE}px`,
};

const cellStyle = {
  borderRadius: '50%',
  width: `${CELL_SIZE}px`,
  height: `${CELL_SIZE}px`,
  margin: '2px',
};

/**
 * Does it makes sense to check wining combinations with this cell
 * @param {Number} cell - cell number
 * @param {boolean} horizontal
 * @param {boolean} vertical
 * @returns {boolean}
 */
function makesSense(cell, horizontal, vertical) {
  if (horizontal && (cell % COLUMNS > COLUMNS - CONNECT)) return false;
  if (vertical && (Math.floor(cell / COLUMNS) >= ROWS - CONNECT + 1)) return false;
  return true;
}

/**
 * Recursive function that starts with first cell and checks next 3 for winning combination.
 * @param values
 * @param cell
 * @param value
 * @param steps
 * @param hop
 * @returns {*}
 */
function checkCells(values, cell, value, steps, hop) {
  if (steps.length === CONNECT) return steps;

  const nextIndex = cell + hop;
  const next = values[nextIndex];

  if (next === 0 || next !== value) return null;
  steps.push(nextIndex);

  return checkCells(values, nextIndex, next, steps, hop);
}

class Info extends React.Component {
  constructor(props) {
    super(props);
    const {victory, player} = this.props

    if (victory > 0) {
      this.state = {text: <strong>Player {victory} WINS!</strong>}
    } else {
      this.state = {text: `Player ${player} turn`}
    }
  }

  render() {
    return (
      <div>{this.state.text}</div>
    );
  }
}

class Cell extends React.Component {
  constructor(props) {
    super(props);

    this.hitMe = this.hitMe.bind(this);
    this.getColor = this.getColor.bind(this);
  }

  getColor() {
    const status = this.props.status
    return `btn btn-${status === 0 ? 'light' : status === 1 ? 'secondary' : 'dark'}`
  }

  hitMe() {
    this.props.onCLick(this.props.num)
  }

  render() {
    return (
      <button type="button" className={this.getColor()} onClick={this.hitMe} style={cellStyle}/>
    );
  }
}

class Frame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {values: Array(TOTAL_CELLS).fill(0), player: 1, victory: 0};

    this.handleClick = this.handleClick.bind(this);
  }

  // Check each cell that has a value and direction makes sense
  checkVictory(values) {
    let victory = null;
    for (let i = 0; i < TOTAL_CELLS; i++) {
      const value = values[i];
      if (value === 0) continue;

      // check --
      if (makesSense(i, true, false)) {
        victory = checkCells(values, i, value, [i], 1);
      }
      // check |
      if (!victory && makesSense(i, false, true)) {
        victory = checkCells(values, i, value, [i], COLUMNS);
      }
      // check \
      if (!victory && makesSense(i, true, true)) {
        victory = checkCells(values, i, value, [i], COLUMNS + 1);
      }
      // check /
      if (!victory && (i % COLUMNS <= COLUMNS - CONNECT) && (Math.floor(i / COLUMNS) >= ROWS - CONNECT)) {
        victory = checkCells(values, i, value, [i], -(COLUMNS - 1));
      }

      if (victory) return victory;
    }
    return [];
  }

  handleClick(num) {
    const {values: currentValues, player: currentPlayer, victory} = this.state;

    if (victory) return; // don't play if game is finished

    const values = Array.from(currentValues);
    if (values[num] > 0) return; // if value is 1 or 2 cell is already selected

    while (num < TOTAL_CELLS) { // "move" the cell down if it's clicked above in the column
      if (values[num + COLUMNS] <= 0) num += COLUMNS;
      else break;
    }

    values[num] = currentPlayer;

    const nInRow = this.checkVictory(values);
    const winner = nInRow.length === CONNECT ? currentPlayer : 0;

    this.setState({
      values,
      victory: winner,
      player: currentPlayer === 1 ? 2 : 1
    })
  }

  render() {
    const cells = [];
    const {values, player, victory} = this.state;

    for (let c = 0; c < TOTAL_CELLS; c++) {
      const cell = <Cell key={c} num={c} status={values[c]} onCLick={this.handleClick}/>;
      cells.push(cell);
    }

    // split the cells into rows to show them on the screen
    const rows = []
    for (let r = 0; r < ROWS; r++) {
      const row = (
        <div key={`row${r}`}>
          {cells.slice(r * COLUMNS, (r + 1) * COLUMNS)}
        </div>
      );
      rows.push(row);
    }

    return (
      <div style={frameStyle}>
        {rows}
        <br/>
        <Info key={player} player={player} victory={victory}/>
      </div>
    );
  }
}

const domContainer = document.getElementById('container');
ReactDOM.render(<Frame/>, domContainer);
