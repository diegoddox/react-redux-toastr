'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addToastrAction = addToastrAction;
exports.clean = clean;
exports.remove = remove;

var _constants = require('./constants');

function addToastrAction(toastr) {
  return {
    type: _constants.ADD_TOASTR,
    payload: toastr
  };
}

function clean() {
  return {
    type: _constants.CLEAN_TOASTR
  };
}

function remove(id) {
  return {
    type: _constants.REMOVE_TOASTR,
    payload: {
      id: id
    }
  };
}