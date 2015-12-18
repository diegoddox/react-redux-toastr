'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createReducer = createReducer;
exports._bind = _bind;
exports.checkPositionName = checkPositionName;
exports.mapToToastrMessage = mapToToastrMessage;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createReducer(initialState, fnMap) {
  return function () {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var _ref = arguments[1];
    var type = _ref.type;
    var payload = _ref.payload;

    var handle = fnMap[type];
    return handle ? handle(state, payload) : state;
  };
}

function _bind(obj) {
  for (var _len = arguments.length, methods = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    methods[_key - 1] = arguments[_key];
  }

  methods.forEach(function (method) {
    return obj[method] = obj[method].bind(obj);
  });
}

function checkPositionName(name) {
  var positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
  var isValidName = _lodash2.default.contains(positions, name);

  if (isValidName) {
    return name;
  }
  return positions[0];
}

function mapToToastrMessage(type, array) {
  var obj = {
    type: type,
    title: '',
    message: '',
    options: {}
  };

  if (array.length > 1 && _lodash2.default.isString(array[0]) && _lodash2.default.isString(array[1])) {
    obj.title = array[0];
    obj.message = array[1];

    if (array[2] && _lodash2.default.isObject(array[2])) {
      obj.options = applyOptions(array[2]);
    } else if (array[1] && _lodash2.default.isObject(array[1])) {
      obj.options = applyOptions(array[1]);
    }
  } else {
    obj.message = array[0];
  }

  function applyOptions(options) {
    if (options.icon) {
      var hasIconPrefix = options.icon.toLowerCase().match('icon-');
      if (!hasIconPrefix) {
        options.icon = 'icon-' + obj.options.icon;
      }
    }
    return options;
  }
  return obj;
}