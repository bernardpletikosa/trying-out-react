var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var ROWS = 5;
var COLUMNS = 6;
var TOTAL_CELLS = ROWS * COLUMNS;
var CELL_SIZE = 100;
var CONNECT = 4;

var frameStyle = {
  margin: 'auto',
  width: (COLUMNS + 1) * CELL_SIZE + 'px',
  height: (ROWS + 1) * CELL_SIZE + 'px'
};

var cellStyle = {
  borderRadius: '50%',
  width: CELL_SIZE + 'px',
  height: CELL_SIZE + 'px',
  margin: '2px'
};

/**
 * Does it makes sense to check wining combinations with this cell
 * @param {Number} cell - cell number
 * @param {boolean} horizontal
 * @param {boolean} vertical
 * @returns {boolean}
 */
function makesSense(cell, horizontal, vertical) {
  if (horizontal && cell % COLUMNS > COLUMNS - CONNECT) return false;
  if (vertical && Math.floor(cell / COLUMNS) >= ROWS - CONNECT + 1) return false;
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

  var nextIndex = cell + hop;
  var next = values[nextIndex];

  if (next === 0 || next !== value) return null;
  steps.push(nextIndex);

  return checkCells(values, nextIndex, next, steps, hop);
}

var Info = function (_React$Component) {
  _inherits(Info, _React$Component);

  function Info(props) {
    _classCallCheck(this, Info);

    var _this = _possibleConstructorReturn(this, (Info.__proto__ || Object.getPrototypeOf(Info)).call(this, props));

    var _this$props = _this.props,
        victory = _this$props.victory,
        player = _this$props.player;


    if (victory > 0) {
      _this.state = { text: React.createElement(
          'strong',
          null,
          'Player ',
          victory,
          ' WINS!'
        ) };
    } else {
      _this.state = { text: 'Player ' + player + ' turn' };
    }
    return _this;
  }

  _createClass(Info, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        this.state.text
      );
    }
  }]);

  return Info;
}(React.Component);

var Cell = function (_React$Component2) {
  _inherits(Cell, _React$Component2);

  function Cell(props) {
    _classCallCheck(this, Cell);

    var _this2 = _possibleConstructorReturn(this, (Cell.__proto__ || Object.getPrototypeOf(Cell)).call(this, props));

    _this2.hitMe = _this2.hitMe.bind(_this2);
    _this2.getColor = _this2.getColor.bind(_this2);
    return _this2;
  }

  _createClass(Cell, [{
    key: 'getColor',
    value: function getColor() {
      var status = this.props.status;
      return 'btn btn-' + (status === 0 ? 'light' : status === 1 ? 'secondary' : 'dark');
    }
  }, {
    key: 'hitMe',
    value: function hitMe() {
      this.props.onCLick(this.props.num);
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement('button', { type: 'button', className: this.getColor(), onClick: this.hitMe, style: cellStyle });
    }
  }]);

  return Cell;
}(React.Component);

var Frame = function (_React$Component3) {
  _inherits(Frame, _React$Component3);

  function Frame(props) {
    _classCallCheck(this, Frame);

    var _this3 = _possibleConstructorReturn(this, (Frame.__proto__ || Object.getPrototypeOf(Frame)).call(this, props));

    _this3.state = { values: Array(TOTAL_CELLS).fill(0), player: 1, victory: 0 };

    _this3.handleClick = _this3.handleClick.bind(_this3);
    return _this3;
  }

  // Check each cell that has a value and direction makes sense


  _createClass(Frame, [{
    key: 'checkVictory',
    value: function checkVictory(values) {
      var victory = null;
      for (var i = 0; i < TOTAL_CELLS; i++) {
        var value = values[i];
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
        if (!victory && i % COLUMNS <= COLUMNS - CONNECT && Math.floor(i / COLUMNS) >= ROWS - CONNECT) {
          victory = checkCells(values, i, value, [i], -(COLUMNS - 1));
        }

        if (victory) return victory;
      }
      return [];
    }
  }, {
    key: 'handleClick',
    value: function handleClick(num) {
      var _state = this.state,
          currentValues = _state.values,
          currentPlayer = _state.player,
          victory = _state.victory;


      if (victory) return; // don't play if game is finished

      var values = Array.from(currentValues);
      if (values[num] > 0) return; // if value is 1 or 2 cell is already selected

      while (num < TOTAL_CELLS) {
        // "move" the cell down if it's clicked above in the column
        if (values[num + COLUMNS] <= 0) num += COLUMNS;else break;
      }

      values[num] = currentPlayer;

      var nInRow = this.checkVictory(values);
      var winner = nInRow.length === CONNECT ? currentPlayer : 0;

      this.setState({
        values: values,
        victory: winner,
        player: currentPlayer === 1 ? 2 : 1
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var cells = [];
      var _state2 = this.state,
          values = _state2.values,
          player = _state2.player,
          victory = _state2.victory;


      for (var c = 0; c < TOTAL_CELLS; c++) {
        var cell = React.createElement(Cell, { key: c, num: c, status: values[c], onCLick: this.handleClick });
        cells.push(cell);
      }

      // split the cells into rows to show them on the screen
      var rows = [];
      for (var r = 0; r < ROWS; r++) {
        var row = React.createElement(
          'div',
          { key: 'row' + r },
          cells.slice(r * COLUMNS, (r + 1) * COLUMNS)
        );
        rows.push(row);
      }

      return React.createElement(
        'div',
        { style: frameStyle },
        rows,
        React.createElement('br', null),
        React.createElement(Info, { key: player, player: player, victory: victory })
      );
    }
  }]);

  return Frame;
}(React.Component);

var domContainer = document.getElementById('container');
ReactDOM.render(React.createElement(Frame, null), domContainer);