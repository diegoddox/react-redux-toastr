'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createReducer = createReducer;
exports._bind = _bind;
exports.checkPositionName = checkPositionName;
exports.mapToToastrMessage = mapToToastrMessage;
exports.hasProperty = hasProperty;
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
  var isValidName = positions.indexOf(name);

  if (isValidName > -1) {
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

  if (!array.length) {
    console.error('REDUX-TOASTR ERROR:: The toastr method: ' + type + ' cannot be empty', array);
    return false;
  }

  var options = array.filter(hasObject)[0];
  if (options) {
    obj.options = options;
  }

  if (array.length > 1 && isString(array[0]) && isString(array[1])) {
    obj.title = array[0];
    obj.message = array[1];
  } else if (isString(array[0])) {
    obj.message = array[0];
  } else {
    console.error('REDUX-TOASTR ERROR:: The first arguments most be a string', array);
    return false;
  }

  return obj;
}
function hasProperty(obj, property) {
  if (obj == null) {
    return false;
  }
  return typeof obj[property] !== 'undefined';
}

function isString(obj) {
  if (typeof obj == 'string') {
    return true;
  }
  return false;
}

function hasObject(item) {
  return item.icon || item.timOut || item.onShowComplete || item.onHideComplete || item.icon;
}