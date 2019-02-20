var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

export var Info = function (_React$Component) {
  _inherits(Info, _React$Component);

  function Info(props) {
    _classCallCheck(this, Info);

    var _this = _possibleConstructorReturn(this, (Info.__proto__ || Object.getPrototypeOf(Info)).call(this, props));

    var victory = _this.props.victory;

    var text = null;
    var className = 'alert alert-' + (victory === 0 ? 'light' : victory === 1 ? 'info' : 'dark');

    if (victory > 0) {
      text = React.createElement(
        'strong',
        null,
        'Player ',
        victory,
        ' WINS!'
      );
    } else {
      text = 'Player ' + _this.props.player + ' turn';
    }

    _this.state = { text: text, className: className };
    return _this;
  }

  _createClass(Info, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: this.state.className },
        this.state.text
      );
    }
  }]);

  return Info;
}(React.Component);