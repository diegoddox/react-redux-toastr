'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createReducer;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = require('./utils.js');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initialState = {
  toastrs: [],
  confirm: {
    show: false,
    options: null
  }
};

exports.default = (0, _utils.createReducer)(initialState, (_createReducer = {}, _defineProperty(_createReducer, _constants.ADD_TOASTR, function (state, payload) {
  var newToastr = {
    id: (0, _utils.guid)(),
    type: payload.type,
    title: payload.title,
    message: payload.message,
    options: payload.options
  };

  if (!_config2.default.get('newestOnTop')) {
    return _extends({}, state, {
      toastrs: [].concat(_toConsumableArray(state.toastrs), [newToastr])
    });
  }
  return _extends({}, state, {
    toastrs: [newToastr].concat(_toConsumableArray(state.toastrs))
  });
}), _defineProperty(_createReducer, _constants.REMOVE_TOASTR, function (state, payload) {
  return _extends({}, state, {
    toastrs: state.toastrs.filter(function (toastr) {
      return toastr.id !== payload.id;
    })
  });
}), _defineProperty(_createReducer, _constants.CLEAN_TOASTR, function (state) {
  return _extends({}, state, {
    toastrs: []
  });
}), _defineProperty(_createReducer, _constants.SHOW_CONFIRM, function (state, payload) {
  return _extends({}, state, {
    confirm: {
      show: true,
      message: payload.message,
      options: payload.options || null
    }
  });
}), _defineProperty(_createReducer, _constants.HIDE_CONFIRM, function (state) {
  return _extends({}, state, {
    confirm: {
      show: false,
      options: null
    }
  });
}), _createReducer));