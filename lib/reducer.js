'use strict';

var _createReducer;

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cuid = require('cuid');

var _cuid2 = _interopRequireDefault(_cuid);

var _utils = require('./utils.js');

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initialState = [];

exports.default = (0, _utils.createReducer)(initialState, (_createReducer = {}, _defineProperty(_createReducer, _constants.ADD_TOASTR, function (state, payload) {
  return [].concat(_toConsumableArray(state), [{
    id: (0, _cuid2.default)(),
    type: payload.type,
    title: payload.title,
    message: payload.message,
    options: payload.options
  }]);
}), _defineProperty(_createReducer, _constants.REMOVE_TOASTR, function (state, payload) {
  return state.filter(function (toastr) {
    return toastr.id !== payload.id;
  });
}), _defineProperty(_createReducer, _constants.CLEAN_TOASTR, function () {
  return [];
}), _createReducer));